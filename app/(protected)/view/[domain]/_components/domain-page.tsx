"use client"
import { Separator } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { DomainSwitcher } from './domain-switcher';
import { cn } from '@/lib/utils';
import { Nav } from './nav';
import { Input } from '@/components/ui/input';
import { UserDomainLinksType } from '@/lib/links';
import { useSidebar } from '@/store/use-sidebar';
import { LinkViewer } from './link-viewer';

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
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)
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
            <ResizableHandle withHandle className='flex h-screen' />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <LinkViewer />
            </ResizablePanel>
            <ResizableHandle withHandle />
        </ResizablePanelGroup>
    )
}