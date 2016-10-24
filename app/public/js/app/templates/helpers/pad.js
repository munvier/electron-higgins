/*global define*/
define(["hbs/handlebars"],
    function (Handlebars) {
        "use strict";

        function pad (nr, n, str){
            var str = "" + nr,
                c = c || '0';
        
            while(str.length < n) str = c + str;
            
            return str;
        }

        Handlebars.registerHelper("pad", pad);

        return pad;
    });