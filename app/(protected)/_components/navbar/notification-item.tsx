import { Button } from '@/components/ui/button';
import { cn, duration } from '@/lib/utils';
import { Notifications } from '@prisma/client';
import React from 'react';
const NotificationItem = ({
    id,
    userId,
    message,
    description,
    readStatus,
    priority,
    createdAt,
}: Notifications) => {
    return (
        <Button variant={"ghost"} className={cn("flex  flex-row w-full h-12 my-2 mr-1",
        )}>
            <div>
                {!readStatus ? (
                    <div className="bg-primary mr-2 w-2 h-2 rounded-full" />
                ) : (
                    <div className="bg-muted-foreground mr-2 w-2 h-2 rounded-full" />

                )}
            </div>
            <div className="flex flex-col w-full">
                <div className="flex  w-full justify-between">
                    <p className={cn(
                        "text-md text-start",
                        readStatus ? "text-muted-foreground" : "text-foreground"
                    )}>
                        {message}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                        {duration(createdAt)}
                    </p>
                </div>
                <p className="text-xs text-start text-muted-foreground break-words overflow-x-clip">{description?.slice(0, 50)}</p>
            </div>

        </Button>
    )
}

export default NotificationItem;