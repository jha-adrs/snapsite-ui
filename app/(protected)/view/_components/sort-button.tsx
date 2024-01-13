"use client"
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SortOrderType, useDomainSortOrder } from "@/store/sort-order"
import { LucideArrowBigUpDash } from "lucide-react"
export function SortButton() {
    const { sortOrder, setSortOrder } = useDomainSortOrder((state) => state)
    return (
        <Select value={sortOrder} 
        onValueChange={(value) => setSortOrder(value as SortOrderType)}
        >
            <SelectTrigger className="w-fit items-center">
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sort order</SelectLabel>
                    <SelectItem value={SortOrderType.Newest}>Newest</SelectItem>
                    <SelectItem value={SortOrderType.Oldest}>Oldest</SelectItem>
                    <SelectItem value={SortOrderType.AtoZ}>A to Z</SelectItem>
                    <SelectItem value={SortOrderType.ZtoA}>Z to A</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
