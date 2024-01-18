"use client"
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useSelectLink } from '@/store/selected';
import { CalendarDateRangePicker } from '@/components/date-picker';
import { ImageCarousel } from './image-carousel';
interface LinkViewerProps {
}

export const LinkViewer = ({ }: LinkViewerProps) => {
    const {selectedDomain,selectedLink} = useSelectLink((state) => state);
    return (
        <div>
            <div className="flex items-center px-4 py-2">
                <h1 className="text-xl font-bold">Link History</h1>
                <CalendarDateRangePicker className="ml-auto" />
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                    <div className="relative">
                        Timeline {
                            selectedLink? (
                                <ImageCarousel selectedLink={selectedLink}/>
                            ): 'Select a link to continue'
                        }
                    </div>
                </form>
            </div>

        </div>
    )
}