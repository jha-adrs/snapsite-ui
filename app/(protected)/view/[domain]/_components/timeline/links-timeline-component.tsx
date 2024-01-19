

import { Timeline, TimelineItem } from '@/components/timeline';
import TimeStampCard from '@/components/timestamp-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon, CameraIcon } from '@radix-ui/react-icons';
import { ArrowUpRightIcon, ArrowUpRightSquareIcon, Link2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface TimeLineComponentProps {
    selectedLink: string;
}

export const IndividualImageComponent = ({ imageLink }: { imageLink: string }) => {
    return (
        <Card className='w-128 h-64'>
            <CardHeader>
            </CardHeader>
            <CardContent>
                <Image src={imageLink} width={500} alt='Image' height={500} />
            </CardContent>
        </Card>
    )
}

export const TimeLineComponent = ({ selectedLink }: TimeLineComponentProps) => {
    const imageDemo = "https://snapsite-domains.s3.ap-south-1.amazonaws.com/DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95-small.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6DLDFCXX73MIKIMS%2F20240118%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240118T164845Z&X-Amz-Expires=86400&X-Amz-Signature=1c4bb83891955bfa288febab03132e906fb2b828eeeb643d4988044fa42e37f9&X-Amz-SignedHeaders=host&x-id=GetObject";
    return (
        <div >
            <ScrollArea type='scroll' scrollHideDelay={100} className='flex items-center justify-center w-full h-[80vh]' >
                <Timeline>
                    <TimelineItem imageUrl={imageDemo} thumbnailUrl={imageDemo}>
                        <TimeStampCard timestamp={new Date()}/>
                    </TimelineItem>
                    <TimelineItem imageUrl={imageDemo} thumbnailUrl={imageDemo}>
                        <TimeStampCard timestamp={new Date()}/>
                    </TimelineItem>
                </Timeline>
            </ScrollArea>
        </div>
    )
}