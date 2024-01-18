"use client"
interface ImageCarouselProps {
    selectedLink: string;
}
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWindowSize } from "usehooks-ts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FullscreenIcon } from "lucide-react";
import { ToolTipWrapper } from "@/components/tooltip-wrapper";
import { ZoomOutIcon, ZoomInIcon } from "@radix-ui/react-icons";

export function ImageCarousel({ selectedLink }: ImageCarouselProps) {
    const { width, height } = useWindowSize();
    React.useEffect(() => {
        console.log(width, height);
    }, [width, height]);

    const data = {
        "success": 1,
        "message": "OK",
        "data": [
            {
                "key": "DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95.png",
                "url": "https://snapsite-domains.s3.ap-south-1.amazonaws.com/DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6DLDFCXX73MIKIMS%2F20240117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240117T212756Z&X-Amz-Expires=86400&X-Amz-Signature=37702efb1b9c7ac994848a4c175f864cae2f1519c99c262cc9767316a0659bc5&X-Amz-SignedHeaders=host&x-id=GetObject"
            },
            {
                "key": "DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95-small.png",
                "url": "https://snapsite-domains.s3.ap-south-1.amazonaws.com/DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95-small.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6DLDFCXX73MIKIMS%2F20240117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240117T212756Z&X-Amz-Expires=86400&X-Amz-Signature=98069d85873f95429914296600c6f67dcd20b417b5e9bfedba76e55b841ebf41&X-Amz-SignedHeaders=host&x-id=GetObject"
            }
        ]
    }
    return (
        <div className="flex items-center justify-center">
            <Carousel
                opts={{
                    align: "center",
                }}
                className="w-full max-w-lg md:max-w-3xl lg:max-w-7xl"
            >
                <CarouselContent className="">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex items-center justify-center p-1">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Image src={data.data[1].url} width={500} alt='Image' height={500} />
                                            </DialogTrigger>
                                            <DialogContent className="flex w-full h-full max-w-xl md:max-w-3xl lg:max-w-7xl  focus-visible:ring-0 focus:ring-0 focus-visible:border-0">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        <div className="absolute hidden top-0 h-12 w-full max-w-xl md:max-w-3xl lg:max-w-7xl bg-accent z-50 opacity-25 hover:opacity-70 transition-all rounded-md justify-start">
                                                            <div className="flex items-center w-full">
                                                                <ToolTipWrapper text="Zoom In" delay={0} side="bottom">
                                                                    <ZoomInIcon className="w-6 h-6 text-muted-foreground hover:text-primary" />
                                                                </ToolTipWrapper>
                                                                <ToolTipWrapper text="Zoom Out" delay={0} side="bottom">
                                                                    <ZoomOutIcon className="w-6 h-6 text-muted-foreground hover:text-primary" />
                                                                </ToolTipWrapper>
                                                            </div>
                                                        </div>
                                                    </DialogTitle>
                                                    <DialogDescription className=" p-1">

                                                        <ScrollArea className="w-full rounded-md h-[92.5vh]">

                                                            <Image
                                                                src={data.data[0].url}
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
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
