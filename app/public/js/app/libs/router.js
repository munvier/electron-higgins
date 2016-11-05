define([
    "jquery",
    "libs/baseRouter",
    "controllers/main",
    "controllers/disk"
], function($, BaseRouter, MainController, DiskController) {
    "use strict";

    var controllers = {
            Main: MainController,
            Disk: DiskController,
        };

    $.each(controllers, function(key, Controller){
        var tmpController = new Controller();
        BaseRouter.prototype.processAppRoutes(tmpController, tmpController.routes);
    });

    return BaseRouter;
});
