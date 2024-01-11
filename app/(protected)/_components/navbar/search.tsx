"use client"
import { Input } from '@/components/ui/input';
import React from 'react';

interface SearchProps {

}

export const Search = ({ }: SearchProps) => {
    return (
        <div>
            <Input type='search'
                placeholder='Search'
                className='md:w-64 w-48' />
        </div>
    )
}