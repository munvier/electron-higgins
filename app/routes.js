var fs = require('co-fs');
var path = require('path');
var views = require('co-views');
var origFs = require('fs');
var koaRouter = require('koa-router');
var bodyParser = require('koa-bodyparser');
var formParser = require('co-busboy');

var Tools = require('./tools');
var FilePath = require('./fileMap').filePath;
var FileManager = require('./fileManager');

var router = new koaRouter();

router.get('/api/(.*)', Tools.loadRealPath, Tools.checkPathExists, function * () {
    var stats = yield fs.stat(this.request.fPath);
    if (stats.isDirectory()) {
        this.body = yield * FileManager.list(this.request.fPath);
    }
    else {
        //this.body = yield fs.createReadStream(p);
        this.body = origFs.createReadStream(this.request.fPath);
    }
});

module.exports = router.middleware();