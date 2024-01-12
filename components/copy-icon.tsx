"use client"
import { cn } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import React from 'react';
import { ToolTipWrapper } from './tooltip-wrapper';

interface CopyCustomIconProps {
    data: any;
    classNames?: string;
}

export const CopyCustomIcon = ({
    data,
    classNames
}: CopyCustomIconProps) => {
    return (
        <ToolTipWrapper text='Copy' delay={0}>
            <CopyIcon
                className={
                    cn(
                        "h-4 w-4 text-muted-foreground cursor-pointer",
                        classNames
                    )
                }
                onClick={() => {
                    navigator.clipboard.writeText(data);
                }} />
        </ToolTipWrapper>
    )
}