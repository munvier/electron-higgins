requirejs.config({
    baseUrl: "js/app",
    paths: {
        backbone: "/bower_components/backbone/backbone-min",
        "backbone.radio": "/bower_components/backbone.radio/build/backbone.radio",
        handlebars: "/bower_components/handlebars/handlebars.min",
        hbs: "/bower_components/require-handlebars-plugin/hbs",
        jquery: "/bower_components/jquery/dist/jquery.min",
        marionette: "/bower_components/backbone.marionette/lib/backbone.marionette.min",
        text: "/bower_components/requirejs-text/text",
        underscore: "/bower_components/underscore/underscore-min",
        app: "/js/app/app",
        config: "/js/app/config/config"
    },
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        hbs: {
            deps: ["handlebars", "underscore"],
            templateExtension: "hbs",
            "hbs/handlebars": "handlebars",
            "hbs/underscore": "underscore"
        },
        marionette: {
            deps: ["backbone"]
        }
    }
});

define(['app'], function() {
    "use strict";

    var App = requirejs('app');
    
    new App();
});
