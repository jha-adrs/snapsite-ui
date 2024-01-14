"use client"
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
import { ArrowUpRightSquare, GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    header: () => <div className='items-center inline-flex'><GlobeIcon className='w-4 h-4 mx-2' />Domains</div>,

  },
  {
    accessorKey: "linksCount",
    header: "Links",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created"
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
        <Link href={`/view/${props.row.original.domain}`}>
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
  const table = useReactTable({
    data: domains,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination :{
        pageSize: 10
      }
    }
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