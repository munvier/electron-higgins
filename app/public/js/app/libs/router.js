define("libs/router", function(require) {
    "use strict";

    var $                       = require("jquery"),
        BaseRouter              = require("libs/baseRouter"),
        MainController          = require("controllers/main"),
        DiskController          = require("controllers/disk"),
        controllers = {
            Main: MainController,
            Disk: DiskController,
        };

    $.each(controllers, function(key, Controller){
        var tmpController = new Controller();
        BaseRouter.prototype.processAppRoutes(tmpController, tmpController.routes);
    });

    return BaseRouter;
});
