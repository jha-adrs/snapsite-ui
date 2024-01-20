// Dialog which shows the image

"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { useWindowSize } from 'usehooks-ts';
import { cn } from '@/lib/utils';
interface ImageDialogProps {
    thumbnailUrl?: string;
    imageUrl?: string;
    className?: string;
}

export const ImageDialog = ({ thumbnailUrl, imageUrl, className }: ImageDialogProps) => {
    const { width, height } = useWindowSize();
    if(!imageUrl) imageUrl = "default";
    if (!thumbnailUrl) thumbnailUrl = "default";
    return (
        <div className={cn(
            className,
        )}>
            <Dialog>
                <Card className='w-full h-fit my-2'>
                    <CardContent className='flex w-full h-full p-0 items-center justify-center'>

                        <DialogTrigger className='rounded-lg'>
                            <Image src={thumbnailUrl} width={500} alt='Image' height={500} className='rounded-lg' />
                        </DialogTrigger>
                    </CardContent>
                </Card>
                <DialogContent className="flex w-full h-full max-w-xl md:max-w-3xl lg:max-w-7xl  focus-visible:ring-0 focus:ring-0 focus-visible:border-0">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="absolute hidden top-0 h-12 w-full max-w-xl md:max-w-3xl lg:max-w-7xl bg-accent z-50 opacity-25 hover:opacity-70 transition-all rounded-md justify-start">
                                <div className="flex items-center w-full">
                                    Icons
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogDescription className=" p-1">

                            <ScrollArea className="w-full rounded-md h-[92.5vh]">

                                <Image
                                    src={imageUrl}
                                    width={width}
                                    height={height}
                                    className="w-full"
                                    alt="Image"
                                />
                            </ScrollArea>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}