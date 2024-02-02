"use client"
import { LinkDataType } from '@/app/api/linkdata/route';
import React from 'react';
import {
    CalendarIcon,
    CountdownTimerIcon,
    DotsVerticalIcon,
} from "@radix-ui/react-icons"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { BanknoteIcon, CurrencyIcon, LinkIcon, Pencil, Settings2, TimerIcon } from 'lucide-react';
import { LinkHeatmap } from './heatmap';
import { useMutation } from '@tanstack/react-query';
import { LinkInfoType, getLinkInfo } from '@/actions/get-link-info';
import { toast } from 'sonner';
import { duration } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Actions } from './actions';
import { Button } from '@/components/ui/button';
import { EditLinkDialog } from '../edit-link';
import { LinkSettingsDialog } from './link-settings-dialog';
import { capitalize, slice } from 'lodash';
import { Switch } from '@/components/ui/switch';
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
            { // Add full width cards, about timing, latest ss preview, 
                (isPending || !linkInfo) ? (
                    <div className="bg-background/95 p-2 ">
                        <div className="grid grid-cols-1 md:grid-cols-2  w-full items-center md:items-start gap-2">

                            <LinkInfoSkeleton />
                            <PriceTrackerInfoSkeleton />
                        </div>

                    </div>
                ) : (
                    <div className="bg-background/95 p-2 ">
                        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center md:items-start gap-2">

                            <LinkInfoCard linkInfo={linkInfo} linkData={linkData} />
                            <PriceTrackerInfoCard priceTrackerStatus={"NOT_SUPPORTED"} />
                        </div>

                    </div>
                )
            }
        </>
    )
}

interface LinkInfoCardProps {
    linkInfo: LinkInfoType;
    linkData: LinkDataType["link"];

}
const LinkInfoCard = ({ linkInfo, linkData }: LinkInfoCardProps) => {
    return (

        <Card className='bg-card/50'>
            <CardHeader className="flex  items-start space-y-2">
                <CardTitle className='flex w-full justify-between'>
                    {/* <p className='font-semibold text-muted-foreground text-sm'>Name</p> */}
                    <p className='font-semibold text-lg'>{linkInfo.assignedName}</p>

                    <div className='space-x-2'>

                        <EditLinkDialog>
                            <Button variant={"outline"} size={"sm"}>
                                <Pencil className='w-4 h-4 mr-1' /> Edit

                            </Button>
                        </EditLinkDialog>

                        <LinkSettingsDialog />
                        
                        <Button variant={"outline"} size={"icon"}>
                            <DotsVerticalIcon className='w-4 h-4' />
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    <p className='inline-flex items-center gap-x-2'>
                        <LinkIcon className='w-4 h-4 cursor-pointer' onClick={() => {
                            navigator.clipboard.writeText(linkData.url);
                            toast.success('Link copied to clipboard')
                        }} /> {slice(linkData.url, 0, 50)}
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent className='gap-y-2'>
                <div className='flex items-center justify-center sm:justify-start'>


                    <div className="flex space-x-4 text-sm font-semibold">

                        <div className="flex items-center gap-x-1">
                            <p className='text-muted-foreground'>Frequency:
                            </p>
                            <p>
                                {capitalize(linkData.timing)}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <p className='text-muted-foreground'>Snaps taken:
                            </p>
                            <p>
                                {linkInfo.scrapeCount}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <p className='text-muted-foreground'>Added:
                            </p>
                            <p>
                                {duration(linkInfo.createdAt)} ago
                            </p>
                        </div>
                    </div>
                </div>
                {/* <Actions linkData={linkData} linkInfo={linkInfo} /> */}

            </CardContent>
        </Card>
    )
}

