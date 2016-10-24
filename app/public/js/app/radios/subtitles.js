define("radios/subtitles", function(require) {
    "use strict";

    var Marionette          = require("marionette"),
        SubtitlesCollection = require("collections/subtitles"),
        SubtitlesRadio;

    SubtitlesRadio = Marionette.Object.extend({
        channelName : 'Subtitles',

        radioRequests: {
            'getSubtitles': 'getSubtitles',
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

            toJSON : function () {
                return JSON.parse(JSON.stringify(this.attributes));
            }
    });

    return SubtitlesRadio;
});
