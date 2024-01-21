"use client"
import React from 'react';
import { ImageCarousel } from './image-carousel';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSelectLink } from '@/store/selected';
import { LinkInfo } from './link-info';
import { LinkDataType } from '@/app/api/linkdata/route';
import { LinkHeatmap } from './heatmap';

interface MainImagesTabProps {
    linkData: LinkDataType;
}

export const MainImagesTab = ({ linkData }: MainImagesTabProps) => {
    const searchParams = useSearchParams();
    const path = usePathname();
    const { selectedLink } = useSelectLink((state) => state);
    return (
        <>
            {
                selectedLink ? (
                    <div className='item-center'>
                        <LinkInfo linkData={linkData.link} />
                        <LinkHeatmap />

                        <ImageCarousel linkData={linkData} selectedLink={selectedLink} />
                    </div>
                ) : 'Select a link to continue'
            }
        </>
    )
}