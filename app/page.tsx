import { getAuthSession } from '@/lib/auth'
import MainNav from './_components/navbar/main-nav'
import TopView from './_components/topview/top-view';
import { LampEffect } from './_components/topview/lamp-effect';
import { FloatingNav } from '@/components/ui/floating-navbar';



export default async function Home() {
  const session = await getAuthSession();
  
  return (
    <main className="flex min-h-screen h-lvh flex-col items-center justify-between bg-background">
      <MainNav auth={session && session.user ? true : false} redirectURL={session && session.user ? '/dashboard' : '/sign-in'} />
      <div className='relative'>
        
        <FloatingNav auth={session && session.user ? true : false} />
        <TopView />
      </div>

    </main>
  )
}
