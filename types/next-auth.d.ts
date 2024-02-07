import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null | undefined;
      loginId: number | null | undefined;
    } & DefaultSession["user"]
  }

}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    id: string | null | undefined;
    loginId: number | null | undefined;
  }
}