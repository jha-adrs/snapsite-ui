import type { Metadata } from 'next'
import { Inter, Poppins, Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Providers from '@/components/providers'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ['latin'], variable: "--font-sans", })
export const metadata: Metadata = {
  title: 'Snap Site',
  description: 'Snap Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased ",
        inter.variable,
      )}>
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <SpeedInsights />
            <TooltipProvider>
              {children}
              <Analytics />
            </TooltipProvider>
          </ThemeProvider>
        </Providers>
        <footer className=''>
          <div className="flex flex-col w-full items-start h-12 justify-start ">

            <Separator />

            <div className="flex w-full p-2 gap-x-2 items-center justify-center">
              <Link href="/" className={cn(
                buttonVariants({ variant: "link" }),
                'text-muted-foreground'
              )}>Home</Link>
              <Link href="/about" className={cn(
                buttonVariants({ variant: "link" }),
                'text-muted-foreground'
              )}>About</Link>
              <Link href="/contact" className={cn(
                buttonVariants({ variant: "link" }),
                'text-muted-foreground'
              )}>Contact</Link>
              <Link href="/privacy" className={cn(
                buttonVariants({ variant: "link" }),
                'text-muted-foreground'
              )}>Privacy</Link>

            </div>
            <div className='flex w-full p-2 gap-x-2 items-center justify-center'>
              <Link href="https://clearbit.com" className={cn(
                buttonVariants({ variant: "link" }),
                'text-muted-foreground'
              )}>
                <p className='text-sm'>
                  Logos provided by Clearbit
                </p>
              </Link>

              <Link href="https://storyset.com/business"className={cn(
                buttonVariants({ variant: "link" }),
                'text-muted-foreground'
              )}>Business illustrations by Storyset</Link>

            </div>
            <div className="flex w-full p-2 gap-x-2 items-center justify-center">
              <p className="text-xs text-muted-foreground">
                Made with ❤️ by PlatinumJ
              </p>
            </div>
          </div>
        </footer>
      </body>

    </html>
  )
}
