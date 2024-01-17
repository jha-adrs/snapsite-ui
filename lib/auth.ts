import { config } from "@/config/config";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Google Auth enough for now

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
        // TODO :Decide expiry and database or JWT
    },
    pages: {
        signIn: "/sign-in",
        error: "/error",
        //signOut: "/auth/signout",
    },
    providers: [
        GoogleProvider({
            clientId: config.googleClientId,
            clientSecret: config.googleClientSecret,
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token && session && session.user && token.email) {
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image as string
            }

            return session
        },
        async jwt({ token, user }) {
            if (!user || !token) {
                return token
            }
            const dbUser = await db.user.findUnique({
                where: {
                    email: token.email || user.email || ""
                }
            });
            if (!dbUser) {
                token.id = user!.id
                return token
            }
            // TODO: Add more fields
            if (!dbUser.role) {
                await db.user.update({
                    where: {
                        id: dbUser.id
                    },
                    data: {
                        role: "USER"
                    }
                })
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                image: dbUser.image,
                role: dbUser.role,
            }

        },
        redirect() {
            return "/"
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions);