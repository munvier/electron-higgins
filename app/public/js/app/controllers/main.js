define("controllers/main", function(require) {
    "use strict";

    var Marionette  = require("marionette"),
        Radio       = require("backbone.radio"),
        MainView    = require("views/main"),
        MainController;

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
