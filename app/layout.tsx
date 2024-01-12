import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

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
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
