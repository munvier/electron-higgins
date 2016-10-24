define("collections/subtitles", function (require) {
    "use strict";
    var Backbone = require("backbone"),
        Config = require("config"),
        Subtitle = require("models/subtitle"),
        diskItems;
        
    diskItems = Backbone.Collection.extend({
        url: function () {
            return Config.file_api_endpoint 
                    + "/subtitles/" 
                    + this.showname 
                    + "/" + this.season 
                    + "/" + this.episode
                    + "/" + Config.addicted_fr_lang_id
        },
        
        setShowname: function (showname) {
            this.showname = showname;
        },
        
        setSeason: function (season) {
            this.season = season;
        },
        
        setEpisode: function (episode) {
            this.episode = episode;
        },
        
    });
    return diskItems;
});
