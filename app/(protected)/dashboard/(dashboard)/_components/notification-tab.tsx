"use client"
import { Button } from '@/components/ui/button';
import { BellIcon } from 'lucide-react';
import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from '@/components/ui/scroll-area';
import NotificationItem from './notification-item';
import { Separator } from '@/components/ui/separator';
import { useWindowSize } from 'usehooks-ts';
import { Notification_Priority } from '@prisma/client';
interface NotificationTabProps {

}

export const NotificationTab = ({ }: NotificationTabProps) => {
    const screen = useWindowSize();
    return (

        <Sheet>
            <SheetTrigger>
                <Button variant={"ghost"} className='p-1.5 '>
                    <BellIcon className="w-6 h-6" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your notifications</SheetTitle>
                    <SheetDescription>
                        A list of your notifications.
                    </SheetDescription>

                </SheetHeader>
                <ScrollArea className='w-full p-1 rounded-md h-4/5'>
                    {
                        Array(15).fill(0).map((_, i) => (
                            <>
                                <NotificationItem
                                    key={i}
                                    id={i}
                                    userId="as"
                                    message={`Notification ${i}`}
                                    description={`This is a  tracking is stopped sign in again or contact support `}
                                    createdAt={new Date()}
                                    readStatus={i % 2 === 0}
                                    priority={Notification_Priority.LOW}
                                    updatedAt={new Date()}
                                />
                                <Separator className="my-2" /></>
                        ))
                    }
                </ScrollArea>
                <SheetFooter>
                    <Button variant="default">View all</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}