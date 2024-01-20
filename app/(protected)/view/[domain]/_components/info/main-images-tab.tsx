"use client"
import React from 'react';
import { ImageCarousel } from './image-carousel';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSelectLink } from '@/store/selected';


export const MainImagesTab = () => {
    const searchParams = useSearchParams();
    const path = usePathname();
    const { selectedLink } = useSelectLink((state) => state);
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <h1 className="text-xl font-bold inline-flex items-center"> Link Info</h1>
            <div className="relative">
                {
                    selectedLink ? (
                        selectedLink
                        // <ImageCarousel selectedLink={selectedLink} />
                    ) : 'Select a link to continue'
                }
            </div>

        </div>
    )
}