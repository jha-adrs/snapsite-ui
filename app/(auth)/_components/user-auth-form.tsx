"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { signIn } from 'next-auth/react'
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const handleGoogle = () => {
        setIsLoading(true);
        try {
            signIn('google',)
        } catch (err) {
            toast.error(
                "Something went wrong"
            )
            setIsLoading(false);
        }
    }
    const handleMicrosoft = () => {
        return toast.error(
            "Microsoft login is not yet supported"
        )
    }
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs ">
                    <span className=" px-2 text-muted-foreground">
                        Preferred login methods
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogle} >
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading || true} onClick={handleMicrosoft} >
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.microsoft className="mr-2 h-4 w-4" />
                )}{" "}
                Microsoft
            </Button>
        </div>
    )
}