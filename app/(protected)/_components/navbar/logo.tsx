import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface LogoProps {
    className?: string;
    iconClassName?: string;
    bgClassName?: string;
}

const Logo = ({ className, iconClassName, bgClassName }: LogoProps) => {
    return (
        <Link href={"/"} className={cn(
            "flex flex-row items-center w-auto h-14 space-x-2",
        )}>
            <div className={cn(
                "rounded-full flex bg-accent w-12 h-12 items-center justify-center",
                bgClassName,
                className,
            )}>
                <Icons.logo className={cn(
                    "w-10 h-10",
                    iconClassName,
                )} />

            </div>
            {/* <div className="hidden lg:flex flex-col">
                <h2 className='  text-xl font-semibold'>
                    Snap Site
                </h2>
                <p className='text-xs font-light text-muted-foreground'>
                    Your websites in a snap
                </p>
            </div> */}
        </Link>
    )
}

export default Logo;