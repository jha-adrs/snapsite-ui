"use client"
import React from 'react';
import { ImageCarousel } from './image-carousel';
import { usePathname, useSearchParams } from 'next/navigation';

interface MainImagesProps {
    selectedLink: string;
}

export const MainImagesTab = ({ selectedLink }: MainImagesProps) => {
    const searchParams = useSearchParams();
    const path = usePathname();
    
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <h1 className="text-xl font-bold inline-flex items-center"> Link Info</h1>
            <div className="relative">
                {
                    selectedLink ? (
                        <ImageCarousel selectedLink={selectedLink} />
                    ) : 'Select a link to continue'
                }
            </div>

        </div>
    )
}