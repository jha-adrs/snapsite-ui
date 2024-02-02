import Link from "next/link"
import { UserAuthForm } from "../_components/user-auth-form"
import { ModeToggle } from "@/components/mode-toggle"
import Logo from "../_components/logo"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeadLine } from "../_components/headline"

export const dynamic = 'force-dynamic'

// export const metadata = {
//     title: "Authentication",
//     description: "Authentication forms built using the components.",
// }

export default function AuthenticationPage() {
    // TODO: Fix , hide scrollbar
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 w-screen h-screen no-scrollbar">
            <div className=" hidden lg:flex lg:col-span-3 ">

                <div className=" w-full h-full left-0 top-0">
                    <HeadLine />
                </div>
            </div>
            <div className="col-span-2 lg:border-l lg:border-muted-foreground">
                <div className="absolute right-5 top-5">
                    <ModeToggle />
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-background">
                    <Card className=" h-auto w-[50%] lg:w-[80%] backdrop-blur-sm bg-zinc-500/10 border-none">
                        <CardHeader className=" items-center">
                            <CardTitle className="flex flex-col justify-center items-center">
                                <Logo />
                                <p className="text-3xl font-semibold mt-4">
                                    Get Started
                                </p>
                            </CardTitle>
                            <CardDescription>
                                Lets get you started with your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserAuthForm />

                        </CardContent>
                        <CardFooter>
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <Link
                                    href="/terms"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>

    )
}