define([
    "marionette", 
    "collections/diskItems"
], function(Marionette, DiskItemsCollection) {
    "use strict";

    var DiskRadio;

    DiskRadio = Marionette.Object.extend({
        channelName : 'Disk',

        radioRequests: {
            'getDiskItems': 'getDiskItems',
            'getRecursiveMoviesFilesListbyPath': 'getRecursiveMoviesFilesListbyPath',
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
        },
        
        getRecursiveMoviesFilesListbyPath: function(path) {
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
            
            diskItemsCollection.fetchRecursivelyOnlyMovies(defaults);

            return deferred.promise();
        }
    });

    return DiskRadio;
});
