import { Box, Heading, Text } from "@radix-ui/themes";
import { getSession } from "../services/session.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return json({ user: session.data.user });
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Box>
      <Heading mb="4">Dashboard</Heading>
      <Text as="p" mb="4">
        Welcome to the dashboard, {data.user.name}!
      </Text>
      <Text as="p" mb="4">
        You're only able to see this page if you're signed in.
      </Text>
    </Box>
  );
}
