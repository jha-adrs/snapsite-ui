import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DomainTable } from './_components/domain-table';
import { LinksTable } from './_components/links-table';
import { getUserDomains, getUserLinks } from '@/lib/links';
import { duration } from '@/lib/utils';
import { AddLinkDialog } from '../dashboard/_components/add-link-dialog';
interface UserViewPageProps {

}

const UserViewPage = async ({ }: UserViewPageProps) => {
    // Get user domain and links
    const domains = await getUserDomains();
    const links = await getUserLinks();
    const domainTableData = domains.map((domain) => {
        return {
            domain: domain.domains.domain,
            isActive: domain.domains.isActive ? "Yes" : "No",
            createdAt: duration(domain.createdAt),
            linksCount: domain.domains._count.links
        }
    });

    const linksTableData = links.map((link) => {
        return {
            url: link.links.url,
            hash: link.links.hashedUrl,
            isActive: link.links.isActive ? "Yes" : "No",
            createdAt: duration(link.createdAt),
            timing: link.timing,
            tags: link.tags,
            domain: link.links.domains.domain,
            assignedName: link.assignedName
        }
    });
    return (

        <div className="flex-1 w-full h-full p-8 pt-6 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Your Bucket
                    </h2>
                    <h3 className='text-muted-foreground text-sm font-medium'>
                        List of all your domains and links.
                    </h3>
                </div>
                <div className="flex items-center space-x-2">
                    <AddLinkDialog />
                </div>
            </div>

            <Tabs defaultValue="domains" className="w-full">
                <TabsList>
                    <TabsTrigger value="domains">Domains</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                </TabsList>
                <TabsContent value="domains">
                    <DomainTable domains={domainTableData} />
                </TabsContent>
                <TabsContent value="links">
                    <LinksTable links={linksTableData} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default UserViewPage;