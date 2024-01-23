"use client"
import React from 'react';

interface SelectLinkProps {
    linkData?: string[];
}

export const SelectLink = ({linkData }: SelectLinkProps) => {
    return (
        <div className='flex w-full h-full  items-center justify-center'> 
            <div className='flex flex-col items-center justify-center'>
                <p className='text-2xl font-semibold text-muted-foreground'>
                    Select a link to continue
                </p>
                <p className="text-md text-muted-foreground font-medium">
                    You can select a link from the left sidebar
                </p>
            </div>
        </div>
    )
}