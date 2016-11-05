define([
    "underscore",
    "marionette",
    "collections/subtitles"
], function(_, Marionette, SubtitlesCollection) {
    "use strict";

    var SubtitlesRadio;

    SubtitlesRadio = Marionette.Object.extend({
        channelName : 'Subtitles',

        radioRequests: {
            'getSubtitles'  : 'getSubtitles',
            'getSubtitle'   : 'getSubtitle',
        },
        
        getSubtitles: function(options) {
            var subtitlesCollection     = new SubtitlesCollection(),
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
            
            if (options.showname && options.season && options.episode) {
                subtitlesCollection.setShowname(options.showname);
                subtitlesCollection.setSeason(options.season);
                subtitlesCollection.setEpisode(options.episode);
            }
            
            subtitlesCollection.fetch(defaults);

            return deferred.promise();
        },
        
        getSubtitle: function(options) {
            var deferred                = new $.Deferred(),
                defaults                = {
                    wait: true,
                    success : function (model, response) {
                        deferred.resolve(model, response);
                    },
                    error : function (model, response) {
                        deferred.resolve(model, response);
                    }
                };
            
            if (!options.model) {
                return deferred.reject().promise();
            }
            
            options = _.extend(options, defaults);
            
            options.model.fetchSubtitleForShow(options);

            return deferred.promise();
        }
    });

    return SubtitlesRadio;
});
