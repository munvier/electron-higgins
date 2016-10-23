define("radios/disk", function(require) {
    "use strict";

    var Marionette          = require("marionette"),
        DiskItemsCollection = require("collections/diskItems"),
        DiskRadio;

    DiskRadio = Marionette.Object.extend({
        channelName : 'Disk',

        radioRequests: {
            'getDiskItems': 'getDiskItems',
        },
        
        getDiskItems: function(path) {
            var diskItemsCollection     = new DiskItemsCollection(),
                deferred                = new $.Deferred(),
                defaults                = {
                    wait: true,
                    success : function (collection, response) {
                        deferred.resolve(collection, response);
                    },
                    error : function (collection, response) {
                        deferred.resolve(collection, response);
                    }
                };
            
            if (path) {
                diskItemsCollection.setPath(path);
            }
            
            diskItemsCollection.fetch(defaults);

            return deferred.promise();
        }
    });

    return DiskRadio;
});
