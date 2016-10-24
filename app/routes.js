var fs = require('co-fs');
var path = require('path');
var views = require('co-views');
var origFs = require('fs');
var koaRouter = require('koa-router');
var bodyParser = require('koa-bodyparser');
var formParser = require('co-busboy');

var request = require('co-request');
var cheerio = require('cheerio');
var Entities  = require('html-entities').AllHtmlEntities;

var Tools = require('./tools');
var FilePath = require('./fileMap').filePath;
var FileManager = require('./fileManager');

var router = new koaRouter();

router.get('/api/getFilesListbyPath/(.*)', Tools.loadRealPath, Tools.checkPathExists, function * () {
    var stats = yield fs.stat(this.request.fPath);
    if (stats.isDirectory()) {
        this.body = yield * FileManager.list(this.request.fPath);
    }
    else {
        //this.body = yield fs.createReadStream(p);
        this.body = origFs.createReadStream(this.request.fPath);
    }
});

router.get('/api/subtitles/(.*)/(.*)/(.*)/(.*)', function * (next) {
    var url = 'http://www.addic7ed.com/serie/' + this.params[0] + '/' + this.params[1] + '/' + this.params[2] + '/' + this.params[3],
        options = {
            uri: url,
            headers: {
                'User-Agent':   'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0',
                'Accept'        : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Connection'    : 'keep-alive',
                'Host'          : 'www.addic7ed.com'
            }
        };

    var result = yield request(options);

    if (result.body){
        var $ = cheerio.load(result.body),
            data = [];

        $('a.buttonDownload').each(function(index, node){
            data.push({
                link : $(this).attr('href'),
                text : $(this).text(),
                version : $(this).parents('.tabel95').find('td.NewsTitle').text().replace(', 0.00 MBs ', ''),
                help : $(this).parents('.tabel95').find('td.newsDate').first().text().trim()
            });
        });

        this.body = JSON.stringify(data, null, 4);
    }
});

module.exports = router.middleware();