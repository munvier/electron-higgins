define("libs/baseRouter", function(require) {
    "use strict";

    var Backbone    = require("backbone"),
        Marionette  = require("marionette"),
        _           = require("underscore"),
        BaseRouter;

    BaseRouter = Marionette.AppRouter.extend({
        currentRoute: {},
        init: function init() {
            this.check();
        },
        check: function check() {
            this.next();
        },
        goto: function goto(route) {
            Backbone.history.navigate(route, {
                trigger: true
            });
        },
        before: function before() {
            this.check();
        },
        after: function after() {
            this.currentRoute = {};
        },
        next: function next() {
            this.currentRoute.callback && this.currentRoute.callback.apply(this, this.currentRoute.args);
            this.trigger.apply(this, ['route:' + this.currentRoute.name].concat(this.currentRoute.args));
            this.trigger('route', this.currentRoute.name, this.currentRoute.args);
            Backbone.history.trigger('route', this, this.currentRoute.name, this.currentRoute.args);
            this.after.apply(this, this.currentRoute.args);
        },
        route: function route(current_route, name, callback) {
            if (!_.isRegExp(current_route)) current_route = this._routeToRegExp(current_route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];

            var that = this;

            Backbone.history.route(current_route, function (fragment) {
                that.currentRoute.name = name;
                that.currentRoute.callback = callback;
                that.currentRoute.args = that._extractParameters(current_route, fragment);

                that.before.apply(that);
            });

            return this;
        }
    });

    return BaseRouter;
});
