throw new Error("AUTH CLIENT LOADED");

import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

console.log("AUTH CLIENT BASE URL:", process.env.NEXT_PUBLIC_APP_URL);

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
