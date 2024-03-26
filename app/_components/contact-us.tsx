"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";

export function ContactUs() {
    const [email, setEmail] = useState("");
    const emailValidator = (email: string) => {
        const emailSchema = z.string().email();
        try {
            emailSchema.parse(email);
            return true;
        } catch (e) {
            return false;
        }
    };

    const {mutate:handleSubmit, isPending} = useMutation({
        mutationFn: async () => {
            if (!emailValidator(email)) {
                return toast.error("Invalid email address");
            }
            else {
                // send email to backend
                const res = await axios.post("/api/waitlist", {email});
                if (res.status === 200) {
                    toast.success("Email added to waitlist");
                } else {
                    toast.error("Error adding email to waitlist");
                }
            }
        }
    });

    return (
        <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-2xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                    Join the waitlist
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Welcome to Snapsite, the newest web archiving tool.
                    We provide reliable, scalable, and exportable solutions for
                    your web archiving and website history tracking.
                </p>
                <div className="flex flex-row items-center py-4  space-x-2">
                    <Input
                        type="text"
                        placeholder="Your email address"
                        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10  bg-neutral-950 placeholder:text-neutral-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant={"white"} size={"sm"}
                        onClick={() => handleSubmit()
                        }
                        className="z-10"
                        disabled={isPending}
                    >
                        {isPending ? <Loader className="w-4 h-4 animate-spin"/> : "Submit"}
                    </Button>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}

export default ContactUs;