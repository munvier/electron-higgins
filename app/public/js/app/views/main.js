define([
    "marionette",
    "hbs!templates/main"
], function(Marionette, MainTemplate) {
    "use strict";

    var MainView;

    MainView = Marionette.View.extend({
        template: MainTemplate
    });

    return MainView;
});
