define("views/disk", function (require) {
    "use strict";
    var _               = require("underscore"),
        Marionette      = require("marionette"),
        Radio           = require("backbone.radio"),
        DiskTemplate    = require("hbs!templates/disk"),
        DiskView;
        
    DiskView = Marionette.View.extend({
        template: DiskTemplate,
        ui: {
            'breadcrumb'    : 'span.folderName',
            'folder'        : 'a.folder',
            'file'          : 'a.file',
            'subtitle'      : 'a.subtitle',
            'textFilter'    : 'input.textFilter',
            'videoFilter'   : 'div.videoFilter'
        },
        events: {
            'click @ui.breadcrumb'  : 'setPathAndRefreshCollection',
            'click @ui.folder'      : 'setPathAndRefreshCollection',
            'click @ui.videoFilter' : 'handleVideoFilter',
            'click @ui.file'        : 'getSubtitlesVersions',
            'click @ui.subtitle'    : 'downloadSubtitle',
            'keyup @ui.textFilter'  : 'setFilterAndRefreshCollection'
        },
        initialize: function () {
            this.data       = {};
            this.path       = this.collection.getPath();
            this.filterText = "";
            
            this.initChannels();
        },
        initChannels: function () {
            Backbone.Radio.DEBUG = true;

            this.diskChannel        = Radio.channel("Disk");
            this.subtitlesChannel   = Radio.channel("Subtitles");
            this.uiChannel          = Radio.channel('ui:disk');
            
            this.uiChannel.on('setPath', this.setPathAndRefreshCollection.bind(this));
        },
        setFilterAndRefreshCollection: function (e) {
            var $input          = $(e.currentTarget),
                filterText      = $input.val().toLowerCase(),
                caretPosition   = e.currentTarget.value.slice(0, e.currentTarget.selectionStart).length;

            if (this.filterText != filterText) {
                this.filterText = filterText;

                this.collection.each(function (model) {
                    var name = model.get('file').toLowerCase();

                    model.set('hidden', (name.indexOf(filterText) === -1));
                });
                
                this.render();
                
                this.getUI('textFilter').focus();
                this.getUI('textFilter')[0].setSelectionRange(caretPosition, caretPosition);
            }
        },
        handleVideoFilter: function () {
            if (this.isfilterVideoActive) {
                this.deactivateVideoFilter();
            } else {
                this.activateVideoFilter();
            }
        },
        activateVideoFilter: function () {
            this.isfilterVideoActive = true;
            
            this.collection.each(function (model) {
                var regex   = new RegExp('\.(avi|wmv|flv|mkv|mpg|mp4)$'),
                    name    = model.get('file').toLowerCase();

                model.set('hidden', !regex.test(name));
            });
            
            this.render();
        },
        deactivateVideoFilter: function () {
            this.isfilterVideoActive = false;
            
            this.collection.each(function (model) {
                model.set('hidden', false);
            });
            
            this.render();
        },
        setPathAndRefreshCollection: function (e) {
            var $link   = $(e.currentTarget),
                path    = $link.data('path');

            e.preventDefault();

            if (!path) {
                return;
            }
            
            this.path = path;
            
            this.requestCollection();
        },
        requestCollection : function () {
            var that    = this;
            
            this.diskChannel
                .request('getDiskItems', this.path)
                .then(function (DiskItemsCollection) {
                    that.collection = DiskItemsCollection;
                    that.render();
                });
        },
        getSubtitlesVersions : function (e) {
            e.preventDefault();
            
            var that    = this,
                $file   = $(e.currentTarget),
                cid     = $file.data('cid'),
                file;
        
            if (!cid) {
                return;
            }
            
            file = this.collection.get(cid);
            
            this.subtitlesChannel
                .request('getSubtitles', {
                    showname    : file.get('showname'),
                    season      : file.get('season'),
                    episode     : file.get('episode')
                }).then(function(subtitlesCollection){
                    that.isfilterVideoActive    = false;
                    that.filterText             = "";
                    file.set('subtitles', subtitlesCollection);
                    that.render();
                });
        },
        downloadSubtitle : function (e) {
            e.preventDefault();
            
            var that        = this,
                $link       = $(e.currentTarget),
                fileCid     = $link.data('file-cid'),
                subtitleCid = $link.data('cid'),
                file        = this.collection.get(fileCid),
                subtitle    = file.get('subtitles').get(subtitleCid),
                destination = file.get('fPath').substring(0, file.get('fPath').length - 3) + "srt",
                source      = subtitle.get('link');
        
            this.subtitlesChannel.request('getSubtitle', {
                model   : subtitle,
                data    : {
                    referer     : subtitle.get('referer'),
                    source      : source,
                    destination : destination
                }
            }).then(function(){
                that.requestCollection();
            });    
        },
        serializeData : function () {
            var that        = this,
                fullPath    = "";

            this.data.isfilterVideoActive   = this.isfilterVideoActive;
            this.data.filterText            = this.filterText;
            
            this.data.collection            = this.collection.toJSON();
            
            this.data.path                  = this.path;
            this.data.explodedPath          = [];
            
            this.data.path.split('\\').forEach(function (value) {
                if (value) {
                    fullPath += value + "\\";

                    that.data.explodedPath.push({
                        name : value + "\\",
                        path : fullPath
                    });
                }
            });

            var viewData = {data: this.data};
            return _.extend(viewData, Marionette.View.prototype.serializeData.apply(this, arguments));
        }
    });
    return DiskView;
});
