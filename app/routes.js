var fs          = require('co-fs');
var path        = require('path');
var views       = require('co-views');
var origFs      = require('fs');
var Finder      = require('fs-finder');
var koaRouter   = require('koa-router');
var bodyParser  = require('koa-bodyparser');
var koaBBody    = require('koa-better-body');
var formParser  = require('co-busboy');
var http        = require('http');

var request     = require('co-request');
var cheerio     = require('cheerio');
var Entities    = require('html-entities').AllHtmlEntities;

var Tools       = require('./tools');
var FilePath    = require('./fileMap').filePath;
var FileManager = require('./fileManager');

var router      = new koaRouter();

router.get('/api/getFilesListbyPath/(.*)', Tools.loadRealPath, Tools.checkPathExists, function * () {
    var stats = yield fs.stat(this.request.fPath);
    if (stats.isDirectory()) {
        this.body = yield * FileManager.list(this.request.fPath);
    }
    else {
        this.body = origFs.createReadStream(this.request.fPath);
    }
});

router.get('/api/getRecursiveMoviesFilesListbyPath/(.*)', Tools.loadRealPath, Tools.checkPathExists, function * () {
    var filesList = yield Finder.from(this.request.fPath).findFiles('*.<(avi|mkv|mp4|mpg|mpeg|AVI|MKV|MP4|MPG|MPEG)>');
    
    var test = FileManager.listFiles(filesList);

    this.body = test;
});

router.get('/api/subtitles/(.*)/(.*)/(.*)/(.*)', function * (next) {
    var url     = 'http://www.addic7ed.com/serie/' + this.params[0] + '/' + this.params[1] + '/' + this.params[2] + '/' + this.params[3],
        options = {
            uri     : url,
            headers : {
                'User-Agent'    : 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0',
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
                referer : url,
                link    : $(this).attr('href'),
                text    : $(this).text(),
                version : $(this).parents('.tabel95').find('td.NewsTitle').text().replace(', 0.00 MBs ', ''),
                help    : $(this).parents('.tabel95').find('td.newsDate').first().text().trim()
            });
        });
        this.body = JSON.stringify(data, null, 4);
    }
});

router.post('/api/subtitles/download', koaBBody() , function * (next) {
    var options = {
        host    : 'www.addic7ed.com',
        path    : this.request.fields.source,
        method  : 'GET',
        headers : {}
    };
    
    options.headers['User-Agent']       = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0';
    options.headers['Referer']          = this.request.fields.referer;
    options.headers['Accept']           = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
    options.headers['Accept-Encoding']  = "gzip, deflate";
    
    var file    = origFs.createWriteStream(this.request.fields.destination);
    var request = http.get(options, function(response) {
        response.pipe(file);
    });
});

function getURL(url, refererUrl, callback) {
 
    var headers = {};
 
    var options = {
        uri: url,
        headers: headers
    };
    var req = this.request.get(options);
 
    req.on('response', function (res) {
        var chunks = [];
        res.on('data', function (chunk) {
            chunks.push(chunk);
        });
        res.on('end', function () {
            var buffer = Buffer.concat(chunks);
            var encoding = res.headers['content-encoding'];
            if (encoding == 'gzip') {
                zlib.gunzip(buffer, function (err, decoded) {
                    callback(err, decoded && decoded.toString());
                });
            } else if (encoding == 'deflate') {
                zlib.inflate(buffer, function (err, decoded) {
                    callback(err, decoded && decoded.toString());
                })
            } else {
                callback(null, buffer.toString());
            }
        });
    });
    req.on('error', function (err) {
        callback(err);
    });
}

module.exports = router.middleware();