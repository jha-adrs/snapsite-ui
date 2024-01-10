import { Home } from 'lucide-react';
import React from 'react';

interface DashboardProps {

}

const Dashboard = ({ }: DashboardProps) => {
    console.log("Dashboard");
    return (
        <div>
            <Home className='w-12 h-12 text-white' />
        </div>
    )
}

export default Dashboard;