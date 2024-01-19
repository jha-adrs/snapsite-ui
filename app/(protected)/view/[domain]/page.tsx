import { getUserDomainLinks, getUserDomains, getUserLinks } from '@/lib/links';
import React from 'react';
import { DomainPage } from './_components/domain-page';

interface DomainPageProps {
    params: {
        domain: string;
    }
}

const MainDomainPage =async ({params}: DomainPageProps) => {
    const domains = await getUserDomains();
    let currentDomainId;
    const domainData = domains.map((domain) => {
        if(domain.domains.domain === params.domain){
            currentDomainId = domain.domains.id;
        }
        return {
            label: domain.domains.domain,
            id: domain.domains.id,
            createdAt: domain.createdAt,
            icon: `https://logo.clearbit.com/${domain.domains.domain}`
        }
    });
    const links = await getUserDomainLinks({domainId: currentDomainId});
    return (
        <>
            <DomainPage domains={domainData} currentDomain={params.domain} links={links}/>
        </>
    )
}

export default MainDomainPage;