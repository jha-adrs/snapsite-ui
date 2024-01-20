"use client"
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

interface TootipWrapperProps {
    children: React.ReactNode;
    text: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    delay?: number;
    color?: string;
    bgColor?: string;
}

export const ToolTipWrapper = ({
    children,
    text,
    side = "top",
    align = "center",
    delay,
    color,
    bgColor,
 }: TootipWrapperProps) => {
    return (
        <Tooltip delayDuration={delay}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}

            >
                {text}
            </TooltipContent>
        </Tooltip>
    )
}