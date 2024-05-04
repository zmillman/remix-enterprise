import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-google";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
// TODO: replace `unknown` with a real user type
export const authenticator = new Authenticator<unknown>(sessionStorage);

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId) {
  throw new Error("You must provide a GOOGLE_CLIENT_ID");
}
if (!googleClientSecret) {
  throw new Error("You must provide a GOOGLE_CLIENT_SECRET");
}

const googleStrategy = new GoogleStrategy(
  {
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    prompt: "select_account", // always ask the user to pick their account
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    throw new Error(`Got user: ${JSON.stringify(profile)}`);
    // return User.findOrCreate({ email: profile.emails[0].value })
  }
);

authenticator.use(googleStrategy);
