define("views/main", function(requirejs) {
    "use strict";

    var Marionette      = requirejs("marionette"),
        MainTemplate    = requirejs("hbs!templates/root"),
        MainView;

    RootView = Marionette.View.extend({
        template: MainTemplate
    });

    return MainView;
});
