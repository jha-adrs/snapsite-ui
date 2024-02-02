"use client"
import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, HistoryIcon, Loader2Icon, QrCodeIcon } from 'lucide-react';
import { MainTimeline, MainTimelineSkeleton } from './timeline/main-timeline';
import { MainInfoTab } from './info/main-info-tab';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { LinkDataType } from '@/app/api/linkdata/route';
import { SelectLink } from '@/components/select-link';
import { Button } from '@/components/ui/button';
import { ToolTipWrapper } from '@/components/tooltip-wrapper';
import { QRCodeDialog } from '@/components/qr-code-dialog';
import Link from 'next/link';
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

                            <QRCodeDialog value={linkData.link.url}>
                                <Button className="ml-1 mt-1 p-0" onClick={() => { }} variant={"ghost"} size={"icon"}

                                >
                                    <QrCodeIcon className="w-4 h-4" />
                                </Button>
                            </QRCodeDialog>


                            {/* <CalendarDateRangePicker className="ml-auto" /> */}

                            <TabsList className="ml-auto">
                                <TabsTrigger value='images'>Info</TabsTrigger>
                                <TabsTrigger value='timeline'>Timeline</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* <Separator /> */}
                        <TabsContent value='timeline'>
                            <MainTimeline linkData={linkData} />
                        </TabsContent>
                        <TabsContent value='images'>
                            <MainInfoTab linkData={linkData} />

                        </TabsContent>

                    </Tabs>
                ) : (null)
            }
            {
                !paramLink ? (
                    <SelectLink />
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