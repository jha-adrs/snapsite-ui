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
import { Notification_Priority, Notifications } from '@prisma/client';
interface NotificationTabProps {
    notifications?: Notifications[];
}

export const NotificationTab = ({
    notifications = [],
}: NotificationTabProps) => {
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
                
                <ScrollArea className='w-full  rounded-md h-5/6'>
                    {
                        notifications.length > 0 && notifications.map((_, i) => (
                            <>
                                <NotificationItem
                                    key={i + 3 * 5}
                                    id={i}
                                    userId="as"
                                    message={`Notification ${i}`}
                                    description={`This is a  tracking is stopped sign in again or contact support `}
                                    createdAt={new Date()}
                                    readStatus={i % 2 === 0}
                                    priority={Notification_Priority.HIGH}
                                    updatedAt={new Date()}
                                />
                                <Separator className="my-2" /></>
                        ))
                    }
                    {
                        notifications.length === 0 && (
                            <div className="flex flex-col w-full h-svh items-center justify-center">                                
                                <p className='text-sm font-semibold text-muted-foreground'>
                                    No new notifications
                                </p>
                            </div>
                        )
                    
                    }
                    
                </ScrollArea>
                
                <SheetFooter>
                    <Button variant="default"
                    disabled={notifications.length === 0}
                    >View all</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}