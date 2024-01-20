"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserDomainLinksType } from "@/lib/links"
import { useSelectLink } from "@/store/selected"
import { ToolTipWrapper } from "@/components/tooltip-wrapper"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

interface NavProps {
    isCollapsed: boolean
    links: UserDomainLinksType;
}

export function Nav({ links, isCollapsed }: NavProps) {
    const { onLinkChange, selectedLink, selectedDomain } = useSelectLink((state) => state)
    const searchParams = useSearchParams();
    useEffect(() => {
        if (searchParams.get('link')) {
            onLinkChange(searchParams.get('link') as string)
        }
    }, [ onLinkChange, searchParams])
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
                                href={`?link=${link.links.hashedUrl}`}
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "icon" }),
                                    "h-7 w-9",
                                    "dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                                    searchParams.get('link') === link.links.hashedUrl ? "bg-primary text-white" : "bg-transparent text-muted-foreground"
                                )}

                            >
                                {index + 1}
                            </Link>
                        </ToolTipWrapper>
                    ) : (
                        <Link
                            key={index}
                            href={`?link=${link.links.hashedUrl}`}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "justify-between w-full flex items-center gap-4",
                                searchParams.get('link') === link.links.hashedUrl ? "bg-primary text-white" : "bg-transparent text-muted-foreground"
                            )}

                        >
                            <p>
                                {index + 1}.{" "} {link.assignedName}
                            </p>
                            <Badge variant={"outline"}>
                                {
                                   (link.tags && link.tags.length > 0) ? JSON.parse(link.tags) : " "
                                }
                            </Badge>
                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}