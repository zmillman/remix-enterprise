// Copied from https://github.com/sergiodxa/remix-auth/blob/main/README.md

import { createCookieSessionStorage } from "@remix-run/node";

const authSecret = process.env.AUTH_SECRET;
if (!authSecret) {
  throw new Error("You must provide a AUTH_SECRET");
}

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [authSecret], // token to encrypt content
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
