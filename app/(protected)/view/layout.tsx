import React from 'react';
import { SortButton } from './_components/sort-button';
import { AddLinkDialog } from '../dashboard/_components/add-link-dialog';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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

            {children}
        </div>
    )
}

export default Layout;