"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { wallets, products} from "@/db/schema"
import {
  and,
  eq,
  inArray,
} from "drizzle-orm"
import { currentUser } from "@clerk/nextjs"

export async function getProductsAction( input: {category?: string} ) {
    if(input.category !== "deck" && input.category !== "wrap" && input.category !== "sponsorship") {
        throw new Error("Invalid category: must be 'deck | wrap | sponsorship'")
    }

    const user = await currentUser()

    if(!user) {
        throw new Error("Could not get user")
    }

    const wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userID, user.id)
    })

    if(!wallet) {
        throw new Error("Could not find wallet")
    }
    if(!wallet.products) {
        return []
    }

    const { items } = await db.transaction(async (tx) => {
        const items = await tx
            .select()
            .from(products)
            .where( and( inArray(products.id, wallet.products!),
                input?.category ? eq(products.category, input.category as "deck" | "wrap" | "sponsorship") : undefined 
            ) )
        
        return { items }
    })

    return items
}

export async function addProductToWalletAction(input: { productID: number}) {
    const user = await currentUser()

    if(!user) {
        throw new Error("Could not get user")
    }

    const wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userID, user.id)
    })

    if(!wallet) {
        // Add new wallet? =================================
        throw new Error("Could not find wallet")
    }

    let arr: number[]
    if(!wallet.products) {
        arr = [ input.productID ]
    } else {
        arr = wallet.products
        arr.push(input.productID)
    }

    await db.update(wallets).set( {
        id: wallet.id,
        userID: wallet.userID,
        products: arr,
        orders: wallet.orders
    } ).where(eq(wallets.userID, user.id))

    // Revalidate Path ==================================
}

export async function deleteProductFromWalletAction(input: { productID: number}) {
    const user = await currentUser()

    if(!user) {
        throw new Error("Could not get user")
    }

    const wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userID, user.id)
    })

    if(!wallet) {
        throw new Error("Could not find wallet")
    }

    let arr: number[]
    if(!wallet.products) {
        arr = []
    } else {
        arr = wallet.products
    }

    const idx = arr.indexOf(input.productID)
    if(idx > -1) {
        arr.splice(idx, 1)
    }

    await db.update(wallets).set( {
        id: wallet.id,
        userID: wallet.userID,
        products: arr,
        orders: wallet.orders
    } ).where(eq(wallets.userID, user.id))
}