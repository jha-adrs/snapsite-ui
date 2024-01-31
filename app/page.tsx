import { Button, buttonVariants } from '@/components/ui/button'
import { getAuthSession } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { ArrowRightCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const session = await getAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className='absolute flex flex-row top-0 w-full h-12 items-center p-2 justify-center'>
        <ul className="flex space-x-8">
          <li>
          <Link href={
            (session && session.user) ? "/dashboard" : "/sign-in"
          } className={cn(
              buttonVariants({ size: "sm", variant: "default" })
            )}>
              {
                (session && session.user) ? "Dashboard" : "Sign In"
              } <ArrowRightCircle className="w-4 h-4 ml-2" />
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}
