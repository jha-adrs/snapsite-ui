import React, { useEffect, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BookmarkFilledIcon, BookmarkIcon, CameraIcon, DownloadIcon } from '@radix-ui/react-icons';
import { duration } from '@/lib/utils';
import { Button } from './ui/button';
import { ToolTipWrapper } from './tooltip-wrapper';
import { addBookmark } from '@/actions/add-bookmark';
import { toast } from 'sonner';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface TimeStampCardProps {
    timestamp: Date;
    hashedUrl: string;
    linkDataId: number;
    bookmarked: boolean;
    imageUrl?: string;
}

const TimeStampCard = ({ timestamp, linkDataId, hashedUrl, bookmarked, imageUrl }: TimeStampCardProps) => {
    const [isPending, startTransition] = useTransition();
    const [isBookmarked, setIsBookmarked] = React.useState<boolean>(bookmarked);
    // Using optimistic updates
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();
    const timeDiff = duration(date);

    const handleBookmark = async () => {
        startTransition(() => {
            addBookmark(hashedUrl, linkDataId).then((res) => {
                setIsBookmarked(
                    res.operationPerformed === 'added' ? true : false || res.operationPerformed === 'removed' ? false : true || 'error'
                );
                if (res.success) {
                    toast.success(res.message || 'Bookmark added');
                } else {
                    toast.error('Error adding bookmark');
                    setIsBookmarked(bookmarked);
                }
            }).catch((err) => {
                toast.error('Error adding bookmark');
                console.log(err);
                setIsBookmarked(bookmarked);
            });
        })
    }

    useEffect(() => {
        setIsBookmarked(bookmarked);
    }, [bookmarked])

    return (
        <Card className='w-full max-w-[400px] my-2 h-36 sm:h-24 mr-4'>
            <CardHeader>
                <CardTitle className='flex flex-col sm:flex-row w-full gap-y-2 justify-between'>

                    <div className='inline-flex gap-x-2 items-center'>
                        <CameraIcon className='w-6 h-6' />
                        {dateString}
                    </div>
                    <div className=''>
                        <ToolTipWrapper delay={700} text='Save snap' side='top' align='center'>
                            <Button variant='secondary' size='sm' onClick={handleBookmark}>
                                {isBookmarked ? <BookmarkFilledIcon className='w-4 h-4 mr-1' /> : <BookmarkIcon className='w-4 h-4 mr-1' />} Save
                            </Button>
                        </ToolTipWrapper>
                        <ToolTipWrapper delay={700} text='Download Image'>
                            <Button className='mx-1' variant={"secondary"} size={"sm"} disabled={!imageUrl}
                                onClick={
                                    //Download Image
                                    () => imageUrl ? redirect(imageUrl) : (
                                        toast.error('No image found')
                                    )
                                }
                            >
                                <Link href={imageUrl || ""} target='_blank'>
                                    <DownloadIcon className='w-4 h-4' />
                                </Link>
                            </Button>
                        </ToolTipWrapper>
                    </div>
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