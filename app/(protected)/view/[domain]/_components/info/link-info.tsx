"use client"
import { LinkDataType } from '@/app/api/linkdata/route';
import React from 'react';
import {
    CalendarIcon,
    CountdownTimerIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { LinkIcon,TimerIcon } from 'lucide-react';
import { LinkHeatmap } from './heatmap';
import { useMutation } from '@tanstack/react-query';
import { LinkInfoType, getLinkInfo } from '@/actions/get-link-info';
import { toast } from 'sonner';
import { duration } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Actions } from './actions';
interface LinkInfoProps {
    linkData: LinkDataType["link"];
}

export const LinkInfo = ({ linkData }: LinkInfoProps) => {
    const [linkInfo, setLinkInfo] = React.useState<LinkInfoType | null>(null);

    const { mutate: fetchLinkInfo, isPending } = useMutation({
        mutationFn: async () => {
            const data = await getLinkInfo(linkData.hashedUrl);
            setLinkInfo(data);
        },
        onError: () => {
            toast.error('Could not fetch link info');
        },
        onSuccess: () => {
        },
    });
    React.useEffect(() => {
        fetchLinkInfo();
    }, [linkData.hashedUrl, fetchLinkInfo])
    return (
        <>
            {
                (isPending || !linkInfo) ? <LinkInfoSkeleton /> : (
                    <div className="bg-background/95 p-2 ">
                        <div className="relative grid grid-cols-1 md:grid-cols-2">

                            <Card>
                                <CardHeader className="flex  items-start space-y-2">
                                    <CardTitle>{linkInfo.assignedName}</CardTitle>
                                    <CardDescription>
                                        <p className='inline-flex items-center gap-x-2'>
                                            <LinkIcon className='w-4 h-4' /> {linkData.url}
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='gap-y-2'>
                                    <div className='flex items-center justify-center sm:justify-start'>


                                        <div className="flex space-x-4 text-sm font-semibold">
                                            <div className="flex items-center">
                                                <CalendarIcon className="mr-1 h-4 w-4 " />
                                                {linkData.timing}
                                            </div>
                                            <div className="flex items-center">
                                                <TimerIcon className="mr-1 h-4 w-4" />
                                                {linkInfo.scrapeCount} snaps
                                            </div>
                                            <div className='flex items-center'>
                                                <CountdownTimerIcon className="mr-1 h-4 w-4" />
                                                {duration(linkInfo.createdAt)} ago
                                            </div>
                                        </div>
                                    </div>
                                    <Actions linkData={linkData} linkInfo={linkInfo} />

                                </CardContent>
                            </Card>
                            <LinkHeatmap />
                        </div>

                    </div>
                )
            }
        </>
    )
}

export const LinkInfoSkeleton = () => {
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative grid grid-cols-1 md:grid-cols-2">

                <Card>
                    <CardHeader className="flex  items-start space-y-2">
                        <CardTitle>
                            <Skeleton className='w-24 h-4' />
                        </CardTitle>
                        <CardDescription>
                            <p className='inline-flex items-center gap-x-2'>
                                <Skeleton className='w-48 h-4' />
                            </p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='gap-y-2'>
                        <div>


                            <div className="flex space-x-4 text-sm font-semibold">
                                <div className="flex items-center">
                                    <Skeleton className='w-16 h-4' />
                                </div>
                                <div className="flex items-center">
                                    <Skeleton className='w-16 h-4' />
                                </div>
                                <div className='flex items-center'>
                                    <Skeleton className='w-16 h-4' />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-fit items-center space-x-2 rounded-md text-secondary-foreground mt-4">
                            <Skeleton className='w-24 h-8' />
                            <Skeleton className='w-8 h-8' />
                        </div>
                    </CardContent>
                </Card>
                {/* <LinkHeatmap /> */}
            </div>

        </div>

    )
}