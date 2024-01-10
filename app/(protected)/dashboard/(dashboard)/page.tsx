import { Home } from 'lucide-react';
import React from 'react';
import { Search } from './_components/search';
import { UserNav } from './_components/user-nav';
import MainNav from './_components/main-nav';

interface DashboardProps {

}

const Dashboard = ({ }: DashboardProps) => {

    return (
        <div className="flex flex-col">
            <MainNav />
        </div>
    )
}

export default Dashboard;