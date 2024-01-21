"use client"
interface ImageCarouselProps {
    selectedLink: string;
    linkData: LinkDataType;
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
import { ImageDialog } from "@/components/image-dialog";
import { LinkDataType } from "@/app/api/linkdata/route";

export function ImageCarousel({ selectedLink,linkData }: ImageCarouselProps) {
    const { width, height } = useWindowSize();
    React.useEffect(() => {
        console.log(width, height);
    }, [width, height]);

    const data = { "success": 1, "message": "OK", "data": [{ "key": "DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95.png", "url": "https://snapsite-domains.s3.ap-south-1.amazonaws.com/DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6DLDFCXX73MIKIMS%2F20240118%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240118T165545Z&X-Amz-Expires=86400&X-Amz-Signature=8f17655b96a8ad33f0b6b8bc7cff05985047328f4202f200e3bd3c7e1063291b&X-Amz-SignedHeaders=host&x-id=GetObject" }, { "key": "DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95-small.png", "url": "https://snapsite-domains.s3.ap-south-1.amazonaws.com/DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95-small.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6DLDFCXX73MIKIMS%2F20240118%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240118T165545Z&X-Amz-Expires=86400&X-Amz-Signature=bea5173891858d455c3f1c5db3e8c69c437d1e3f77c769b68ab2b165425deffa&X-Amz-SignedHeaders=host&x-id=GetObject" }] }
    return (
        <div className="flex items-center justify-center">
            <Carousel
                opts={{
                    align: "center",
                }}
                className="w-full max-w-lg md:max-w-3xl lg:max-w-7xl"
            >
                <CarouselContent className="">
                    {linkData.keys.map((link, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <ImageDialog thumbnailUrl={link.thumbnail.url} imageUrl={link.screenshot.url} />

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
