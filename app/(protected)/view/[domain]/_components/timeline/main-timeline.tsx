"use client"
import React from 'react';
import { TimeLineComponent } from './links-timeline-component';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface MainTimelineProps {
    selectedLink: string;
}

export const MainTimeline = ({ selectedLink }: MainTimelineProps) => {
    const params = useSearchParams();
    const { mutate: fetchData, isPending } = useMutation({
        mutationFn: async () => {
            const {data} = await axios.post('/api/linkdata',{
                hashedUrl: params.get('link'),
                period: 'DAILY'
            })
           
            console.log(data);
            console.log('fetching data');
        },
        onError: () => {
            toast.error('Error while fetching data')
        },
        onSuccess: () => {
            toast.success('Success')
        },
    });

    
    
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