import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Logo from './logo';
import { ArrowRight, ArrowUpRight, BanknoteIcon, CogIcon, Home, HomeIcon, InfoIcon, LucideIcon, MenuIcon, NewspaperIcon, User } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { MenuDrawer } from './drawer';
import { navItems } from '@/lib/constants';
interface MainNavProps {
    auth: boolean;
    redirectURL: string;
    navItems?: { name: string, url: string, icon: LucideIcon, disabled: boolean }[];
}


const MainNav = ({ auth, redirectURL }: MainNavProps) => {
    return (
        <nav className='relative flex flex-row top-0 w-full h-fit items-center py-2 px-8 md:px-12 lg:px-16 justify-center z-[100]'>
            
            <ul className="flex w-full items-center space-x-8 justify-between">

                <Logo className="" />
                <li className='hidden md:flex flex-row gap-x-4'>
                    {
                        navItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link href={item.url} className='hover:text-primary'>
                                        <p className=" font-medium">
                                            {item.name}
                                        </p>
                                    </Link>
                                </li>
                            )
                        }
                        )}
                </li>

                <li className='hidden md:flex space-x-2 items-center'>
                    <Link href={redirectURL} className={cn(
                        buttonVariants({ size: "sm", variant: "ghost" })
                    )}>
                        {
                            (auth) ? "Dashboard" : "Login"
                        }
                    </Link>
                    <Link href={"/sign-up"} className={cn(
                        buttonVariants({ size: "sm", variant: "shimmer" })
                    )}>
                        Get Started &rarr;
                    </Link>

                    <ModeToggle />
                </li>

            </ul>
            <MenuDrawer navItems={navItems} auth={auth} redirectURL={redirectURL}/>
        </nav>
    )
}

export default MainNav;