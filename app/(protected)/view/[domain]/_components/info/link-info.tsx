"use client"
import { LinkDataType } from '@/app/api/linkdata/route';
import React from 'react';

import {
    CalendarIcon,
    ChevronDownIcon,
    CircleIcon,
    CountdownTimerIcon,
    GlobeIcon,
    Pencil1Icon,
    PlusIcon,
    StarIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { EditLinkDialog } from '../edit-link';
import { TimerIcon } from 'lucide-react';
import { LinkHeatmap } from './heatmap';
interface LinkInfoProps {
    linkData: LinkDataType["link"];
}

export const LinkInfo = ({ linkData }: LinkInfoProps) => {
    return (
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative grid grid-cols-1 md:grid-cols-2">

                <Card>
                    <CardHeader className="flex  items-start space-y-2">
                        <CardTitle>Assigned Name</CardTitle>
                        <CardDescription>
                            Summarized description of the link
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='gap-y-2'>
                        <div>
                            <p className='inline-flex items-center gap-x-2'>
                               <GlobeIcon className='w-4 h-4'/> {linkData.domains.domain}
                            </p>
                            <div className="flex space-x-4 text-sm font-semibold">
                                <div className="flex items-center">
                                    <TimerIcon className="mr-1 h-4 w-4 " />
                                    {linkData.timing}
                                </div>
                                <div className="flex items-center">
                                    <CountdownTimerIcon className="mr-1 h-4 w-4" />
                                    20
                                </div>
                                <div className='flex items-center'>
                                    <CalendarIcon className="mr-1 h-4 w-4" />
                                    11/11/11
                                </div>
                            </div>
                        </div>
                        <div className="flex w-fit items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                            <EditLinkDialog>
                                <Button variant="secondary" className="px-3 shadow-none">
                                    <Pencil1Icon className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </EditLinkDialog>
                            <Separator orientation="vertical" className="h-[20px]" />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" className="px-2 shadow-none">
                                        <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    alignOffset={-5}
                                    className="w-[200px]"
                                    forceMount
                                >
                                    <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Future Ideas
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <PlusIcon className="mr-2 h-4 w-4" /> Create List
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>
                <LinkHeatmap />
            </div>

        </div>
    )
}