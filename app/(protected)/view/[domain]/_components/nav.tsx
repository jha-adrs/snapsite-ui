"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn, getBadgeColor } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserDomainLinksType } from "@/lib/links"
import { capitalize, slice } from "lodash"
import { useSelectLink } from "@/store/selected"
import { ToolTipWrapper } from "@/components/tooltip-wrapper"
import { Badge } from "@/components/ui/badge"

interface NavProps {
    isCollapsed: boolean
    links: UserDomainLinksType;
}

export function Nav({ links, isCollapsed }: NavProps) {
    const { onLinkChange } = useSelectLink((state) => state)
    return (
        <div
            data-collapsed={isCollapsed}
            className="group pt-6 flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <ToolTipWrapper side="right" text={link.assignedName} key={index}>
                            <Link
                                href="#"
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "icon" }),
                                    "h-7 w-9",
                                    "dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                )}
                                onClick={
                                    () => {
                                        onLinkChange(link.links.hashedUrl)
                                    }
                                }
                            >
                                {index+1}
                            </Link>
                        </ToolTipWrapper>
                    ) : (
                        <Link
                            key={index}
                            href="#"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "justify-between flex items-center gap-4"
                            )}
                            onClick={
                                () => {
                                    onLinkChange(link.links.hashedUrl)
                                }
                            }
                        >
                            <p>
                               {index+1}.{" "} {link.assignedName}
                            </p>
                            <p>
                                {
                                    link.tags ? <Badge variant={"outline"}>
                                        {
                                            JSON.parse(link.tags)
                                        }
                                    </Badge> : null
                                }
                            </p>
                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}