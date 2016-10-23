define("app", function(require) {
    "use strict";

    var Marionette      = require("marionette"),
        Radio           = require("backbone.radio"),
        Router          = require("libs/router"),
        MainController  = require("controllers/main"),
        DiskController  = require("controllers/disk"),
        app;

    app = Marionette.Application.extend({
        region: "#main",
        
        initialize: function intialize() {
            Radio.channel("App").reply("region:show", this.showRegion.bind(this));

            window.App = (window.App) || new Marionette.Application();

            App.on("start", this.start.bind(this));

            App.start();
        },
        start: function start() {
            App.router = new Router();

            if (Backbone.history) {
                Backbone.history.start();
                this.trigger("backbone:history:start");
            }
        },
        showRegion: function showRegion(params) {
            this.showView(params.view);
        }
    });

    return app;
});
