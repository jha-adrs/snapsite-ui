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
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios";
import { useSelectDomain } from "@/store/selected"


interface DomainSwitcherProps {
    isCollapsed: boolean
    currentDomain: string
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
    currentDomain
}: DomainSwitcherProps) {
    const path = usePathname();
    const router = useRouter();
    //const { selectedDomain, onDomainChange } = useSelectDomain((state) => state);
    const [selectedDomain, onDomainChange] = React.useState(currentDomain);
    const { mutate: refetchDomain, isPending } = useMutation({
        mutationFn: async () => {
            console.log("test");
            const { data } = await axios.get(`/api/links`,{
                params: {
                    domain: selectedDomain
                }
            });
            return data;
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        },
        onSuccess: () => {
            toast.success("Successfully added domain");
        }
    })


    React.useEffect(() => {
        // On domain change, update the current URL
        if (selectedDomain === '') {
            onDomainChange(currentDomain);
        }

    }, [selectedDomain, currentDomain, onDomainChange])
    return (
        <Select defaultValue={currentDomain} onValueChange={(e) => {
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
                aria-label="Select account"
            >
                <SelectValue placeholder="Select an account">
                    <Avatar className="h-6 w-6 border-2 border-primary">
                        <AvatarImage src={domains.find((domain) => domain.label === selectedDomain)?.icon} alt="Avatar" />
                        <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                        {
                            domains.find((domain) => domain.label === selectedDomain)
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