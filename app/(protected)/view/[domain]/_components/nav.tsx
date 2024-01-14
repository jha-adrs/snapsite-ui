"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserDomainLinksType } from "@/lib/links"
import { capitalize, slice } from "lodash"

interface NavProps {
    isCollapsed: boolean
    links: UserDomainLinksType;
}

export function Nav({ links, isCollapsed }: NavProps) {
    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                        "h-9 w-9",
                                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                    )}
                                >
                                    {slice(link.assignedName, 0, 4)}
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4">
                                {link.assignedName}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            href="#"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "justify-between flex items-center gap-4"
                            )}
                        >
                            <p>
                                {link.assignedName}
                            </p>
                            <p>
                                ({
                                    link.tags ? (JSON.parse(link.tags)) : null
                                })
                            </p>
                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}