"use client"
import React from 'react';
import { ImageCarousel } from './image-carousel';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSelectLink } from '@/store/selected';
import { LinkInfo } from './link-info';
import { LinkDataType } from '@/app/api/linkdata/route';
import { LinkHeatmap } from './heatmap';

interface MainInfoTabProps {
    linkData: LinkDataType;
}

export const MainInfoTab = ({ linkData }: MainInfoTabProps) => {
    const searchParams = useSearchParams();
    const path = usePathname();
    const { selectedLink } = useSelectLink((state) => state);
    return (
        <>
            {
                selectedLink ? (
                    <div className='items-center'>
                        <LinkInfo linkData={linkData.link} />
                        
                        {/* <LinkHeatmap /> */}
                        {/* <ImageCarousel linkData={linkData} selectedLink={selectedLink} /> */}
                    </div>
                ) : 'Select a link to continue'
            }
        </>
    )
}