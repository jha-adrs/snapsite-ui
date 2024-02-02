"use client";
import { config } from '@/config/config';
import { constants } from '@/config/constants';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts';
interface HeadLineProps {

}

export const HeadLine = ({ }: HeadLineProps) => {
    const size = useWindowSize();
    useEffect(() => {

    }, [size]);
    return (
        <div>
            <Image
                src={constants.IMAGE_URLS.AUTH}
                alt="Authentication Image"
                width={size.width}
                height={size.height}
            />
        </div>
    )
}

