define([
    "backbone", 
    "config",
    "models/diskItem"
], function (Backbone, Config, DiskItem) {
    "use strict";
    
    var diskItems;
        
    diskItems = Backbone.Collection.extend({
        model: DiskItem,
        
        url: function () {
            return Config.file_api_endpoint + "/getFilesListbyPath/" + encodeURIComponent(this.path)
        },
        
        fetchRecursivelyOnlyMovies : function (options) {
            options = options || {};
            
            options.url = Config.file_api_endpoint + "/getRecursiveMoviesFilesListbyPath/" + encodeURIComponent(this.path);
            
            return this.fetch.call(this, options);
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
        
        toJSON: function(options) {
            return this.map(function(model) { return model.toJSON(options); });
        },
    });
    return diskItems;
});
