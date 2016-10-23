define("views/main", function(require) {
    "use strict";

    var Marionette      = require("marionette"),
        MainTemplate    = require("hbs!templates/main"),
        MainView;

    MainView = Marionette.View.extend({
        template: MainTemplate
    });

    return MainView;
});
