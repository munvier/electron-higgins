define("collections/diskItems", function (require) {
    "use strict";
    var Backbone    = require("backbone"),
        Config      = require("config"),
        diskItem    = require("models/diskItem"),
        diskItems;
        
    diskItems = Backbone.Collection.extend({
        model: diskItem,
        
        url: function () {
            return Config.file_api_endpoint + "/getFilesListbyPath/" + encodeURIComponent(this.path)
        },
        
        comparator: function (item) {
            return item.get("is_file") + "_" + item.get("file");
        },
        
        path: "D:\\leech\\",
        
        setPath: function (path) {
            this.path = path;
        },
        
        getPath: function () {
            return this.path;
        },
        
        checkSubtitles : function () {
            var that = this;
    
            this.forEach(function(model) {
                var filename                        = model.get('file'),
                    currentFilenameWithoutExtension = filename.toLowerCase().substring(0, filename.length - 3),
                    filtered;

                if (model.isTvShow()) {
                    filtered = that.filter(function(diskItem){
                        var diskItemFilenameWithoutExtension    = diskItem.get('file').toLowerCase().substring(0, diskItem.get('file').length - 3),
                            diskItemFilenameExtension           = diskItem.get('file').toLowerCase().substring(filename.length - 3);
                        
                        return (diskItemFilenameExtension === "srt" && diskItemFilenameWithoutExtension == currentFilenameWithoutExtension);
                    });
                    
                    if (filtered.length) {
                        model.set('has_subtitle', true);
                    }
                }
            });
        },
        
        toJSON: function(options) {
            return this.map(function(model) { return model.toJSON(options); });
        },
    });
    return diskItems;
});
