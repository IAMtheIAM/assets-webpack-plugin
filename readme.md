# assets-webpack-plugin
[![Build Status](https://travis-ci.org/kossnocorp/assets-webpack-plugin.svg?branch=master)](https://travis-ci.org/kossnocorp/assets-webpack-plugin) [![Build status](https://ci.appveyor.com/api/projects/status/qmvi3h6lk0xu8833?svg=true)](https://ci.appveyor.com/project/kossnocorp/assets-webpack-plugin)

Webpack plugin that emits a json file with assets paths.

This is a fork of the original plugin. I needed a way to get all assets emitted by webpack, including images, fonts, entry chunks and lazy chunks. The original `assets-webpack-plugin` only emitted entry chunks plus chunks added by CommonsChunkPlugin. This fork adds an option which is defaulted to `true` called `allAssets` which adds a new property in the emitted manifest file called `assets` where all assets emitted by webpack will be listed.

Additionally, I needed a way to use long term caching on the newly added assets, so this options will also remove any hash included in the file name (if it exists), as long as it is separated by two `.`s, such as `app.bundle.d1710755052417cf8694.js`, `app.d1710755052417cf8694.css`, etc. If there is no hash, the filename will not be modified.

Chunks will be separated into their own property in the manifest file, as long as the work `chunk` is in the filename, such as `lazy.chunk.d1710755052417cf8694.js`

Example of new output:

```
{
  "app": {
    "js": "js/app.bundle.481b2b29ded24baf9cc8.js",
    "css": "/css/app.style.481b2b29ded24baf9cc8.css"
  },
  "commons": {
    "js": "js/commons.bundle.602bd822aea191b8eb30.js"
  },
  "commons-lazy-app": {
    "js": "js/chunks/commons-lazy-app.chunk.cb04840fe68e848eb8e6.js"
  },
  "polyfills": {
    "js": "js/polyfills.bundle.541b6d15fafdec98d3f8.js"
  },
  "vendors": {
    "js": "js/vendors.bundle.636876e2051c910a7ef8.js"
  },
  "webpack-runtime": {
    "json": "chunk-manifest.json",
    "js": "js/webpack-runtime.783c2d7e8be43f105f92.js"
  },
  "chunks": {
    "billing.chunk.js": "js/chunks/billing.chunk.b3bcb606396f0c96623a.js",
    "commons-lazy-app.chunk.js": "js/chunks/commons-lazy-app.chunk.cb04840fe68e848eb8e6.js",
    "dashboard.chunk.js": "js/chunks/dashboard.chunk.d1710755052417cf8694.js",
    "listing.chunk.js": "js/chunks/listing.chunk.07cd2c0d2aceefba3d44.js",
    "login.chunk.js": "js/chunks/login.chunk.b5d11e92c538bca40a1d.js"
  },
  "assets": {
    "app.style.css": "/css/app.style.481b2b29ded24baf9cc8.css",
    "lg.eot": "/fonts/lg.eot",
    "lg.ttf": "/fonts/lg.ttf",
    "asset-manifest.json": "asset-manifest.json",
    "lg.svg": "assets/images/lg.svg",
    "loading.gif": "assets/images/loading.gif",
    "video-play.png": "assets/images/video-play.png",
    "vimeo-play.png": "assets/images/vimeo-play.png",
    "youtube-play.png": "assets/images/youtube-play.png",
    "chunk-manifest.json": "chunk-manifest.json",
    "loading-animation.css": "css/loading-animation.3c59cac8d7d1a78d697f06c0dc51e1b3.css",
    "MaterialIcons-Regular.eot": "fonts/MaterialIcons-Regular.eot",
    "MaterialIcons-Regular.svg": "fonts/MaterialIcons-Regular.svg",
    "MaterialIcons-Regular.ttf": "fonts/MaterialIcons-Regular.ttf",
    "MaterialIcons-Regular.woff": "fonts/MaterialIcons-Regular.woff",
    "MaterialIcons-Regular.woff2": "fonts/MaterialIcons-Regular.woff2",
    "OpenSans-Light.ttf": "fonts/OpenSans-Light.ttf",
    "Roboto-Bold.woff": "fonts/Roboto-Bold.woff",
    "Roboto-Bold.woff2": "fonts/Roboto-Bold.woff2",
    "Roboto-Light.woff": "fonts/Roboto-Light.woff",
    "Roboto-Light.woff2": "fonts/Roboto-Light.woff2",
    "Roboto-Medium.woff": "fonts/Roboto-Medium.woff",
    "Roboto-Medium.woff2": "fonts/Roboto-Medium.woff2",
    "Roboto-Regular.woff": "fonts/Roboto-Regular.woff",
    "Roboto-Regular.woff2": "fonts/Roboto-Regular.woff2",
    "Roboto-Thin.woff": "fonts/Roboto-Thin.woff",
    "Roboto-Thin.woff2": "fonts/Roboto-Thin.woff2",
    "humans.txt": "humans.txt",
    "alert-notifications.png": "icons/alert-notifications.png",
    "arrow-down.svg": "icons/arrow-down.svg",
    "arrow-up.svg": "icons/arrow-up.svg",
    "card-amex.svg": "icons/card-amex.svg",
    "card-mastercard.svg": "icons/card-mastercard.svg",
    "card-placeholder.svg": "icons/card-placeholder.svg",
    "card-visa.svg": "icons/card-visa.svg",
    "circle-grey.svg": "icons/circle-grey.svg",
    "coupon1.png": "icons/coupon1.png",
    "coupon2.png": "icons/coupon2.png",
    "default-avatar.svg": "icons/default-avatar.svg",
    "dot-blue.svg": "icons/dot-blue.svg",
    "dot-green.svg": "icons/dot-green.svg",
    "dot-purple.svg": "icons/dot-purple.svg",
    "email.svg": "icons/email.svg",
    "favicon.ico": "icons/favicon.ico",
    "fullscreen-enter.svg": "icons/fullscreen-enter.svg",
    "fullscreen-exit.svg": "icons/fullscreen-exit.svg",
    "password-icon.png": "icons/password-icon.png",
    "phone.svg": "icons/phone.svg",
    "profile-picture.png": "icons/profile-picture.png",
    "question-mark.svg": "icons/question-mark.svg",
    "success-checkmark.png": "icons/success-checkmark.png",
    "user-icon.png": "icons/user-icon.png",
    "logo-atlas-dark.svg": "images/logo-atlas-dark.svg",
    "logo-atlas-light.svg": "images/logo-atlas-light.svg",
    "logo-nighthawk-light.png": "images/logo-nighthawk-light.png",
    "app.bundle.js": "js/app.bundle.481b2b29ded24baf9cc8.js",
    "commons.bundle.js": "js/commons.bundle.602bd822aea191b8eb30.js",
    "app.map": "js/maps/app.783c2d7e8be43f105f92.map",
    "polyfills.bundle.js": "js/polyfills.bundle.541b6d15fafdec98d3f8.js",
    "vendors.bundle.js": "js/vendors.bundle.636876e2051c910a7ef8.js",
    "webpack-runtime.js": "js/webpack-runtime.783c2d7e8be43f105f92.js",
    "robots.txt": "robots.txt",
    "service-worker.js": "service-worker.js"
  }
}
```

## Table of Contents

- [Why Is This Useful?](#why-is-this-useful)

- [Install](#install)

- [Configuration](#configuration)

- [Test](#test)

- [Change Log](./CHANGELOG.md)

- [Contributing Guidelines](./CONTRIBUTING.md)

## Why Is This Useful?

When working with Webpack you might want to generate your bundles with a generated hash in them (for cache busting).

This plug-in outputs a json file with the paths of the generated assets so you can find them from somewhere else.

### Example output:

The output is a JSON object in the form:

```json
{
    "bundle_name": {
        "asset_kind": "/public/path/to/asset"
    }
}
```

Where:

  * `"bundle_name"` is the name of the bundle (the key of the entry object in your webpack config, or "main" if your entry is an array).
  * `"asset_kind"` is the camel-cased file extension of the asset

For example, given the following webpack config:

```js
{
    entry: {
        one: ['src/one.js'],
        two: ['src/two.js']
    },
    output: {
        path: path.join(__dirname, "public", "js"),
        publicPath: "/js/",
        filename: '[name]_[hash].bundle.js'
    }
}
```

The plugin will output the following json file:

```json
{
    "one": {
        "js": "/js/one_2bb80372ebe8047a68d4.bundle.js"
    },
    "two": {
        "js": "/js/two_2bb80372ebe8047a68d4.bundle.js"
    }
}
```

## Install

```sh
npm install assets-webpack-plugin --save-dev
```

## Configuration

In your webpack config include the plug-in. And add it to your config:

```js
var path = require('path')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin()

module.exports = {
    // ...
    output: {
        path: path.join(__dirname, "public", "js"),
        filename: "[name]-bundle-[hash].js",
        publicPath: "/js/"
    },
    // ....
    plugins: [assetsPluginInstance]
}
```

### Options

You can pass the following options

#### `allAssets`

Optional. `true` by default.

Inserts all assets emitted by webpack under a new property called `assets`, 
such as images, fonts, icons, and lazy chunks. The entry chunks will be duplicated 
here since they are already in the existing chunk. 

If `false` the output will only include `assetsByChunkName` which are entry chunks plus
explicit chunks added by CommonsChunkPlugin

```js
new AssetsPlugin({allAssets: false})
```

#### `filename`

Optional. `webpack-assets.json` by default.

Name for the created json file.

```js
new AssetsPlugin({filename: 'assets.json'})
```

#### `fullPath`

Optional. `true` by default.

If `false` the output will not include the full path
of the generated file.

```js
new AssetsPlugin({fullPath: false})
```

e.g.

`/public/path/bundle.js` vs `bundle.js vs`

#### `includeManifest`

Optional. `false` by default.

Inserts the manifest javascript as a `text` property in your assets.
Accepts the name of your manifest chunk. A manifest is the last CommonChunk that
only contains the webpack bootstrap code. This is useful for production
use when you want to inline the manifest in your HTML skeleton for long-term caching.
See [issue #1315](https://github.com/webpack/webpack/issues/1315)
or [a blog post](https://medium.com/@matt.krick/a-production-ready-realtime-saas-with-webpack-7b11ba2fa5b0#.p1vvfr3bm)
to learn more.

```js
new AssetsPlugin({includeManifest: 'manifest'})
// assets.json:
// {entries: {manifest: {js: `hashed_manifest.js`, text: 'function(modules)...'}}}
//
// Your html template:
// <script>
// {assets.entries.manifest.text}
// </script>
```

#### `path`

Optional. Defaults to the current directory.

Path where to save the created JSON file.

```js
new AssetsPlugin({path: path.join(__dirname, 'app', 'views')})
```

#### `prettyPrint`

Optional. `false` by default.

Whether to format the JSON output for readability.

```js
new AssetsPlugin({prettyPrint: true})
```

#### `processOutput`

Optional. Defaults is JSON stringify function.

Formats the assets output.

```js
new AssetsPlugin({
  processOutput: function (assets) {
    return 'window.staticMap = ' + JSON.stringify(assets)
  }
})
```

#### `update`

Optional. `false` by default.

When set to `true`, the output JSON file will be updated instead of overwritten.

```js
new AssetsPlugin({update: true})
```

#### `metadata`

Inject metadata into the output file. All values will be injected into the key "metadata".

```js
new AssetsPlugin({metadata: {version: 123}})
// Manifest will now contain:
// {
//   metadata: {version: 123}
// }
```

### Using in multi-compiler mode

If you use webpack multi-compiler mode and want your assets written to a single file,
you **must** use the same instance of the plugin in the different configurations.

For example:

```js
var webpack = require('webpack')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin()

webpack([
  {
    entry: {one: 'src/one.js'},
    output: {path: 'build', filename: 'one-bundle.js'},
    plugins: [assetsPluginInstance]
  },
  {
    entry: {two:'src/two.js'},
    output: {path: 'build', filename: 'two-bundle.js'},
    plugins: [assetsPluginInstance]
  }
])
```


### Using this with Rails

You can use this with Rails to find the bundled Webpack assets via Sprockets.
In `ApplicationController` you might have:

```ruby
def script_for(bundle)
  path = Rails.root.join('app', 'views', 'webpack-assets.json') # This is the file generated by the plug-in
  file = File.read(path)
  json = JSON.parse(file)
  json[bundle]['js']
end
```

Then in the actions:

```ruby
def show
  @script = script_for('clients') # this will retrieve the bundle named 'clients'
end
```

And finally in the views:

```erb
<div id="app">
  <script src="<%= @script %>"></script>
</div>
```

## Test

```sh
npm test
```
