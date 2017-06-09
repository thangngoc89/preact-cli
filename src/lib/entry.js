import { h, render } from "preact";

if (process.env.NODE_ENV === "development") {
  // enable preact devtools
  require("preact/devtools");
} else {
  require("offline-plugin/runtime").install();
}

const interopDefault = m => (m && m.default) || m;

let app = interopDefault(require("preact-cli-entrypoint"));

if (typeof app === "function") {
  let root = document.body.firstElementChild;

  let init = () => {
    let app = interopDefault(require("preact-cli-entrypoint"));
    root = render(h(app), document.body, root);
  };

  if (module.hot) module.hot.accept("preact-cli-entrypoint", init);

  if (typeof fetch === "function") {
    init();
  } else {
    require.ensure(
      ["preact-cli-polyfills"],
      () => {
        require("preact-cli-polyfills");
        init();
      },
      "polyfills"
    );
  }
}
