"use client"
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2, PlusCircle, PlusCircleIcon, UploadIcon } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import {
    Dialog,
    DialogClose,
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
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { ToolTipWrapper } from './tooltip-wrapper';
import { Checkbox } from './ui/checkbox';
import { convertCsvToJson, csvJSONSchema } from '@/lib/csv-reader';
import { addMultipleLinks } from '@/actions/add-multiple-links';
interface AddLinkDialogProps {

}

const uploadCSVSchema = z.object({
    file: z.custom<FileList>().refine((fileList) => fileList.length === 1, 'Please upload a single file')
        .transform((file) => file[0] as File)
        .refine((file) => file.type === 'text/csv', 'Please upload a CSV file'),
    autoAssignName: z.boolean().default(false), // User needs to specify name in CSV
    tags: z.array(z.string()).default([]),
})

export const UploadCSVDialog = ({ }: AddLinkDialogProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof uploadCSVSchema>>({
        resolver: zodResolver(uploadCSVSchema),
        defaultValues: {
            autoAssignName: false,
            tags: [],
        },

    })
    //  TODO: Get tags from database for the user
    // TODO: Add assigned names later
    const handleSubmit = async (values: z.infer<typeof uploadCSVSchema>) => {
        //e.preventDefault();
        toast.warning("Adding multiple links, this may take a while");
        startTransition(() => {
            console.log("Submitting csv", values);
            convertCsvToJson(values.file).then((res) => {
                if (!res || res.success === false || !res.data) {
                    toast.error(res.message || "Failed to convert CSV file", {
                        duration: Infinity,
                        action: {
                            label: "Close",
                            onClick: () => toast.dismiss(),
                        },
                        dismissible: true,
                    });
                    return;
                }
                addMultipleLinks(res.data).then((res) => {
                    toast.success(`Added, ${res.failed} Failed`);
                }).catch((err) => {
                    console.log("Error while adding links", err);
                    toast.error("Failed to add links");
                })



            }).catch((err) => {
                console.log("Error while converting csv", err);
                toast.error("Check if the CSV file is valid");
            })
        })
    }
    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                        <UploadIcon className='w-4 h-4' />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-md">
                    <DialogHeader className='items-start'>
                        <DialogTitle className='inline-flex items-start'>
                            Upload CSV
                        </DialogTitle>
                        <DialogDescription>
                            Add multiple links using a CSV file

                        </DialogDescription>
                    </DialogHeader>
                    {/*React hook form  */}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} action="" className="space-y-8">
                            <FormField
                                name='file'
                                control={form.control}
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>CSV File</FormLabel>
                                        <FormDescription>Upload a CSV file containing links</FormDescription>
                                        
                                        <FormControl>
                                            <Input id='csvfile' type="file"
                                                onChange={(e) => {
                                                    onChange(e.target.files);
                                                }}
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        <div className='inline-flex items-center mr-2'>
                                            <AlertCircle className='w-4 h-4 text-red-500' /> <p className="text-muted-foreground text-sm">You can add upto 20 links at a time</p>
                                        </div>
                                    </FormItem>
                                )
                                }
                            />
                            {/* <FormField
                                control={form.control}
                                name="autoAssignName"
                                render={({ field }) => (
                                    <FormItem className="flex  flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Auto assign a name derived from the link url
                                            </FormLabel>
                                            <FormDescription>
                                                Auto generated names may not be accurate
                                                {" "}
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            /> */}



                            <DialogFooter >

                                <DialogClose asChild>
                                    <Button
                                        onClick={form.handleSubmit(handleSubmit)}
                                        disabled={isPending}
                                    >
                                        {
                                            isPending ? <Loader2 className='animate-spin w-4 h-4' /> : "Add"

                                        }
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>


                </DialogContent>
            </Dialog>

        </>
    )
}