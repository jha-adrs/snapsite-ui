import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DomainTable } from './_components/domain-table';
import { LinksTable } from './_components/links-table';
import { getUserDomains, getUserLinks } from '@/lib/links';
import { duration } from '@/lib/utils';
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
    )
}

export default UserViewPage;