import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { useWindowSize } from 'usehooks-ts';
import { ImageDialog } from './image-dialog';
import { ToolTipWrapper } from './tooltip-wrapper';

interface TimelineProps {
  children?: React.ReactNode;
}

export const Timeline = ({ children }: TimelineProps) => {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col w-full '>
        {children}
      </div>
    </div>
  )
}


interface TimelineItemProps {
  children?: React.ReactNode;
  showAlternateItem?: boolean;
  alternateItem?: React.ReactNode;
  imageUrl: string;
  thumbnailUrl: string;
}

export const TimelineItem = ({imageUrl,children,thumbnailUrl}:TimelineItemProps) => {
  const imageDemo = "https://snapsite-domains.s3.ap-south-1.amazonaws.com/DAILY/ui.shadcn.com/34ea1f6d8d89539b5a95/1705526797137/34ea1f6d8d89539b5a95-small.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6DLDFCXX73MIKIMS%2F20240118%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240118T164845Z&X-Amz-Expires=86400&X-Amz-Signature=1c4bb83891955bfa288febab03132e906fb2b828eeeb643d4988044fa42e37f9&X-Amz-SignedHeaders=host&x-id=GetObject";
  
  return (
    <div className='flex flex-row items-center h-fit w-full justify-center mx-auto'>

      {children}


      <div className='flex relative w-1 h-full items-center justify-center bg-zinc-500'>
        <div className="absolute rounded-full w-4 h-4 bg-foreground z-10" />
      </div>


      <div className="flex w-full max-w-[500px] h-full">
       <ToolTipWrapper text='Maximize' delay={700} color='background' bgColor='foreground'>
       <ImageDialog thumbnailUrl={thumbnailUrl} imageUrl={imageUrl} className='ml-4' />
       </ToolTipWrapper>
      </div>

    </div>
  )
}