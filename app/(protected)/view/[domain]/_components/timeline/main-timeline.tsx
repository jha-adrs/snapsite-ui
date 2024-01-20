"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelectLink } from '@/store/selected';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2Icon, PlusCircleIcon } from 'lucide-react';
import { LinkDataType } from '@/app/api/linkdata/route';
import { TimeLineComponent } from './links-timeline-component';
import { CalendarDateRangePicker } from '@/components/date-picker';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MainTimelineProps {
    linkData: LinkDataType;
}

export const MainTimeline = ({ linkData }: MainTimelineProps) => {
    const params = useSearchParams();
    const { selectedLink } = useSelectLink((state) => state);

    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">

            <div className="w-full justify-end mb-8 inline-flex gap-x-2 items-center">
              <Button variant={"outline"}>
                <PlusCircleIcon className='w-4 h-4 mr-2'/> Timing
              </Button>
              <CalendarDateRangePicker />
            </div>
            <div className="relative">
                {
                    selectedLink ? (
                        <TimeLineComponent selectedLink={selectedLink} linkData={linkData} />
                    ) : 'Select a link to continue'
                }
            </div>

        </div>
    )
}

export const MainTimelineSkeleton = () => {
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <h1 className="text-xl font-bold inline-flex items-center"> Link Timeline </h1>
            <Skeleton className='w-15 h-4' />
            <div className="relative">
                <Loader2Icon className="animate-spin w-8 h-8 text-primary-500" />
            </div>

        </div>
    )
}