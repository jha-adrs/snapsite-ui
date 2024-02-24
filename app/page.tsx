import { getAuthSession } from '@/lib/auth'
import MainNav from './_components/navbar/main-nav'
import TopView from './_components/topview/top-view';
export default async function Home() {
  const session = await getAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MainNav auth={session && session.user ? true : false} redirectURL={session && session.user ? '/dashboard' : '/sign-in'} />
      <TopView />
    </main>
  )
}
