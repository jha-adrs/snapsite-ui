"use client"
import React from 'react';
import { ImageCarousel } from './image-carousel';

interface MainImagesProps {
    selectedLink: string;
}

export const MainImagesTab = ({ selectedLink }: MainImagesProps) => {
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">

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