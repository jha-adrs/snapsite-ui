import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import MainNav from './_components/navbar/main-nav';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const auth = await getAuthSession();
    // TODO:Manage cookies
    if (!auth?.user) {
        return redirect("/sign-in");
    }
    else {
        return (
            <>
                <MainNav />
                {children}
                
            </>
        )
    }


}

export default Layout;