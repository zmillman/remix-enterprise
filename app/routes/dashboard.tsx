import { Box, Heading, Text } from "@radix-ui/themes";

export default function DashboardPage() {
  return (
    <Box>
      <Heading mb="4">Dashboard</Heading>
      <Text as="p" mb="4">
        Welcome to the dashboard, [name]!
      </Text>
      <Text as="p" mb="4">
        You're only able to see this page if you're signed in.
      </Text>
    </Box>
  );
}
