import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface NotificationItemProps {
    read: boolean;
    title: string;
    description: string;
    date: string;

}

const NotificationItem = ({
    read,
    title,
    description,
    date
}: NotificationItemProps) => {
    if (!title || !description || !date) return null;
    return (
        <Button variant={"ghost"} className="flex flex-row w-full h-12 my-2">
            <div>
                {!read ? (
                    <div className="bg-primary mr-2 w-2 h-2 rounded-full" />
                ) : (
                    null

                )}
            </div>
            <div className="flex flex-col ">
                <p className={cn(
                    "text-md text-start",
                    read ? "text-muted-foreground" : "text-foreground"
                )}>
                    {title}
                </p>
                <p className="text-xs text-start text-muted-foreground break-words overflow-x-clip">{description.slice(0, 50)}</p>
            </div>

        </Button>
    )
}

export default NotificationItem;