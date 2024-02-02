"use client"
import React from 'react';
import QRCode from 'react-qr-code';
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface QRCodeDialogProps {
    value: string;
    children: React.ReactNode;
}

export const QRCodeDialog = ({ value, children }: QRCodeDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Copy the link or scan the QR code to share it with others
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 flex-col">
                    <div className='m-2 w-64 h-64 p-2 bg-white' >
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={value}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <div className='flex flex-row w-full gap-2'>
                        <div className="grid flex-1 flex-row gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={value}
                                readOnly
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3">
                            <span className="sr-only">Copy</span>
                            <CopyIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}