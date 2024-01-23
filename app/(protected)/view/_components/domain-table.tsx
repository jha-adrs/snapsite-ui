"use client"
import React from 'react';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpRightSquare, ChevronsLeftIcon, ChevronsRight, GlobeIcon, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDomainSortOrder } from '@/store/sort-order';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

type DomainInfo = {
  domain: string;
  isActive: string;
  createdAt: string;
  linksCount: number;
}

interface DomainTableProps {
  domains: DomainInfo[]
}



const columns: ColumnDef<DomainInfo>[] = [

  {
    accessorKey: "domain",
    header: ({ column }) => <div onClick={() => {
      column.toggleSorting(column.getIsSorted() === "asc")
    }}
      className='items-center inline-flex'><GlobeIcon className='w-4 h-4 mx-2' />Domains</div>,
    cell(props) {
      // Only domain name and root domain name
      const domain = props.row.original.domain;
      const domainName = domain.split(".")[0] === "www" ? domain.split(".")[1] : domain.split(".")[0];
      const rootDomainName = domain.split(".")[0] === "www" ? domain.split(".")[2] : domain.split(".")[1];
      return (
        <div className='flex items-center space-x-2'>
          <Avatar className="h-9 w-9 border-2 border-primary">
            <AvatarImage src={`https://logo.clearbit.com/${domain}`} alt="Avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <span className='font-semibold'>{domainName}</span>
          <span className='text-xs text-gray-500'>.{rootDomainName}</span>
        </div>
      )
    },
    sortingFn: (a, b, sortOrder) => {
      const domainNameA = a.original.domain.split(".")[0] === "www" ? a.original.domain.split(".")[1] : a.original.domain.split(".")[0];
      const domainNameB = b.original.domain.split(".")[0] === "www" ? b.original.domain.split(".")[1] : b.original.domain.split(".")[0];
      if (domainNameA < domainNameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (domainNameA > domainNameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    }

  },

  {
    accessorKey: "linksCount",
    header: "Links",

  },
  {
    accessorKey: "createdAt",
    header: "Created"
  },
  {
    accessorKey: "isActive",
    header: "Active "
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell(props) {
      return (
        <Link target="_blank" href={`/view/${props.row.original.domain}`}>
          <Button size='sm' variant='outline'>
            Manage <ArrowUpRightSquare className='w-4 h-4 mx-1 text-muted-foreground' />
          </Button>
        </Link>
      )
    },
  }
]

export const DomainTable = ({
  domains
}: DomainTableProps) => {
  const { setSortOrder, sortOrder } = useDomainSortOrder((state) => state);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [sortOrderState, setSortOrderState] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: domains,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSortOrderState,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    state: {
      sorting: sortOrderState,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  })
  return (
    <>
      <div className="flex items-center py-4">
        <Input
          type='search'
          placeholder='Search domains...'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='w-2/6 my-2'
        />
        <Button className='ml-2' variant={"outline"} size={'default'}>
          <ListFilter className='w-4 h-4 mr-1'/> Filters
        </Button>

      </div>
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
                <p className='font-semibold text-sm'>
                Page {table.getState().pagination.pageIndex+1} of {table.getPageCount()}
                </p>
                <Button
                    variant={"outline"}
                    size="icon"
                    onClick={() =>table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeftIcon className='w-4 h-4' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className='w-4 h-4' />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon className='w-4 h-4' />
                </Button>
                <Button
                    variant={"outline"}
                    size="icon"
                    onClick={() =>table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight className='w-4 h-4' />
                </Button>
            </div>
    </>
  )
}