interface PriceTrackerInfoCardProps {
    priceTrackerStatus:  "NOT_SUPPORTED" | "ENABLED" | "DISABLED";
}
const PriceTrackerInfoCard = ({ priceTrackerStatus }: PriceTrackerInfoCardProps) => {
    return (
        <Card className='bg-card/50'>
            <CardHeader className="flex  items-start space-y-2">
                <CardTitle className='flex w-full justify-between'>
                    <p className='font-semibold text-lg'>
                        Price Tracker
                    </p>

                    <div className='flex items-center space-x-2'>
                        <Button variant={
                            priceTrackerStatus ? "outline" : "secondary"
                        } size={"sm"}
                        disabled={priceTrackerStatus === "NOT_SUPPORTED"}
                        >
                            {
                                priceTrackerStatus === "NOT_SUPPORTED" ? "Not Supported" : priceTrackerStatus === "ENABLED" ? "Enabled" : "Disabled"
                            }
                        </Button>
                        <Button variant={"outline"} size={"icon"}>
                            <DotsVerticalIcon className='w-3 h-3' />
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    <p className='inline-flex items-center gap-x-2'>
                        <BanknoteIcon className='w-4 h-4' /> United States Dollar (USD)
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent className='gap-y-2'>
                <div className='flex items-center justify-center sm:justify-start'>


                    <div className="flex space-x-4 text-sm font-semibold">
                        <div className="flex items-center gap-x-1">
                            <p className='text-muted-foreground'>Latest Price:
                            </p>
                            <p>
                                $100
                            </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <p className='text-muted-foreground'>Avg. Price:
                            </p>
                            <p>
                                $105.52
                            </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <p className='text-muted-foreground'>Max. Price:
                            </p>
                            <p>
                                $122
                            </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <p className='text-muted-foreground'>Min. Price:
                            </p>
                            <p>
                                $99.6
                            </p>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

const LinkInfoSkeleton = () => {
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">


            <Card>
                <CardHeader className="flex  items-start space-y-2">
                    <CardTitle>
                        <p className='font-semibold text-lg'>
                            <Skeleton className='w-24 h-4' /></p>
                    </CardTitle>
                    <CardDescription>
                        <p className='inline-flex items-center gap-x-2'>
                            <Skeleton className='w-48 h-4' />
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent className='gap-y-2'>
                    <div className='flex items-center justify-center sm:justify-start'>


                        <div className="flex space-x-4 text-sm font-semibold">
                            <div className="flex items-center">
                                <Skeleton className=" h-4 w-12 " />
                            </div>
                            <div className="flex items-center">
                                <Skeleton className=" h-4 w-12 " />
                            </div>
                            <div className='flex items-center'>
                                <Skeleton className=" h-4 w-12 " />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center sm:justify-end mt-4 gap-x-2'>
                        <Skeleton className='w-6 h-6' />

                        <div className=""><Skeleton className=" h-6 w-12" />
                        </div>

                        <Skeleton className='w-6 h-6' />
                        <Skeleton className='w-6 h-6' />
                    </div>

                </CardContent>
            </Card>
            {/* <LinkHeatmap /> */}
        </div>

    )
}

const PriceTrackerInfoSkeleton = () => {
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">


            <Card>
                <CardHeader className="flex  items-start space-y-2">
                    <CardTitle>
                        <div className='items-center inline-flex gap-x-2'>
                            <p className='font-semibold text-muted-foreground text-sm'>
                                <Skeleton className='w-12 h-4' />
                            </p>
                            <p className='font-semibold text-lg'>
                                <Skeleton className='w-24 h-4' /></p>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        <p className='inline-flex items-center gap-x-2'>
                            <Skeleton className='w-48 h-4' />
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent className='gap-y-2'>
                    <div className='flex items-center justify-center sm:justify-start'>


                        <div className="flex space-x-4 text-sm font-semibold">
                            <div className="flex items-center">
                                <Skeleton className=" h-4 w-12 " />
                            </div>
                            <div className="flex items-center">
                                <Skeleton className=" h-4 w-12 " />
                            </div>
                            <div className='flex items-center'>
                                <Skeleton className=" h-4 w-12 " />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center sm:justify-end mt-4 gap-x-2'>
                        <Skeleton className='w-6 h-6' />

                        <div className=""><Skeleton className=" h-6 w-12" />
                        </div>

                        <Skeleton className='w-6 h-6' />
                        <Skeleton className='w-6 h-6' />
                    </div>

                </CardContent>
            </Card>
            {/* <LinkHeatmap /> */}

        </div>

    )
}
