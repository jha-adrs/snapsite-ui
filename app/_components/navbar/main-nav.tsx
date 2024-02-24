import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Logo from './logo';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface MainNavProps {
    auth: boolean;
    redirectURL: string;
}

const navItems = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'About',
        url: '/about'
    },
    {
        name: 'Contact',
        url: '/contact'
    }
];

const MainNav = ({ auth, redirectURL }: MainNavProps) => {
    return (
        <nav className='absolute flex flex-row top-0 w-full h-12 items-center p-4 px-8 md:px-12 lg:px-16 justify-center'>
            <ul className="flex mt-2 w-full items-center space-x-8 justify-between">
                <Logo className="" />
                <div className='flex flex-row gap-x-4 transition-all'>
                    {
                        navItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link href={item.url}>
                                        <p className="text-lg font-semibold hover:text-primary">
                                            {item.name}
                                        </p>
                                    </Link>
                                </li>
                            )
                        }
                        )}
                </div>

                <li className='space-x-2'>
                    <Link href={"/"} className={cn(
                        buttonVariants({ size: "sm", variant: "outline" })
                    )}>
                        Try Now <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href={redirectURL} className={cn(
                        buttonVariants({ size: "sm", variant: "default" })
                    )}>
                        {
                            (auth) ? "Dashboard" : "Sign In"
                        }
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default MainNav;