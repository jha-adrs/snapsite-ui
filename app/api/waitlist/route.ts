import { postSlack } from "@/actions/post-slack";
import { NextRequest } from "next/server";
import { z } from "zod";
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const validatorsSchema = z.object({
            email: z.string().email(),
        });
        const { email } = validatorsSchema.parse(body);
        await postSlack(`New email added to waitlist: ${email}`);
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Bad Request", { status: 400 });
    }
}