import { config } from "@/config/config";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import logger from "./logger";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
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
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image as string
                session.user.loginId = token.loginId as number | null
            }

            return session
        },
        async jwt({ token, user, profile }) {
            if (!user || !token) {
                return token
            }
            const dbUser = await db.user.findUnique({
                where: {
                    email: token.email || user.email || ""
                },
                include: {
                    user_login_history: {
                        select: {
                            id: true
                        },
                        where: {
                            logoutTime: null
                        
                        }
                    }
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
            // Create login history if not exists
            let loginId = null;
            if(dbUser.user_login_history.length === 0){
                loginId = await db.user_login_history.create({
                    data: {
                        userId: dbUser.id,
                    },
                    select: {
                        id: true,
                        userId: true,
                    }
                });
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                image: dbUser.image,
                role: dbUser.role,
                loginId: loginId?.id || null
            }

        },
        redirect() {
            return "/dashboard"
        }
    },
    events: {
        async signOut({ session, token }) {
            try {

                if (session && session.user && session.user.id && session.user.loginId) {
                    await db.user_login_history.update({
                        where: {
                            userId: session.user.id,
                            id: session.user.loginId
                        },
                        data: {
                            logoutTime: new Date()
                        }
                    });
                }
                else {
                    logger.error("Session or user not found");
                    if (token && token.loginId && token.id) {
                        logger.warn("Token found");
                        await db.user_login_history.update({
                            where: {
                                userId: token.id,
                                id: token.loginId
                            },
                            data: {
                                logoutTime: new Date()
                            }
                        });
                    }
                }
            } catch (error) {
                logger.error("Error in signOut event", error);
            }
        },

        async signIn({ user }) {
            try {
                logger.info(`User signed in:`, { user });
                if (!user || !user.id) {
                    logger.error("User or loginId not found", { user });
                    return;
                }
                const loginId = await db.user_login_history.create({
                    data: {
                        userId: user.id,
                    },
                    select: {
                        id: true,
                        userId: true,
                    }
                });
                return;

            } catch (error) {
                logger.error("Error in signIn event", error);
                //TODO: Review error handling
                if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
                    return;
                }
                return;
            }
        },

    }
}

export const getAuthSession = () => getServerSession(authOptions);