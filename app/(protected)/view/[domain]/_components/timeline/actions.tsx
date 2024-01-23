"use client"
import React from 'react';
import { CalendarDateRangePicker } from '@/components/date-picker';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useSelectLink } from '@/store/selected';
import { useTimelineFilters } from '@/store/use-timeline-filters';
import { links_timing } from '@prisma/client';
interface TimelineActionsProps {

}

export const TimelineActions = ({ }: TimelineActionsProps) => {
    const { selectedLink } = useSelectLink((state) => state);
    const {
        timing,
        onTimingChange,
    } = useTimelineFilters((state) => state);
    const [selectTiming, setSelectTiming] = React.useState<links_timing>(timing);
    return (
        <div className="w-full justify-end mb-8 inline-flex gap-x-2 items-center">
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <MixerHorizontalIcon className='w-4 h-4 mr-1' /> Timing
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Timing</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={selectTiming === 'DAILY' ? true : false}
                        onCheckedChange={
                            () => {
                                setSelectTiming('DAILY');
                                onTimingChange('DAILY');
                            }
                        }
                    >
                        Day
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={
                            selectTiming === 'WEEKLY' ? true : false
                        }
                        onCheckedChange={
                            () => {
                                setSelectTiming('WEEKLY');
                                onTimingChange('WEEKLY');
                            }
                        }

                    >
                        Week
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={
                            selectTiming === 'MONTHLY' ? true : false
                        }
                        onCheckedChange={
                            () => {
                                setSelectTiming('MONTHLY');
                                onTimingChange('MONTHLY');
                            }
                        }
                    >
                        Month
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <CalendarDateRangePicker />
        </div>
    )
}