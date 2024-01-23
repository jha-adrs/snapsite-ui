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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useTimelineFilters } from '@/store/use-timeline-filters';
import { links_timing } from '@prisma/client';
import { SelectLink } from '@/components/select-link';
import { TimelineActions } from './actions';

interface MainTimelineProps {
    linkData: LinkDataType;
}

export const MainTimeline = ({ linkData }: MainTimelineProps) => {
    const params = useSearchParams();
    const { selectedLink } = useSelectLink((state) => state);
    const {
        timing,
        onTimingChange,
    } = useTimelineFilters((state) => state);
    const [selectTiming, setSelectTiming] = React.useState<links_timing>(timing);
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            
            <TimelineActions/>
            <div className="relative">
                {
                    selectedLink ? (
                        <TimeLineComponent selectedLink={selectedLink} linkData={linkData} />
                    ) : <SelectLink/>
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