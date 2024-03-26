
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LucideIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, ArrowUpRight, BanknoteIcon, CogIcon, Home, HomeIcon, InfoIcon, NewspaperIcon, User } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { ModeToggle2 } from '@/components/mode-toggle2';



interface MenuDrawerProps {
    auth: boolean;
    redirectURL: string;
    navItems: { name: string, url: string, icon: LucideIcon, disabled: boolean }[];
}

export const MenuDrawer = ({ navItems, auth, redirectURL }: MenuDrawerProps) => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={"ghost"} size={"icon"} className='flex md:hidden text-muted-foreground hover:text-foreground transition-colors'>
                    <MenuIcon className="w-6 h-6 " />
                </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"} >
                <SheetTitle>
                    Home Navigation
                </SheetTitle>
                <SheetDescription>
                    Select a page to navigate to
                </SheetDescription>
                <div className='flex flex-col gap-y-4 py-4'>
                    {
                        navItems.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link href={item.url}>
                                        <Button variant={"ghost"} size={"default"} className="w-full text-left gap-x-2 justify-start">
                                            <item.icon className="h-4 w-4 text-neutral-500 dark:text-white" /> {item.name}
                                        </Button>
                                    </Link>
                                </div>
                            )
                        }
                        )}
                        <ModeToggle2/>
                </div>
                <Separator className='my-2 mb-6'/>
                <div className='space-y-4 flex flex-col '>
                    <Link href={redirectURL} className={cn(
                        buttonVariants({ size: "sm", variant: "outline" })
                    )}>
                        {
                            (auth) ? "Dashboard" : "Login"
                        }
                    </Link>
                    <Link href={"/sign-up"} className={cn(
                        buttonVariants({ size: "sm", variant: "default" })
                    )}>
                        Get Started &rarr;
                    </Link>
                </div>
                
            </SheetContent>

        </Sheet>
    )
}