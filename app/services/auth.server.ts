import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-google";
import { redirect } from "@remix-run/server-runtime";
import { prisma } from "../utils/db.server";
import { findOrCreateUserId } from "../model/user.server";

// TODO: This should only be storing a session token that identifies the user - nothing else
interface User {
  id: string;
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage, {
  sessionErrorKey: "auth-error",
  throwOnError: true,
});

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

  async ({ accessToken: _a, refreshToken: _r, extraParams: _e, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value })
    return {
      id: findOrCreateUserId(prisma, { email: profile.emails[0].value }),
    };
  }
);

authenticator.use(googleStrategy);

/**
 * Get the authenticated user, or redirect to `/login` if they're not signed in
 */
export const authenticatedUser = async (request: Request) => {
  const user = await authenticator.isAuthenticated(request);

  if (user) {
    // TODO: load user data from the database instead of storing in the session
    return user;
  } else {
    const session = await getSession(request.headers.get("Cookie"));
    session.flash(authenticator.sessionErrorKey, {
      message: "You must be signed in to view that page",
    });
    throw redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) }, // persist flash message
    });
  }
};
