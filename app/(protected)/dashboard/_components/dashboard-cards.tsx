
import React, { useEffect, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DashboardDataTable } from './links-data-table';
import { ArrowUpRight, ArrowUpRightSquareIcon, Bell, BellIcon, GlobeIcon, Link2, Link2OffIcon } from 'lucide-react';
import Link from 'next/link';
import { ToolTipWrapper } from '@/components/tooltip-wrapper';
import { UserLinksType } from '@/lib/links';
import { UserBookmarksType, UserCountDataType } from '@/lib/user';
import { Overview } from './overview';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import { BookmarksDataTable } from './bookmarks-data-table';
interface DashboardCardsProps {
    data: UserLinksType;
    countData: UserCountDataType;
    bookmarks: UserBookmarksType;
}
export const DashboardCards = ({
    data,
    countData,
    bookmarks,
}: DashboardCardsProps) => {

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Links
                        </CardTitle>
                        <ToolTipWrapper text='Viewer'>
                            <Link href={"/view"} className="hover:bg-accent rounded-md">
                                <Link2 className='h-4 w-4 text-muted-foreground' />
                            </Link>
                        </ToolTipWrapper>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {countData.links}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Number of links in your bucket
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Domains
                        </CardTitle>
                        <GlobeIcon className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {countData.domains}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Number of unique domains in your bucket
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Bookmarks
                        </CardTitle>
                        <BookmarkIcon className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {countData.bookmarks}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Number of bookmarked snaps
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Notifications
                        </CardTitle>
                        <BellIcon className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                countData.notifications
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Check out your notifications on the navbar tab
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4 md:col-span-4">
                    <CardHeader>
                        <CardTitle>Recently added </CardTitle>
                        <CardDescription>
                            You have a total of {countData.links} links in your bucket
                        </CardDescription>
                    </CardHeader>
                    <CardContent className=' flex w-full h-4/6'>
                        <DashboardDataTable links={data} />
                    </CardContent>
                </Card>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Bookmarks</CardTitle>
                        <CardDescription>
                            You have bookmarked {countData.bookmarks} links
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <Overview /> */}
                        <BookmarksDataTable bookmarks={bookmarks} />
                    </CardContent>
                </Card>

            </div>
        </>
    )
}