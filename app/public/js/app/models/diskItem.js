define("models/diskItem", function (require) {
    "use strict";
    var Backbone = require("backbone"),
        Config = require("config"),
        diskItem;
        
    diskItem = Backbone.Model.extend({
        initialize: function () {
            this.checkIfFileIsTvShow();
        },
        
        checkIfFileIsTvShow : function () {
            var file,
                cleanSerieName,
                filenameRegex = /(.*)((S{1}\d{2}|\d{1,2}x)e?(\d{2}).+\.(avi|mkv|mpg|mp4)+)/i,
                perfectFilenameRegex = /.*((.+)S(\d{2})e(\d{2}).+([hx]264|x265|xvid)[\-.](.+)\.(avi|mkv|mpg|mp4)+)$/i,
                seasonRegex = /(S(\d{2})|(\d{1,2})x)/i,
                episodeRegex = /[xE](\d+)[ \.]/i;
        
            if (this.get('is_file') && this.get('file').match(filenameRegex)
                    && this.get('file').match(seasonRegex)
                    && this.get('file').match(episodeRegex)) {
                var matches = this.get('file').match(filenameRegex)[3];
                cleanSerieName = this.get('file').match(filenameRegex)[1].replace(/[\.\-]/ig, ' ').trim();
                
                file = {
                    cid : this.cid,
                    filename: this.get('file').match(filenameRegex)[2],
                    showname: cleanSerieName,
                    season: parseInt(this.get('file').match(filenameRegex)[3].replace(/[^\d+]/i, ' ').trim()),
                    episode: parseInt(this.get('file').match(filenameRegex)[4]),
                };

                if (this.get('file').match(perfectFilenameRegex)) {
                    file.team = this.get('file').match(perfectFilenameRegex)[6];
                    file.codec = this.get('file').match(perfectFilenameRegex)[5];
                }

                this.set(file);
            }
        },
        
        isTvShow : function () {
            return this.get('showname') && this.get('season') && this.get('episode');
        },
        
        toJSON : function () {
            return JSON.parse(JSON.stringify(this.attributes));
        }
    });
    
    return diskItem;
});
