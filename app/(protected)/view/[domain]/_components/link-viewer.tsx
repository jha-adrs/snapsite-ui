"use client"
import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSelectLink } from '@/store/selected';
import { CalendarDateRangePicker } from '@/components/date-picker';
import { ImageCarousel } from './info/image-carousel';
import { HistoryIcon, Loader2Icon } from 'lucide-react';
import { TimeLineComponent } from './timeline/links-timeline-component';
import { Separator } from '@/components/ui/separator';
import { MainTimeline, MainTimelineSkeleton } from './timeline/main-timeline';
import { MainImagesTab } from './info/main-images-tab';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { LinkDataType } from '@/app/api/linkdata/route';
import { SelectLink } from '@/components/select-link';
interface LinkViewerProps {
}

export const LinkViewer = ({ }: LinkViewerProps) => {
    const params = useSearchParams();
    const paramLink = params.get('link');
    const [linkData, setLinkData] = React.useState<LinkDataType>();
    const { mutate: fetchData, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post('/api/linkdata', {
                hashedUrl: params.get('link'),
                period: 'DAILY'
            })
            setLinkData(data);
        },
        onError: () => {
            toast.error('Error while fetching data')
        },
        onSuccess: () => {
        },
    });

    React.useEffect(() => {
        if (paramLink) {
            fetchData();
        }
    }, [paramLink, fetchData])

    return (
        <>
            {
                (linkData && paramLink) ? (
                    <Tabs defaultValue="images">
                        <div className="flex items-center px-4 py-4">
                            <h1 className="text-2xl font-bold inline-flex items-center">
                                Link History
                            </h1>

                            {/* <CalendarDateRangePicker className="ml-auto" /> */}
                            <TabsList className="ml-auto">
                                <TabsTrigger value='images'>Info</TabsTrigger>
                                <TabsTrigger value='timeline'>Timeline</TabsTrigger>
                            </TabsList>
                        </div>
                        <Separator />
                        <TabsContent value='timeline'>
                            <MainTimeline linkData={linkData} />
                        </TabsContent>
                        <TabsContent value='images'>
                            <MainImagesTab  linkData={linkData}/>
                    
                        </TabsContent>

                    </Tabs>
                ) : (null)
            }
            {
                !paramLink ? (
                   <SelectLink/>
                ) : (null)
            }
            
        </>
    )
}

export const LinkViewerSkeleton = () => {
    return (
        <div className='flex flex-col h-full w-full'>
            <div className="flex items-center justify-center w-full h-full">
                <Loader2Icon className="animate-spin w-8 h-8 text-primary-500" />
            </div>
        </div>
    )
}