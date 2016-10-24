define("models/subtitle", function (require) {
    "use strict";
    var Backbone = require("backbone"),
        subtitle;
        
    subtitle = Backbone.Model.extend({
        toJSON : function () {
            return JSON.parse(JSON.stringify(this.attributes));
        }
    });
    
    return subtitle;
});
