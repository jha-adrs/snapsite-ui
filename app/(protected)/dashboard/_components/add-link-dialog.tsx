"use client"
import { Button } from '@/components/ui/button';
import { PlusCircle, PlusCircleIcon } from 'lucide-react';
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

export const AddLinkDialog = ({ }: AddLinkDialogProps) => {
    const [ isPending, startTransition ] = useTransition();
    const [link, setLink] = React.useState('');
    const [timing, setTiming] = React.useState<links_timing>("WEEKLY");
    const [tags, setTags] = React.useState<string[]>([]); //User specified tags
    const [assignedName, setAssignedName] = React.useState<string>(""); //User specified tags
    
    //  TODO: Get tags from database for the user
    // TODO: Add assigned names later
    const handleSubmit = async (e: React.FormEvent) => {
        //e.preventDefault();
        startTransition(() => {
            console.log("Submitting link", link, timing, tags);
            addLink({url:link, timing, tags, assignedName}).then((res) => {
                if (res === true) {
                    toast.success("Link added successfully");
                    setAssignedName("");
                    setLink("");
                    setTags([]);
                    setTiming("WEEKLY");
                    
                } else {
                    toast.error("Failed to add link");
                }
            }).catch((err) => {
                console.log("Error while adding link" ,err);
                toast.error("Failed to add link");
            })
        })
    }
    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircleIcon className='w-4 h-4 mr-1' />  Add Link
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Link
                            </Label>
                            <Input id="link" type='url' placeholder='www.public-website.com/...' value={link} className="col-span-3"
                                onChange={
                                    (e) => {
                                        setLink(e.target.value);
                                    }
                                } />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" type='text' placeholder='my-important-link' value={assignedName} className="col-span-3"
                                onChange={
                                    (e) => {
                                        setAssignedName(e.target.value);
                                    }
                                } />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Tags
                            </Label>
                            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
                            {/* <TagInput /> */}
                            <Select onValueChange={(e) => {
                                setTags([e])
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a tag" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tags</SelectLabel>
                                        {
                                            availableTags.map((tag, index) => {
                                                return (
                                                    <SelectItem key={index} value={tag}>{tag}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Timing
                            </Label>
                            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
                            {/* <TagInput /> */}
                            <Select onValueChange={(e) => {
                                e === "0" ? setTiming("DAILY") : e === "1" ? setTiming("WEEKLY") : setTiming("MONTHLY")
                            }}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select capture timing" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tags</SelectLabel>
                                        <SelectItem key={0} value={"0"}>Daily</SelectItem>
                                        <SelectItem key={1} value={"1"}>Weekly</SelectItem>
                                        <SelectItem key={2} value={"2"}>Monthly</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={isPending || link === '' }
                        >Save </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}