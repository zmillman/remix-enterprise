import { json, Links, Meta, type MetaFunction, Outlet, Scripts, useLoaderData, } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import AppShell from "./components/AppShell";
import { getSession } from "./services/session.server";

export const links: LinksFunction = () => {
  return [{ rel: "icon", href: "/favicon-32.png" }];
};

export const meta: MetaFunction = () => {
  return [{ title: "Remix Enterprise" }];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return json({ user: session.data.user });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme>
          <AppShell user={data.user}>
            <Container size="1" my="8">
              <Outlet />
            </Container>
          </AppShell>

          <Scripts />
        </Theme>
      </body>
    </html>
  );
}
