import { Links, Meta, MetaFunction, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "@radix-ui/themes/styles.css";
import { Button, Theme } from "@radix-ui/themes";

export const links: LinksFunction = () => {
  return [{ rel: "icon", href: "/favicon-32.png" }];
};

export const meta: MetaFunction = () => {
  return [{title: "Remix Enterprise"}]
}

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme>
          <Button>Hey world 👋</Button>
          <Outlet />

          <Scripts />
        </Theme>
      </body>
    </html>
  );
}
