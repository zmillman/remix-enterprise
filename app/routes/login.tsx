import { Box, Button, Callout, Card, Heading } from "@radix-ui/themes";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { commitSession, getSession } from "../services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {});

  if (user) {
    return redirect("/dashboard");
  } else {
    const session = await getSession(request.headers.get("Cookie"));
    const authError = session.get(authenticator.sessionErrorKey);

    return json(
      { authErrorMessage: authError?.message },
      {
        headers: {
          "Set-Cookie": await commitSession(session), // clear flash message from the cookie
        },
      },
    );
  }
}

export default function LoginPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Card>
      <Box>
        <Heading mb="4">Sign in</Heading>
        {data.authErrorMessage ? (
          <Callout.Root color="red" mb="2">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{data.authErrorMessage}</Callout.Text>
          </Callout.Root>
        ) : (
          <></>
        )}
        <Form action="/auth/google" method="POST">
          <Button type="submit">Sign in with Google</Button>
        </Form>
      </Box>
    </Card>
  );
}
