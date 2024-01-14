"use client"
import { cn } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import React from 'react';
import { ToolTipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';
import { CheckIcon } from '@radix-ui/react-icons';

interface CopyCustomIconProps {
    data: any;
    classNames?: string;
    hideToolTip?: boolean;
}

export const CopyCustomIcon = ({
    data,
    classNames,
    hideToolTip
}: CopyCustomIconProps) => {
    const [isCopied, setIsCopied] = React.useState(false);
    return (
        <ToolTipWrapper text='Copy' delay={
            hideToolTip ? 50000: 0
        }>
            <Button variant={"ghost"} size={"icon"} disabled={isCopied}>
            <CopyIcon
                className={
                    cn(
                        "h-4 w-4 text-muted-foreground",
                        classNames,
                        isCopied ? "hidden" : ""
                    )
                }
                onClick={() => {
                    navigator.clipboard.writeText(data);
                    setIsCopied(true);
                    setTimeout(() => {
                        setIsCopied(false);
                    }, 2000);
                }} />
                <CheckIcon className={cn("h-6 w-6 text-green-500", isCopied ? "" : "hidden")} />

            </Button>
        </ToolTipWrapper>
    )
}