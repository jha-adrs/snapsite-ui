import { getAuthSession } from '@/lib/auth'
import MainNav from './_components/navbar/main-nav'
import TopView from './_components/topview/top-view';
import { FloatingNav } from '@/components/ui/floating-navbar';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { OurServices } from './_components/our-services';
import dynamic from 'next/dynamic';

const ContactUs = dynamic(() => import('./_components/contact-us'), { ssr: false });

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <main className="flex min-h-screen h-lvh flex-col items-center dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
        <MainNav auth={session && session.user ? true : false} redirectURL={session && session.user ? '/dashboard' : '/sign-in'} />
        <div className='flex flex-col h-full items-center justify-center'>

          <FloatingNav auth={session && session.user ? true : false} />
          <TopView />

        </div>


      </main>
      <div className="grid grid-cols-1 lg:grid-cols-2 space-y-8 p-6 bg-white dark:bg-zinc-950 min-h-96 w-full items-center">
        <div className='flex col-span-1 justify-center items-center '>
          <Image src="/hero-section.svg" alt="hero" width={300} height={300} />
        </div>
        <div className='col-span-1 justify-start lg:justify-center items-center text-center space-y-4'>
          <h1 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">Elevating
            <span className=' text-transparent bg-clip-text bg-gradient-to-r from-[#ff0f7b]  to-[#f89b29]'>
              {" "}web archiving
            </span> standards. </h1>
          <p className="text-muted-foreground text-lg font-semibold">
            Discover a new approach to capturing history with Snapsite.
          </p>
          <p className=" text-muted-foreground font-medium">
            Snapsite is a web archiving tool that provides reliable, scalable, and exportable solutions for your web archiving and website history tracking.
          </p>

          <Button variant={"outline"} className="bg-gradient-to-r from-[#ff0f7b]  to-[#f89b29] text-transparent px-4 py-2 rounded-lg text-white hover:text-black/50">

            Learn More &rarr;

          </Button>

        </div>
      </div>
      <Separator />
      <div className="min-h-[600px]">
        {/* Our Services */}
        <OurServices />
      </div>

      <Separator />
      <div className="min-h-[300px]">
        <ContactUs />
      </div>
    </>
  )
}
