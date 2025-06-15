import type { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession["user"]; // Merge with default user properties
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    /** User ID */
    id?: string;
  }
}