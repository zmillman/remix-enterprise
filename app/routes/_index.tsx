import { Code, Heading, Text } from "@radix-ui/themes";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { getSession } from "../services/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return json({ session: session.data });
};

export default function HomePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Heading mb="4">Welcome to the app</Heading>
      <Text mb="4" as="p">
        This is an example demonstrating the Remix template. You can only view
        the <Link to="/dashboard">Dashboard</Link> if you're signed in.
      </Text>
      <Heading size="3">Session</Heading>
      <pre>
        <Code>{JSON.stringify(data.session, null, 2)}</Code>
      </pre>
    </>
  );
}
