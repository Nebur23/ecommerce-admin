import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
) {
    try {
        const authData = auth()
        const  userId    =  authData.userId as string
        const body = await req.json()
        const { name } = body
        if(!userId) new NextResponse("Unauthorized", { status: 401})
        if(!name) new NextResponse("Name is required", { status: 400})

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal error", {status: 500})
    }
}