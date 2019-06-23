# Meteor Api folder walker

The package will define `getFilesFromFolder` method in Package API instance which will recusively scan given folder and returns all files under this folder.

## Installation

```js
meteor add kschingiz:api-folder-walker
```

## Usage

```js
Package.onUse(api => {
  // just to make sure it's initialized before your package
  api.use('kschingiz:api-folder-walker');

  const assets = api.getFilesFromFolder('myPackage', 'assets');
  api.addAssets(assets, 'server');

  const files = api.getFilesFromFolder('myPackage', 'src');
  api.addFiles(files, 'server');
});
```

## Motivation

### The problem

If you are developing meteor packages you will have lots of files and assets:

```
- assets
  - asset1
  - asset2
  - asset3
  - asset4
  - asset5
```

You will need to register/add those assets into package API in order to use them:

```js
Package.onUse(api => {
  api.addAssets(
    ['assets/asset1', 'assets/asset2', 'assets/asset3', 'assets/asset4', 'assets/asset5'],
    'server'
  );
});
```

When some asset changes it's name, deleted or you have added new assets/file, you are going to fix package.js again and again.
Imagine if you have +100 assets, listing them all manually is time consuming.
Meteor does not provide method of adding assets like:

```js
Package.onUse(api => {
  api.addAssets(['assets/*'], 'server');
});
```

### Solution

The package adds new method into Package API

```js
api.getFilesFromFolder(myPackage, folderToScan);
```

The method scans `folderToScan` under `myPackage` and return all files:

```js
Package.onUse(api => {
  const assets = api.getFilesFromFolder('myPackage', 'assets');
  api.addAssets(assets, 'server');
});
```

So you don't need to manually manage arrays of assets and files
