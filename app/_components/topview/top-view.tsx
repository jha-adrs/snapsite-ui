import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TopViewProps {

}

const TopView = ({ }: TopViewProps) => {
    const words = [
        {
            text: "Your ",
        },
        {
            text: "personal",
        }, {
            text: "web",
        }, {
            text: "archive",
        }
    ]
    return (
        <>
            <div className="absolute pointer-events-none inset-0 border flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="space-y-4 flex flex-col items-center justify-center">
                <p className="text-3xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 dark:from-neutral-200 bg-neutral-950 dark:to-neutral-500 py-2">
                    Unlock insights from the past
                </p>
                <p className='text-2xl sm:text-3xl font-bold'>
                    Your <span className='bg-gradient-to-r from-[#f857a6]  to-[#ff5858] text-transparent bg-clip-text'> archive </span> for the web.
                </p>
                <Link href={'/sign-up'}>
                    <Button variant={"white"} size={"lg"} >
                        Get Started &rarr;
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default TopView;