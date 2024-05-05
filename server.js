import { createRequestHandler } from "@remix-run/express";
import express from "express";
import compression from "compression";
// TODO: add protection with helmet (see https://github.com/dev-xo/remix-saas/blob/main/server.mjs)
// TODO: add rate limiting (see https://github.com/dev-xo/remix-saas/blob/main/server.mjs)
// TODO: add CSRF and honeypot protection (see https://github.com/dev-xo/remix-saas/blob/main/server.mjs)

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();

/**
 * Good practices: Disable x-powered-by.
 * @see http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
 */
app.disable("x-powered-by");

app.use(compression());

app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client")
);

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import("./build/server/index.js");

app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
