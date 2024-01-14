"use client"
import { UserDomainsType } from '@/lib/links';
import { capitalize, slice } from 'lodash'
import React from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AArrowDownIcon, ArrowUpRightSquare, GlobeIcon, HistoryIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CaretDownIcon, Link2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { userlinkmap_timing } from '@prisma/client';
import { CopyCustomIcon } from '@/components/copy-icon';

type LinkInfo = {
    url: string;
    hash: string;
    isActive: string;
    createdAt: string;
    timing: userlinkmap_timing;
    tags: string | null;
    domain: string;
    assignedName: string | null;
}
interface LinkTableProps {
    links: LinkInfo[]
}



const columns: ColumnDef<LinkInfo>[] = [

    {
        accessorKey: "assignedName",
        header: () => <div className='items-center inline-flex'><AArrowDownIcon className='w-4 h-4 mx-1' />Name</div>,
        cell(props) {
            return (
                <div className='flex items-center space-x-2'>
                    <span>{props.row.original.assignedName || "-"}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "url",
        header: () => <div className='items-center inline-flex'><Link2Icon className='w-4 h-4 mx-2' />Links</div>,
        cell(props) {
            return (
                <div className='flex items-center space-x-2'>
                    
                    <CopyCustomIcon data={props.row.original.url} hideToolTip={true} />
                    <span>
                        {
                            slice(props.row.original.url, 0, 15)
                        }...
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "timing",
        header: () => <div className='items-center inline-flex'><HistoryIcon className='w-4 h-4 mx-1' />Timing</div>,
        cell(props) {
            return (
                <div className='flex items-center space-x-2'>
                    <span>{capitalize(props.row.original.timing)}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell(props) {
            const tagsStr = props.row.original.tags;
            return (
                <div className='flex items-center space-x-2'>
                    <span>
                        {(tagsStr && tagsStr.length>0) ? JSON.parse(tagsStr) : "-"}
                    </span>
                </div>
            )
        },
        
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell(props) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Actions <CaretDownIcon className="w-4 h-4 ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => { }}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { }}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { }}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    {
        accessorKey: "details",
        header: "Details",
        cell(props) {
            return (
                <Link href={`/view/${props.row.original.domain}/${props.row.original.hash}`} className={
                    buttonVariants({variant: 'outline', size: 'sm'})
                }>

                   View <ArrowUpRightSquare className='w-4 h-4 mx-1' />

                </Link>
            )
        },
    }
]

export const LinksTable = ({
    links
}: LinkTableProps) => {
    const table = useReactTable({
        data: links,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
    })
    return (
        <>
            <div className=" rounded-md border">
                <Table className=''>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </>
    )
}