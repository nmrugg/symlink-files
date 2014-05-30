# symlink-files

Symlink files (keeping the directory structure) during your build.

# Installation

```
npm install symlink-files
```

## Usage

```js
symlink_files("./client/**/*.!(js|html|css)", "./client", "./build", {}, callback);
```

Works with `gulp`.

```js
gulp.task("link", function (cb)
{
    symlink_files("./client/**/*.!(js|html|css)", "./client", "./build", {}, callback);
});
```

## Parameters
symlink_files(glob, client_path, build_path, [options,] callback)

## Options
Options is an object with the following possible properties.
```
    rel     Whether to create relative symlinks or absolute (default: false)
```
