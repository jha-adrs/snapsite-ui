import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BookmarkFilledIcon, BookmarkIcon, CameraIcon } from '@radix-ui/react-icons';
import { duration } from '@/lib/utils';
import { Button } from './ui/button';
import { ToolTipWrapper } from './tooltip-wrapper';

interface TimeStampCardProps {
    timestamp: Date;
}

const TimeStampCard = ({ timestamp }: TimeStampCardProps) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();
    const timeDiff = duration(date);
    const bookmarked = true;
    return (
        <Card className='w-full max-w-[400px] my-2 h-36 sm:h-24 mr-4'>
            <CardHeader>
                <CardTitle className='flex flex-col sm:flex-row w-full gap-y-2 justify-between'>

                    <div className='inline-flex gap-x-2 items-center'>
                        <CameraIcon className='w-6 h-6' />
                        {dateString}
                    </div>
                    <ToolTipWrapper delay={700} text='Save snap' side='top' align='center'>
                        <Button variant='secondary' size='sm'>
                            {bookmarked ? <BookmarkFilledIcon className='w-4 h-4 mr-1' /> : <BookmarkIcon className='w-4 h-4 mr-1' />} Save
                        </Button>
                    </ToolTipWrapper>
                </CardTitle>
                <CardDescription className='relative inline-flex justify-between items-center'>
                    <p className="text-muted-foreground">
                        {time}
                    </p>
                    <p>
                        {timeDiff} ago
                    </p>
                </CardDescription>

            </CardHeader>
        </Card>
    )
}

export default TimeStampCard;