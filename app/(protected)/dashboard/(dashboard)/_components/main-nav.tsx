
import React from 'react';
import { Search } from './search';
import { UserNav } from './user-nav';
import Logo from './logo';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { cn } from '@/lib/utils';


interface DashboardProps {

}

const MainNav = ({ }: DashboardProps) => {

    return (
        <div className="flex flex-row border-b">

            <div className="flex h-16 items-center px-4">
                <Logo className="" />
            </div>


            <nav
                className={cn("flex items-center space-x-4 lg:space-x-6")}

            >
                <Link
                    href="/examples/dashboard"
                    className="text-sm font-medium transition-colors hover:text-primary"
                >
                    Overview
                </Link>
                <Link
                    href="/examples/dashboard"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Customers
                </Link>
                <Link
                    href="/examples/dashboard"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Products
                </Link>
                <Link
                    href="/examples/dashboard"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Settings
                </Link>
            </nav>

            <div className="ml-auto mr-2 flex items-center space-x-4">
                <Search />
                <UserNav />
                <ModeToggle />
            </div>
        </div>
    )
}

export default MainNav;