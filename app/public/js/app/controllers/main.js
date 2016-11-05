define([
    "marionette",
    "backbone.radio",
    "views/main"
], function(Marionette, Radio, MainView) {
    "use strict";

    var MainController;

    MainController = Marionette.Object.extend({
        routes: {
            "": "index"
        },
        index: function() {
            var view = new MainView();

            Radio.channel("App").request("region:show", { view: view });
        }
    });

    return MainController;
});
