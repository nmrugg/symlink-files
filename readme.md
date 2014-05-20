# symlink-files

Symlink files (keeping the directory structure) during your build.

# Installation

```
npm install symlink-files
```

## Usage

```js
symlink_files("./client/**/*.!(js|html|css)", "./client", "./build");
```

Works with `gulp`.

```js
gulp.task("link", function ()
{
    return symlink_files("./client/**/*.!(js|html|css)", "./client", "./build");
});
```

NOTE: It returns a Promise.

## Parameters
symlink_files(glob, client_path, build_path, [options])

## Options
```
    rel     Whether to create relative symlinks or absolute (default: false)
```
