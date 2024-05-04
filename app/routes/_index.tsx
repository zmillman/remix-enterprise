import { Button, Heading, Text } from "@radix-ui/themes";
import { Link } from "@remix-run/react";

export default function HomePage() {
  return (
    <>
      <Heading mb="4">Welcome to the app</Heading>
      <Text mb="4" as="p">This is the homepage</Text>
      <Button asChild>
        <Link to="/login">Sign in</Link>
      </Button>
    </>
  );
}
