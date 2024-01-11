
import React from 'react';
import { Search } from './search';
import { UserNav } from './user-nav';
import Logo from './logo';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AreaChartIcon, HistoryIcon, HomeIcon, LibraryBigIcon, SettingsIcon } from 'lucide-react';
import { NavItems } from './nav-items';
import { NotificationTab } from './notification-tab';


interface DashboardProps {

}

const MainNav = ({ }: DashboardProps) => {
    // TODO: Add support for mobile view
    return (
        <div className="flex flex-row w-full border-b h-16">

            <div className="hidden lg:flex  items-center px-4">
                <Logo/>
            </div>
            
            <NavItems/>

            <div className="ml-auto mr-2 flex items-center space-x-4">
                <Search />
                <NotificationTab />
                <UserNav />
                <ModeToggle />
            </div>
        </div>
    )
}

export default MainNav;