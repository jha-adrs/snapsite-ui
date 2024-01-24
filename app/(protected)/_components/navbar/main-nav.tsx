import React from 'react';
import { UserNav } from './user-nav';
import Logo from './logo';
import { ModeToggle } from '@/components/mode-toggle'; import { NavItems } from './nav-items';
import { NotificationTab } from './notification-tab';
import { BookmarksTab } from './bookmarks';
import { getNotifications } from '@/lib/notification';


interface DashboardProps {

}

const MainNav = async ({ }: DashboardProps) => {
    // TODO: Add support for mobile view
    const notifs = await getNotifications();
    return (
        <div className="flex flex-row w-full border-b h-16 justify-between">

            <div className="hidden lg:flex  items-center px-4">
                <Logo />
            </div>

            <NavItems />

            <div className="ml-auto mr-2 flex items-center space-x-4">
                <NotificationTab notifications={notifs} />
                <UserNav />
                <ModeToggle />
            </div>
        </div>
    )
}

export default MainNav;