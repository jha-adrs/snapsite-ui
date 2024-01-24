"use client"
import { Button, buttonVariants } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
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
                <div className={cn(
                    'p-1.5',
                    buttonVariants({variant: 'ghost',size: "icon"})
                )}>
                    <BellIcon className="w-6 h-6" />
                </div>
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
                        notifications.length > 0 && notifications.map((notif, i) => (
                            <>
                                <NotificationItem
                                    key={i}
                                    id={i}
                                    userId="as"
                                    message={notif.message}
                                    description={notif.description}
                                    createdAt={notif.createdAt}
                                    readStatus={notif.readStatus}
                                    priority={notif.priority}
                                    updatedAt={notif.updatedAt}
                                    extraData={notif.extraData}
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