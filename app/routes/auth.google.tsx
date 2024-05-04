import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Text } from "@radix-ui/themes";

export const loader = () => redirect("/login");

export const action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("google", request);
};

export default function GooglePage() {
  return <Text>Google</Text>;
}
