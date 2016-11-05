var fs = require('co-fs');
var coreFs = require('fs');
var co = require('co');
var fse = require('co-fs-extra');
var path = require('path');
var FileManager = {};

FileManager.getStats = function * (p) {
    var stats = yield fs.stat(p);

    return {
        folder: stats.isDirectory(),
        size: stats.size,
        mtime: stats.mtime.getTime()
    };
};

FileManager.list = function * (dirPath) {
    var files = yield fs.readdir(decodeURIComponent(dirPath));
    var stats = [];
    for (var i = 0; i < files.length; ++i) {
        var fPath = path.join(dirPath, files[i]);
    
        try {
            var item_stats = yield fs.stat(fPath);
            stats.push({
                dir     : dirPath,
                has_sub : FileManager.checkIfFileHasSub(fPath),
                is_dir  : item_stats.isDirectory(),
                is_file : item_stats.isFile(),
                file    : files[i],
                fPath   : fPath
            });
        } catch (e) {
            continue;
        }
    }
    return stats;
};

FileManager.listFiles = function (filesList) {
    var stats = [];
    
    for(var i = 0; i < filesList.length; i++) {
        var file        = filesList[i],
            fileArray   = file.toString().split('\\'),
            filename    = fileArray.pop(),
            directory   = fileArray.join('\\') + "\\";
        
        try {
            var item_stats = coreFs.statSync(file);
            
            stats.push({
                dir     : directory,
                is_dir  : false,
                has_sub : FileManager.checkIfFileHasSub(file),
                is_file : item_stats.isFile(),
                file    : filename,
                fPath   : file
            });
        } catch (e) {
            console.log(e);
            continue;
        }
    }
    
    return stats;
};

FileManager.checkIfFileHasSub = function (file) {
    var fileArray               = file.toString().split('.'),
        extension               = fileArray.pop(),
        fileWithoutExtension    = fileArray.join('.');

    try {
        var sub = coreFs.statSync(fileWithoutExtension + ".srt");

        if (sub.isFile()) {
            return true;
        }
    } catch (e) {
        return false;
    }

    return false;
}

module.exports = FileManager;
