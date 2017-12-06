var merge = require('lodash.merge')

var getAssetKind = require('./lib/getAssetKind')
var isHMRUpdate = require('./lib/isHMRUpdate')
var isSourceMap = require('./lib/isSourceMap')

var createQueuedWriter = require('./lib/output/createQueuedWriter')
var createOutputWriter = require('./lib/output/createOutputWriter')

function AssetsWebpackPlugin (options) {
  this.options = merge({}, {
    path: '.',
    filename: 'webpack-assets.json',
    prettyPrint: false,
    update: false,
    fullPath: true,
    allAssets: true // new property
  }, options)
  this.writer = createQueuedWriter(createOutputWriter(this.options))
}

AssetsWebpackPlugin.prototype = {

  constructor: AssetsWebpackPlugin,

  apply: function (compiler) {
    var self = this

    compiler.plugin('after-emit', function (compilation, callback) {
      var options = compiler.options
      var stats = compilation.getStats().toJson({
        hash: true,
        publicPath: true,
        assets: true,
        chunks: false,
        modules: false,
        source: false,
        errorDetails: false,
        timings: false
      })
      // publicPath with resolved [hash] placeholder

      var assetPath = (stats.publicPath && self.options.fullPath) ? stats.publicPath : ''
      // assetsByChunkName contains a hash with the bundle names and the produced files
      // e.g. { one: 'one-bundle.js', two: 'two-bundle.js' }
      // in some cases (when using a plugin or source maps) it might contain an array of produced files
      // e.g. {
      // main:
      //   [ 'index-bundle-42b6e1ec4fa8c5f0303e.js',
      //     'index-bundle-42b6e1ec4fa8c5f0303e.js.map' ]
      // }
      var assetsByChunkName = stats.assetsByChunkName

      var output = Object.keys(assetsByChunkName).reduce(function (chunkMap, chunkName) {
        var assets = assetsByChunkName[chunkName]
        if (!Array.isArray(assets)) {
          assets = [assets]
        }
        chunkMap[chunkName] = assets.reduce(function (typeMap, asset) {
          if (isHMRUpdate(options, asset) || isSourceMap(options, asset)) {
            return typeMap
          }

          var typeName = getAssetKind(options, asset)
          typeMap[typeName] = assetPath + asset

          return typeMap
        }, {})

        return chunkMap
      }, {})

      /******************************************************************
       *      BEGIN modified code by IAMtheIAM
       ******************************************************************/

      if (self.options.allAssets) {
        /**
         * Get the webpack-manifest.json created by 'assets-webpack-plugin' and add additional assets
         * to it, such as images, fonts, icons, and lazy chunks. The entry chunks will be duplicated
         * here since they are already in the existing chunk, but its ok because we will only use the new 'assets' and possible lazy chunks.
         */

          // Separate chunks
        const chunkManifest = {};
        const assetManifest = {};
        stats.assets.map(asset => asset.name)
          .sort()
          .forEach((key) => {

            /**
             * Matches anything with the work 'chunks' in it such as app.chunk.636876e2051c910a7ef8.js,
             */
            let regEx = /chunks/gmi;
            let passTest = regEx.test(key);

            // Trim the hash
            let newKey = trimHash(key);

            // Trim the path
            newKey = trimPath(newKey);

            console.log(key, passTest, newKey);

            if (passTest) {
              // Separate chunks
              chunkManifest[newKey] = key;
            } else {
              // Separate other assets
              assetManifest[newKey] = key;
            }
          });

        output['chunks'] = chunkManifest;
        output['assets'] = assetManifest;

        function trimHash(key) {
          /**
           * Matches anything between two dots `.` such as app.bundle.636876e2051c910a7ef8.js,
           * app.chunk.636876e2051c910a7ef8.js, app.style.636876e2051c910a7ef8.css
           * or app.636876e2051c910a7ef8.js, but don't match the `.bundle.`, `.chunk.`, or `.style.`
           */
          let regEx = /\.[^.\n]+(?=\.(?:[^.]+$))/gmi;
          return key.replace(regEx, '');
        }

        function trimPath(key) {
          // Get only the filename by removing everything before the last `/`, including `/`
          return key.slice(key.lastIndexOf('/') + 1)
        }
      }
      /******************************************************************
       *      END modified code by IAMtheIAM
       ******************************************************************/

      var manifestName = self.options.includeManifest === true ? 'manifest' : self.options.includeManifest
      if (manifestName) {
        var manifestEntry = output[manifestName]
        if (manifestEntry) {
          var manifestAssetKey = manifestEntry.js.substr(assetPath.length)
          var parentSource = compilation.assets[manifestAssetKey]
          var entryText = parentSource.source()
          if (!entryText) {
            throw new Error('Could not locate manifest function in source', parentSource)
          }
          // use _value if the uglify plugin was applied
          manifestEntry.text = entryText
        }
      }

      if (self.options.metadata) {
        output.metadata = self.options.metadata
      }

      self.writer(output, function (err) {
        if (err) {
          compilation.errors.push(err)
        }
        callback()
      })
    })
  }
}

module.exports = AssetsWebpackPlugin
