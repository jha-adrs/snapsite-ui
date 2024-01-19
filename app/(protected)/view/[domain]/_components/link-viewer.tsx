"use client"
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useSelectLink } from '@/store/selected';
import { CalendarDateRangePicker } from '@/components/date-picker';
import { ImageCarousel } from './image-carousel';
import { HistoryIcon } from 'lucide-react';
import { TimeLineComponent } from './links-timeline-component';
interface LinkViewerProps {
}

export const LinkViewer = ({ }: LinkViewerProps) => {
    const { selectedDomain, selectedLink } = useSelectLink((state) => state);
    return (
        <Tabs defaultValue="timeline">
            <div className="flex items-center px-4 py-4">
                <h1 className="text-xl font-bold inline-flex items-center"><HistoryIcon className='w-6 h-6 mx-1' /> History</h1>
                {/* <CalendarDateRangePicker className="ml-auto" /> */}
                <TabsList className="ml-auto">
                    <TabsTrigger value='timeline'>Timeline</TabsTrigger>
                    <TabsTrigger value='images'>Images</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value='timeline'>
                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">

                    <div className="relative">
                        {
                            selectedLink ? (

                                <TimeLineComponent selectedLink={selectedLink} />
                            ) : 'Select a link to continue'
                        }
                    </div>

                </div>
            </TabsContent>
            <TabsContent value='images'>
                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">

                    <div className="relative">
                        {
                            selectedLink ? (
                                <ImageCarousel selectedLink={selectedLink} />
                            ) : 'Select a link to continue'
                        }
                    </div>

                </div>
            </TabsContent>

        </Tabs>
    )
}