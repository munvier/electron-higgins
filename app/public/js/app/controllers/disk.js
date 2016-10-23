define("controllers/disk", function(require) {
    "use strict";

    var Marionette  = require("marionette"),
        Radio       = require("backbone.radio"),
        DiskRadio   = require("radios/disk"),
        DiskView    = require("views/disk"),
        DiskController;

    DiskController = Marionette.Object.extend({
        routes: {
            "disk": "index"
        },
        initialize: function() {
            var diskRadio = new DiskRadio();
            
            this.channel = Radio.channel("Disk");
        },
        index: function() {
            $.when(this.channel.request('getDiskItems'))
                .then(function(DiskItemsCollection){
                    var view = new DiskView({
                        collection : DiskItemsCollection
                    });

                    Radio.channel("App").request("region:show", { view: view });
                });
        }
    });

    return DiskController;
});
