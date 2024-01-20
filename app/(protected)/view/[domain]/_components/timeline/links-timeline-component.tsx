

import { LinkDataType } from '@/app/api/linkdata/route';
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
    linkData: LinkDataType;
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

export const TimeLineComponent = ({ selectedLink, linkData }: TimeLineComponentProps) => {
    return (
        <div >
            <ScrollArea type='scroll' scrollHideDelay={100} className='flex items-center justify-center w-full h-lvh' >
                <Timeline>
                    {
                        linkData.keys.map((key, index) => {
                            //const bookmarked = linkData.linkData.bookmarks.find((bookmark) => bookmark.linkDataId === key.id) ? true : false;
                            return (
                                <TimelineItem key={index} thumbnailUrl={key.thumbnail.url} imageUrl={key.screenshot.url}>
                                    
                                    <TimeStampCard bookmarked={key.bookmarked} hashedUrl={linkData.link.hashedUrl} linkDataId={key.id} timestamp={key.createdAt} />
                                </TimelineItem>
                            )
                        })
                    }
                </Timeline>
            </ScrollArea>
        </div>
    )
}