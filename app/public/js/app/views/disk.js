define("views/disk", function (require) {
    "use strict";
    var _ = require("underscore"),
            Marionette = require("marionette"),
            Radio = require("backbone.radio"),
            DiskTemplate = require("hbs!templates/disk"),
            DiskView;
    DiskView = Marionette.View.extend({
        template: DiskTemplate,
        ui: {
            'breadcrumb': 'span.folderName',
            'folder': 'a.folder',
            'videoFilter': 'div.videoFilter'
        },
        events: {
            'click @ui.breadcrumb': 'setPathAndRefreshCollection',
            'click @ui.folder': 'setPathAndRefreshCollection',
            'click @ui.videoFilter': 'handleVideoFilter'
        },
        initialize: function () {
            this.uiChannel = Radio.channel('ui:disk');
            this.channel = Radio.channel("Disk");
            this.uiChannel.on('setPath', this.setPathAndRefreshCollection.bind(this));
            this.data = {};
            this.path = this.collection.getPath();
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
                var regex = new RegExp('\.(avi|wmv|flv|mkv|mpg|mp4)$'),
                        name = model.get('file').toLowerCase();

                if (!regex.test(name)) {
                    model.set('hidden', true);
                }
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
            var that = this,
                    $link = $(e.currentTarget),
                    path = $link.data('path');

            e.preventDefault();

            if (!path) {
                return;
            }

            $.when(this.channel.request('getDiskItems', path))
                    .then(function (DiskItemsCollection) {
                        that.collection = DiskItemsCollection;
                        that.path = path;
                        that.render();
                    });
        },
        serializeData: function () {
            var that = this,
                    fullPath = "";

            this.data.isfilterVideoActive = this.isfilterVideoActive;

            this.data.path = this.path;
            this.data.explodedPath = [];

            this.data.path.split('\\').forEach(function (value) {
                if (value) {
                    fullPath += value + "\\";

                    that.data.explodedPath.push({
                        name: value + "\\",
                        path: fullPath
                    });
                }
            });

            var viewData = {data: this.data};
            return _.extend(viewData, Marionette.View.prototype.serializeData.apply(this, arguments));
        }
    });
    return DiskView;
});
