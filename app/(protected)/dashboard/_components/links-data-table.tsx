import { CopyCustomIcon } from "@/components/copy-icon";
import { buttonVariants } from "@/components/ui/button";
import { UserLinksType } from "@/lib/links";
import { cn } from "@/lib/utils";
import { Link2OffIcon } from "lucide-react";
import Link from "next/link";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
interface DashboardDataTableProps {
    links: UserLinksType;
}

const getFallback = (domain: string) => {
    try {
        const [first, second] = domain.split(".");
        const faviconUrl = `http://${domain}/favicon.ico`;
        return {
            src: faviconUrl,
            alt: `${first[0]}${first[1]}`.toUpperCase(),
        }
    } catch (error) {
        return {
            src: "",
            alt: "?",
        }
    }
};

export function DashboardDataTable({ links = [] }: DashboardDataTableProps) {
    return (
        <div className="space-y-4">
            {
                links.map((data) => (
                    <div key={data.links.hashedUrl} className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        "flex items-center h-12"
                    )}>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={getFallback(data.links.domains.domain).src} alt="Avatar" />
                            <AvatarFallback>
                                {
                                    getFallback(data.links.domains.domain).alt
                                }
                            </AvatarFallback>
                        </Avatar>


                        <Link href={`/view/${data.links.domains.domain}/${data.links.hashedUrl}`} className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {
                                    data.assignedName
                                }
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {
                                    data.links.domains.domain
                                }

                            </p>
                        </Link>
                        <div className="ml-auto font-sm flex items-center gap-x-2">
                            {
                                data.links.url.slice(0, 25)
                            }...

                            <CopyCustomIcon data={data.links.url} />
                        </div>
                    </div>
                ))
            }
            {
                links.length === 0 && (
                    <div className="flex items-center justify-center p-4">
                        <Link2OffIcon className="text-muted-foreground h-12 w-12" />
                    </div>
                )
            }
        </div>
    )
}