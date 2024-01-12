import { CopyCustomIcon } from "@/components/copy-icon";
import { UserLinksType } from "@/lib/links";
import { Link2OffIcon } from "lucide-react";

interface DashboardDataTableProps {
    links: UserLinksType;

}

export function DashboardDataTable({ links = [] }: DashboardDataTableProps) {
    return (
        <div className="space-y-4">
            {
                links.map((data) => (
                    <div key={data.links.hashedUrl} className="flex items-center">

                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {
                                    data.links.domains.domain
                                }
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {data.timing.toLowerCase()}

                            </p>
                        </div>
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