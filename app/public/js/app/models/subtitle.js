define([
    "config",
    "backbone"
], function (Config, Backbone) {
    "use strict";
    
    var subtitle;
        
    subtitle = Backbone.Model.extend({
        fetchSubtitleForShow : function (options) {
            var deferred = new $.Deferred();
            
            options = options || {};
            
            if (!options.data
                || !options.data.source
                || !options.data.destination) {
                return deferred.reject().promise();
            }
            
            options.dataType    = "json";
            options.type        = "POST";
            options.url         = Config.file_api_endpoint + "/subtitles/download";
            
            return this.fetch.call(this, options);
        },
        
        toJSON : function () {
            this.attributes.cid = this.cid;
            
            return JSON.parse(JSON.stringify(this.attributes));
        }
    });
    
    return subtitle;
});
