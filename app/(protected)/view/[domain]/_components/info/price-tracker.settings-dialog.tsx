"use client"
import { Button } from '@/components/ui/button';
import { PlusCircle, PlusCircleIcon, Settings } from 'lucide-react';
import React, { useTransition } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { links_timing } from '@prisma/client';
import { link_tags as availableTags } from '@/config/constants';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addLink } from '@/actions/add-link';
import { toast } from 'sonner';

interface AddLinkDialogProps {

}

export const PriceTrackerSettingsDialog = ({ }: AddLinkDialogProps) => {
    const [isPending, startTransition] = useTransition();

    //  TODO: Get tags from database for the user
    // TODO: Add assigned names later
    const handleSubmit = async (e: React.FormEvent) => {
        //e.preventDefault();
        startTransition(() => {
            console.log("Submitting");

        })
    }
    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                        <Settings className='w-4 h-4 mr-1' /> Settings

                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-md">
                    <DialogHeader>
                        <DialogTitle>Add link</DialogTitle>
                        <DialogDescription>
                            Add a link or comma separated links to your bucket.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">

                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={isPending}
                        >Save </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}