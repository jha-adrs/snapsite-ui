import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { BookImageIcon } from 'lucide-react';
import React from 'react';

interface LogoProps {
    className?: string;
    iconClassName?: string;
    bgClassName?: string;
}

const Logo = ({ className, iconClassName, bgClassName }: LogoProps) => {
    return (
        <div className={cn(
            "rounded-full flex bg-accent w-20 h-20 items-center justify-center",
            bgClassName,
            className,
        )}>
            <Icons.logo className={cn(
                "w-16 h-16",
                iconClassName,
            )} />
        </div>
    )
}

export default Logo;