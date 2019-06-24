function getFilesFromFolder(packageName, folder) {
  // local imports
  var _ = Npm.require('underscore');
  var fs = Npm.require('fs');
  var path = Npm.require('path');
  // helper function, walks recursively inside nested folders and return absolute filenames
  function walk(folder) {
    var filenames = [];
    // get relative filenames from folder
    var folderContent = fs.readdirSync(folder);
    // iterate over the folder content to handle nested folders
    _.each(folderContent, function(filename) {
      // build absolute filename
      var absoluteFilename = folder + path.sep + filename;
      // get file stats
      var stat = fs.statSync(absoluteFilename);
      if (stat.isDirectory()) {
        // directory case => add filenames fetched from recursive call
        filenames = filenames.concat(walk(absoluteFilename));
      } else {
        // file case => simply add it
        filenames.push(absoluteFilename);
      }
    });
    return filenames;
  }
  var cwd = process.cwd();

  if (cwd.includes('packages')) {
    process.chdir(packageName);
  } else {
    process.chdir('packages' + path.sep + packageName);
  }
  // launch initial walk
  var result = walk(folder);
  // restore previous cwd
  process.chdir(cwd);
  return result;
}

Package.describe({
  name: 'kschingiz:api-folder-walker',
  version: '1.0.0',
  summary: 'The package will help you to recursively retrieve files and assets in meteor packages',
  git: 'https://github.com/kschingiz/api-folder-walker',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1.1');
  api.use('ecmascript');

  api.constructor.prototype.getFilesFromFolder = getFilesFromFolder;
});
