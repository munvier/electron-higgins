define("views/main", function(require) {
    "use strict";

    var Marionette      = require("marionette"),
        MainTemplate    = require("hbs!templates/root"),
        MainView;

    RootView = Marionette.View.extend({
        template: MainTemplate
    });

    return MainView;
});
