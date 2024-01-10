"use client"
import React from 'react';

import { signOut } from 'next-auth/react';

import { LogOutIcon } from 'lucide-react';
interface LogoutProps {

}

export const Logout = ({ }: LogoutProps) => {
    const handleLogout = () => {
        signOut()
    }
    return (
        <div className='flex w-full justify-between items-center'>
            <p>Logout</p>
            <LogOutIcon className='w-4 h-4' />
        </div>
    )
}