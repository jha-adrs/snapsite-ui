import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import React from 'react';
import { AddLinkDialog } from './_components/add-link-dialog';
import { DashboardCards } from './_components/dashboard-cards';
import { getUserLinks } from '@/lib/links';
import { getUserCountData } from '@/lib/user';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
    const links = await getUserLinks();
    const countData = await getUserCountData();
    return (
        <div className="flex-1 w-full h-full p-8 pt-6 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h2>
                <div className="flex items-center space-x-2">
                    <AddLinkDialog />
                </div>
            </div>
            <DashboardCards data={links} countData={countData} />
            {children}
        </div>
    )
}

export default DashboardLayout;