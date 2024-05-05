import { Box, Button, Flex } from "@radix-ui/themes";
import { Form, Link } from "@remix-run/react";

interface AppShellProps {
  user?: {
    email: string;
    name: string;
  };
}

/**
 * Wraps content with a topbar for signing in / out
 */
export default function AppShell(
  props: React.PropsWithChildren<AppShellProps>
) {
  return (
    <Box>
      <Flex justify="between">
        <Box>
          <Link to="/">Home</Link>
        </Box>
        <Box>
          {props.user ? (
            <Form action="/logout" method="POST">
              <Button type="submit">Sign out</Button>
            </Form>
          ) : (
            <Button asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </Box>
      </Flex>
      <Box>{props.children}</Box>
    </Box>
  );
}
