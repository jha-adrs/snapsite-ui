"use client"
import { Separator } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare,
    PenBox,
    Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2,
} from "lucide-react"
import { DomainSwitcher } from './domain-switcher';
import { cn } from '@/lib/utils';
import { Nav } from './nav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UserDomainLinksType } from '@/lib/links';
import { useSidebar } from '@/store/use-sidebar';

interface DomainPageProps {
    currentDomain: string
    domains: {
        label: string;
        id: number;
        createdAt: Date;
        icon: string;
    }[];
    links: UserDomainLinksType;
    defaultLayout?: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize?: number
}

export const DomainPage = ({
    domains,
    links,
    currentDomain,
    defaultLayout = [200, 700],
    defaultCollapsed = false,
    navCollapsedSize,
}: DomainPageProps) => {
    const {collapsed,onCollapse,onExpand} = useSidebar((state)=>state)
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed)
    
    return (
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}`
            }}
            className="flex h-full items-stretch"
        >
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={15}
                maxSize={30}
                onCollapse={() => {
                    setIsCollapsed(true)
                    onCollapse()
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        isCollapsed
                    )}`
                }}
                onExpand={
                    () => {
                        setIsCollapsed(false)
                        onExpand()
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            isCollapsed
                        )}`
                    }
                }
                className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
            >
                <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]' : 'px-2')}>
                    <DomainSwitcher isCollapsed={collapsed} domains={domains} currentDomain={currentDomain} />
                </div>
                <Separator className='' />
                <Nav
                    isCollapsed={collapsed}
                    links={links}
                />
                <Separator />

            </ResizablePanel>
            <ResizableHandle withHandle className='flex h-screen'/>
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Inbox</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">All mail</TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Unread</TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <TabsContent value="all" className="m-0">
                        <div>
                            All
                        </div>
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                        <div>
                            Unread
                        </div>
                    </TabsContent>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />
        </ResizablePanelGroup>
    )
}