import { Box, Button, Heading } from "@radix-ui/themes";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
};

export default function LoginPage() {
  return (
    <Box>
      <Heading mb="4">Sign in</Heading>
      <Form action="/auth/google" method="POST">
        <Button type="submit">Sign in with Google</Button>
      </Form>
    </Box>
  );
}
