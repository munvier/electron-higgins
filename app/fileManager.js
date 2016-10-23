var fs = require('co-fs');
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
                }
        };
        FileManager.list = function * (dirPath) {
        var files = yield fs.readdir(decodeURIComponent(dirPath));
                var stats = [];
                for (var i = 0; i < files.length; ++i) {
        var fPath = path.join(dirPath, files[i]);
                try {
                var item_stats = yield fs.stat(fPath);
                        stats.push({
                        dir : dirPath,
                                is_dir : item_stats.isDirectory(),
                                is_file : item_stats.isFile(),
                                file : files[i],
                                fPath : fPath
                        });
                } catch (e) {
        continue;
        }
        }
        return stats;
        };
        module.exports = FileManager;
