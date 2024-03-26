
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface OurServicesProps {

}

export const OurServices = ({ }: OurServicesProps) => {
    return (
        <div className='flex flex-col h-full w-full items-center justify-start p-8'>
            <p className="text-3xl lg:text-4xl font-bold pb-6">
                Our <span className="  ">Services</span>
            </p>
            <div className="flex flex-col-reverse justify-center space-x-0 lg:space-x-24 lg:flex-row">


                <div className='flex flex-col space-y-4 mt-4'>
                    <CardComponent
                        title="Web Archiving"
                        description="We provide reliable, scalable, and exportable solutions for your web archiving and website history tracking."
                        url='/docs/acrhive' />
                    <CardComponent
                        title="Website Monitoring"
                        description="We offer a comprehensive website monitoring service that helps you track changes on your website." />
                    <CardComponent
                        title="Web Scraping"
                        description="Our web scraping service allows you to extract data from websites and save it in a structured format." />
                    <CardComponent
                        title="Data Extraction"
                        description="We provide data extraction services that help you extract data from websites and save it in a structured format." />

                </div>
                <Image src="/services.svg" alt="hero" width={500} height={500} />
            </div>
        </div>

    )
}

const CardComponent = ({ title, description,url }: {
    title: string,
    description: string
    url?: string
}) => {
    return (
        <div className='flex flex-col space-y-2 rounded-xl p-4  backdrop-filter border bg-opacity-10 '>
            <Link href={url || "#"}>
                <p className="text-md lg:text-lg font-semibold">{title} &rarr;</p>
            </Link>
            <p className="text-muted-foreground font-medium max-w-lg text-sm lg:text-md">
                {description}
            </p>
        </div>
    )
}