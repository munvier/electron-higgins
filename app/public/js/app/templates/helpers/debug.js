/*global define*/
define(["hbs/handlebars"],
    function (Handlebars) {
        "use strict";

        function debug (optionalValue) {
            console.log("====================");
            console.log("Current Context");
            console.log(this);

            if (optionalValue) {
                console.log("====================");
                console.log("Value");
                console.log(optionalValue);
            }
            console.log("====================");
        }

        Handlebars.registerHelper("debug", debug);
    });