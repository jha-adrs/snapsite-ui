"use client"
import { cn } from '@/lib/utils';
import React from 'react';
import { Input } from './ui/input';
import { link_tags as availableTags } from '@/config/constants';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface TagInputProps {
    className?: string;
}

export const TagInput = ({ className }: TagInputProps) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    {
                        availableTags.map((tag, index) => {
                            return (
                                <SelectItem key={index} value={tag}>{tag}</SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}