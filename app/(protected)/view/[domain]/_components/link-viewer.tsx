"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSelectLink } from '@/store/selected';
import { CalendarDateRangePicker } from '@/components/date-picker';
import { ImageCarousel } from './info/image-carousel';
import { HistoryIcon } from 'lucide-react';
import { TimeLineComponent } from './timeline/links-timeline-component';
import { Separator } from '@/components/ui/separator';
import { MainTimeline } from './timeline/main-timeline';
import { MainImagesTab } from './info/main-images-tab';
interface LinkViewerProps {
}

export const LinkViewer = ({ }: LinkViewerProps) => {
    return (
        <Tabs defaultValue="images">
            <div className="flex items-center px-4 py-4">
                <h1 className="text-2xl font-bold inline-flex items-center"> History</h1>
                {/* <CalendarDateRangePicker className="ml-auto" /> */}
                <TabsList className="ml-auto">

                    <TabsTrigger value='images'>Info</TabsTrigger>
                    <TabsTrigger value='timeline'>Timeline</TabsTrigger>
                </TabsList>
            </div>
            <Separator />
            <TabsContent value='timeline'>
                <MainTimeline  />
            </TabsContent>
            <TabsContent value='images'>
                <MainImagesTab />
            </TabsContent>

        </Tabs>
    )
}