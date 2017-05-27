module.exports = class PushManifestPlugin {
  apply(compiler) {
    compiler.plugin("emit", function(compilation, callback) {
      let manifest = {};
      let routes = [];
      let mainJs;
      let mainCss;
      for (let filename in compilation.assets) {
        if (/route-/.test(filename)) {
          routes.push(filename);
        } else if (/^main(.+)\.css$/.test(filename)) {
          mainCss = filename;
        } else if (/^app(.+)\.js$/.test(filename)) {
          mainJs = filename;
        }
      }

      routes.forEach(filename => {
        let path = filename
          .replace(/route-/, "/")
          .replace(/\.chunk(\.\w+)?\.js$/, "")
          .replace(/\/home/, "/");
        manifest[path] = {
          [mainCss]: {
            type: "style",
            weight: 1
          },
          [mainJs]: {
            type: "script",
            weight: 1
          },
          [filename]: {
            type: "script",
            weight: 0.9
          }
        };
      });

      let output = JSON.stringify(manifest);
      compilation.assets["push-manifest.json"] = {
        source() {
          return output;
        },
        size() {
          return output.length;
        }
      };

      callback();
    });
  }
};
