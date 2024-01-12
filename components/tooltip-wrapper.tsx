"use client"
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface TootipWrapperProps {
    children: React.ReactNode;
    text: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    delay?: number;
}

export const ToolTipWrapper = ({
    children,
    text,
    side = "top",
    align = "center",
    delay
 }: TootipWrapperProps) => {
    return (
        <Tooltip delayDuration={delay}>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                {text}
            </TooltipContent>
        </Tooltip>
    )
}