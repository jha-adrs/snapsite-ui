"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export function ModeToggle2({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { setTheme, theme } = useTheme()
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    return (
        <Button variant="ghost" size="default" className="w-full text-left gap-x-2 justify-start" onClick={toggleTheme}>
            <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="">Toggle theme</span>
        </Button>
    )
}
