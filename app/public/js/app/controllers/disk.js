define([
    "marionette",
    "backbone.radio",
    "radios/disk",
    "radios/subtitles",
    "views/disk"
], function(Marionette, Radio, DiskRadio, SubtitlesRadio, DiskView) {
    "use strict";

    var DiskController;

    DiskController = Marionette.Object.extend({
        routes: {
            "disk": "index"
        },
        initialize: function() {
            var diskRadio = new DiskRadio();
            this.diskChannel = Radio.channel("Disk");
            
            var subtitlesRadio = new SubtitlesRadio();
            this.subtitlesChannel = Radio.channel("Subtitles");
        },
        index: function() {
            $.when(this.diskChannel.request('getDiskItems'))
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
