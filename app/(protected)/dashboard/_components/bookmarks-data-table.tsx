"use client"
import { CopyCustomIcon } from '@/components/copy-icon';
import { buttonVariants } from '@/components/ui/button';
import { UserBookmarksType } from '@/lib/user';
import { cn } from '@/lib/utils';
import { DownloadIcon } from '@radix-ui/react-icons';
import { slice } from 'lodash';
import { BookmarkXIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface BookmarksDataTableProps {
    bookmarks: UserBookmarksType;
}

export const BookmarksDataTable = ({ bookmarks }: BookmarksDataTableProps) => {
    return (
        <div className="space-y-4 w-full h-full">
            {
                bookmarks.map((data, i) => (
                    <div key={i} className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        "flex items-center h-12"
                    )}>
                        <DownloadIcon className='h-4 w-4 text-muted-foreground' />
                        <Link href={`/bookmarks?id=${data.id}`} className="ml-4 space-y-1">

                            <p className="text-sm font-medium leading-none">
                                {
                                    data.linkdata.links.userlinkmap[0].assignedName
                                }
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {
                                    data.createdAt.toLocaleDateString()
                                }

                            </p>
                        </Link>
                        <div className="ml-auto font-sm flex items-center gap-x-2">
                            {
                                slice(data.linkdata.links.url, 0, 15)
                            }...

                            <CopyCustomIcon data={data.linkdata.links.url} />
                        </div>
                    </div>
                ))
            }
            {
                bookmarks.length === 0 && (
                    <div className="flex w-full h-full items-center justify-center p-4">
                        <BookmarkXIcon className="text-muted-foreground h-12 w-12" />
                    </div>
                )
            }
        </div>
    )
}