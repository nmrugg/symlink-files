var glob = require("glob"),
    p = require("path"),
    girdle = require("girdle"),
    mkdirp  = require("mkdirp"),
    fs = require("fs");

function symlink(file, src, dest, options, cb)
{
    var out_path = p.join(dest, p.relative(src, file)),
        origin;
    
    fs.stat(file, function onstat(err, stats)
    {
        if (err || stats.isDirectory()) {
            return cb();
        }
        
        if (options.rel) {
            origin = p.relative(out_path, file)
        } else {
            origin = p.resolve(file);
        }
        
        mkdirp(p.dirname(out_path), function (err)
        {
            if (err) {
                throw err;
            }
            
            fs.symlink(origin, out_path, cb);
        });
    });
}

module.exports = function (src_glob, src, dest, options)
{
    var Q = require("q"),
        deferred;
    
    if (!options) {
        options = {};
    }
    
    deferred = Q.defer();
    
    glob(src_glob, function onglob(err, files)
    {
        if (err) {
            throw err;
        }
        
        girdle.async_loop(files, deferred.resolve, function oneach(file, next)
        {
            symlink(file, src, dest, options, next);
        });
    });
    
    return deferred.promise;
};
