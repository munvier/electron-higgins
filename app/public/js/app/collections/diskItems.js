define("collections/diskItems", function (require) {
    "use strict";
    var Backbone = require("backbone"),
            Config = require("config"),
            diskItems = require("models/diskItem"),
            diskItems;
    diskItems = Backbone.Collection.extend({
        url: function () {
            return Config.file_api_endpoint + encodeURIComponent(this.path)
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
        }
    });
    return diskItems;
});
