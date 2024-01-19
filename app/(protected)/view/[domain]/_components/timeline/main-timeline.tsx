"use client"
import React from 'react';
import { TimeLineComponent } from './links-timeline-component';

interface MainTimelineProps {
    selectedLink: string;
}

export const MainTimeline = ({ selectedLink }: MainTimelineProps) => {
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">

                    <div className="relative">
                        {
                            selectedLink ? (

                                <TimeLineComponent selectedLink={selectedLink} />
                            ) : 'Select a link to continue'
                        }
                    </div>

                </div>
    )
}