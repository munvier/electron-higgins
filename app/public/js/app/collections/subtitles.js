define([
    "backbone",
    "config", 
    "models/subtitle"
], function (Backbone, Config, Subtitle) {
    "use strict";
    
    var subtitles;
        
    subtitles = Backbone.Collection.extend({
        model: Subtitle,
        
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
    return subtitles;
});
