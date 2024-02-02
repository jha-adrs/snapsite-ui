"use client"
import { Button } from '@/components/ui/button';
import { PlusCircle, PlusCircleIcon, Settings, Star, StarIcon } from 'lucide-react';
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

import { addLink } from '@/actions/add-link';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const notificationsFormSchema = z.object({
    type: z.enum(["all", "mentions", "none"], {
        required_error: "You need to select a notification type.",
    }),
    mobile: z.boolean().default(false).optional(),
    communication_emails: z.boolean().default(false).optional(),
    social_emails: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

interface LinkDialogProps {

}

const defaultValues: Partial<NotificationsFormValues> = {
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true,
}
export const LinkSettingsDialog = ({ }: LinkDialogProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<NotificationsFormValues>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues,
    })
    //  TODO: Get tags from database for the user
    // TODO: Add assigned names later
    function onSubmit(data: NotificationsFormValues) {
        toast(
            `${JSON.stringify(data, null, 2)}`
        )
    }
    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                        <Settings className='w-4 h-4 mr-1' /> Settings

                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-md h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>
                             NOTE: These are just for demo purposes and do not actually do anything.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                <div>
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="communication_emails"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">
                                                            Enable price tracker
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Scrape price data from the website and track changes.
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="marketing_emails"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base  ">
                                                            Enable Video 
                                                            <Badge variant={"default"} className='ml-2'>
                                                                PRO
                                                            </Badge>
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Record a 10 second video of the website and instead of only taking screenshots.
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="social_emails"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">
                                                            Phone screenshots 
                                                        </FormLabel>
                                                        <FormDescription>
                                                           Enable screenshots of the website on mobile devices.
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isPending}
                        >Save </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}