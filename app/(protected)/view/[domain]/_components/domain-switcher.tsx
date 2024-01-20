"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelectLink } from "@/store/selected"
interface DomainSwitcherProps {
    isCollapsed: boolean
    domains: {
        label: string
        id: number
        createdAt: Date;
        icon: string;
    }[]
}

export function DomainSwitcher({
    isCollapsed,
    domains,
}: DomainSwitcherProps) {
    const router = useRouter();
    const path = usePathname();
    //const { selectedDomain, onDomainChange } = useSelectDomain((state) => state);
    const { onDomainChange, onLinkChange } = useSelectLink((state) => state);
    const domainInPath = React.useMemo(() => {
        return path.split('/')[2];
    }, [path]);
    return (
        <Select defaultValue={domainInPath} onValueChange={(e) => {
            onLinkChange('');
            onDomainChange(e);
            router.replace(`/view/${e}`);
            router.refresh();
        }}>
            <SelectTrigger
                className={cn(
                    "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                    isCollapsed &&
                    "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
                )}
                aria-label="Select domain"
            >
                <SelectValue placeholder="Select a domain">
                    <Avatar className="h-6 w-6 border-2 border-primary">
                        <AvatarImage src={domains.find((domain) => domain.label === domainInPath)?.icon} alt="Avatar" />
                        <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                        {
                            domains.find((domain) => domain.label === domainInPath)
                                ?.label
                        }
                    </span>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {domains.map((domain) => (
                    <SelectItem key={domain.id} value={domain.label}>
                        <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                            <Avatar className="h-6 w-6 border-2 border-primary">
                                <AvatarImage src={domain?.icon} alt="Avatar" />
                                <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                            {domain.label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}