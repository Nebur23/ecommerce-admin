import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// patch *********************************************************************************
//********************************************************************************** */
export async function PATCH(
    req: Request,
    { params } : { params : { storeId: string}}
) {
    try {
        const authData = auth()
        const  userId    =  authData.userId as string
        const body = await req.json()
        const { name } = body

        if(!userId)  new NextResponse("Unauthenticated", { status: 401})
        if(!name) new NextResponse("Name is required", { status: 400})
        if(!params.storeId) new NextResponse("Store is required", { status: 400})

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
           
        })

        return NextResponse.json(store)
        
    } catch (error) {
        console.log('[STORE_PATCH]',error);
        return new NextResponse("Internal error", {status: 500})
        
    }
}

// patch *********************************************************************************
//********************************************************************************** */


export async function DELETE(
    req: Request,
    { params } : { params : { storeId: string}}
) {
    try {
        const authData = auth()
        const  userId    =  authData.userId as string
        

        if(!userId)  new NextResponse("Unauthenticated", { status: 401})
        if(!params.storeId) new NextResponse("Store is required", { status: 400})

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            },
           
           
        })

        return NextResponse.json(store)
        
    } catch (error) {
        console.log('[STORE_DELETE]',error);
        return new NextResponse("Internal error", {status: 500})
        
    }
}