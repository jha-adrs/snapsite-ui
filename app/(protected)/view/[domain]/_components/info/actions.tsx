"use client"
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { PauseCircleIcon, Trash2Icon } from 'lucide-react';
import { pauseLink } from '@/actions/pause-link';
import { toast } from 'sonner';
import { EditLinkDialog } from '../edit-link';
import { DotsVerticalIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { deleteLink } from '@/actions/delete-link';
import { LinkInfoType } from '@/actions/get-link-info';

interface ActionsProps {
    linkData: any;
    linkInfo: LinkInfoType;
}

export const Actions = ({ linkData,linkInfo }: ActionsProps) => {
    return (
        <div className='flex flex-row items-center justify-center sm:justify-end mt-4 gap-x-2'>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"secondary"} size={"icon"}>
                        <PauseCircleIcon className='w-4 h-4' />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Pause this link?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This pauses tracking the current link, if other users are tracking this link you can still see the stats later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                pauseLink(linkData.hashedUrl).then((res) => {
                                    if (res) {
                                        toast.success("Link paused successfully.")
                                    } else {
                                        toast.error("Sorry,Something went wrong.")
                                    }
                                }).catch((err) => {
                                    toast.error("Something went wrong.")
                                })
                            }}
                        >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="">
                <EditLinkDialog>
                    <Button variant="secondary" size={"default"} className="px-3 items-center shadow-none">
                        <Pencil1Icon className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </EditLinkDialog>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"secondary"} size={"icon"}>
                        <Trash2Icon className='w-4 h-4' />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will remove the link from your bucket.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                deleteLink(linkData.hashedUrl).then((res) => {
                                    if (res) {
                                        toast.success("Link deleted successfully.")
                                    } else {
                                        toast.error("Link deletion failed.")
                                    }
                                }).catch((err) => {
                                    toast.error("Something went wrong.")
                                })
                            }}
                        >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button variant={"secondary"} size={"icon"}>
                <DotsVerticalIcon className='w-4 h-4' />
            </Button>
        </div>
    )
}