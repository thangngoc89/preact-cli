export default (env, options = {}) => ({
  presets: [
    [
      require.resolve("babel-preset-env"),
      require.resolve("babel-preset-flow"),
      {
        loose: true,
        modules: options.modules || false,
        uglify: true,
        browsers: env.browsers
          ? env.browsers.split()
          : ["> 1%", "Last 2 versions", "IE >= 9"],
        exclude: ["transform-regenerator", "transform-es2015-typeof-symbol"]
      }
    ],
    require.resolve("babel-preset-stage-0")
  ],
  plugins: [
    require.resolve("babel-plugin-transform-object-assign"),
    require.resolve("babel-plugin-transform-decorators-legacy"),
    require.resolve("babel-plugin-transform-react-constant-elements"),
    require.resolve("babel-plugin-transform-react-remove-prop-types"),
    [require.resolve("babel-plugin-transform-react-jsx"), { pragma: "h" }],
    [
      require.resolve("babel-plugin-jsx-pragmatic"),
      {
        module: "preact",
        export: "h",
        import: "h"
      }
    ],
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        alias: {
          react: "preact-compat",
          "react-dom": "preact-compat"
        }
      }
    ]
  ]
});
