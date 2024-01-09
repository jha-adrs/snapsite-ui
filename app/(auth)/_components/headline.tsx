"use client";
import { config } from '@/config/config';
import { constants } from '@/config/constants';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts';
interface HeadLineProps {

}

const HeadLine = ({ }: HeadLineProps) => {
    const { width, height } = useWindowSize();
    useEffect(() => {

    }, [width, height]);
    return (
        <div>
            <Image
                src={constants.IMAGE_URLS.AUTH}
                alt="Authentication Image"
                width={width}
                height={height}
            />
        </div>
    )
}

export default HeadLine;