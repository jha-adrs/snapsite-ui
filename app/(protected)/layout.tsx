import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import MainNav from './_components/navbar/main-nav';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
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