// jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true, quotmark:double, strict:true, undef:true, unused:strict, node:true

"use strict";

var glob = require("glob"),
    p = require("path"),
    girdle = require("girdle"),
    mkdirp = require("mkdirp"),
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

module.exports = function (src_glob, src, dest, options, cb)
{
    if (typeof options === "function") {
        cb = options;
        options = null;
    }
    
    if (!options) {
        options = {};
    }
    
    glob(src_glob, function onglob(err, files)
    {
        if (err) {
            throw err;
        }
        
        girdle.async_loop(files, cb, function oneach(file, next)
        {
            symlink(file, src, dest, options, next);
        });
    });
};
