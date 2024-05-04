import { Box, Button, Heading } from "@radix-ui/themes";
import { Form } from "@remix-run/react";

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
