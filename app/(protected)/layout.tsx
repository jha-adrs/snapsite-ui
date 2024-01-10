import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const auth = await getAuthSession();
    if (!auth?.user) {
        return redirect("/sign-in");
    }
    else {
        return (
            <>
                {children}
            </>
        )
    }


}

export default Layout;