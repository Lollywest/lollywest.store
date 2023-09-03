"use server"

import { db } from "@/db"
import { wallets, products, orders } from "@/db/schema"
import {
    and,
    eq,
    inArray,
} from "drizzle-orm"
import { currentUser } from "@clerk/nextjs"
import { clerkClient } from "@clerk/nextjs"
import { catchClerkError } from "@/lib/utils"

export async function getProductsAction(input?: { category?: string }) {
    if (input && input.category && input.category !== "deck" && input.category !== "wrap" && input.category !== "sponsorship") {
        throw new Error("Invalid category: must be 'deck | wrap | sponsorship'")
    }

    const user = await currentUser()

    if(!user) {
        throw new Error("Could not find user")
    }

    const ids = await db.query.orders.findMany({
        where: eq(orders.userId, user.id)
    })

    const arr = []
    for(const item of ids) {
        for(const row of item.products!) {
            arr.push(row.id)
        }
    }

    const items = await db.query.products.findMany({
        where: inArray(products.id, arr)
    })

    return items

    // if (input && input.category && input.category !== "deck" && input.category !== "wrap" && input.category !== "sponsorship") {
    //     throw new Error("Invalid category: must be 'deck | wrap | sponsorship'")
    // }

    // const user = await currentUser()

    // if (!user) {
    //     throw new Error("Could not get user")
    // }

    // let wallet = await db.query.wallets.findFirst({
    //     where: eq(wallets.userID, user.id)
    // })

    // if (!wallet) {
    //     await db.insert(wallets).values({
    //         userID: user.id,
    //         products: [],
    //         orders: []
    //     })

    //     wallet = await db.query.wallets.findFirst({
    //         where: eq(wallets.userID, user.id)
    //     })
    // }
    // if (!wallet!.products || !wallet!.products.length) {
    //     return []
    // }

    // const { items } = await db.transaction(async (tx) => {
    //     const items = await tx
    //         .select()
    //         .from(products)
    //         .where(and(inArray(products.id, wallet!.products!),
    //             input?.category ? eq(products.category, input.category as "deck" | "wrap" | "sponsorship") : undefined
    //         ))

    //     return { items }
    // })

    // return items
}

export async function addProductToWalletAction(input: { productID: number }) {
    // users
    const user = await currentUser()

    if (!user) {
        throw new Error("Could not get user")
    }

    // wallets
    const wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userID, user.id)
    })

    if (!wallet) {
        // Add new wallet? =================================
        throw new Error("Could not find wallet")
    }

    if (!wallet.products) {
        wallet.products = [input.productID]
    } else {
        wallet.products.push(input.productID)
    }

    // products

    const product = await db.query.products.findFirst({
        where: eq(products.id, input.productID)
    })

    if (!product) {
        throw new Error("Product not found")
    }

    if (!product.owners) {
        product.owners = [user.id]
    } else {
        product.owners.push(user.id)
    }

    if (product.category == "deck") {
        if (product.decksLeft > 0) {
            product.decksLeft--
        } else {
            throw new Error("No decks left")
        }
    }

    // update db
    await db.update(wallets).set(wallet).where(eq(wallets.userID, user.id))
    await db.update(products).set(product).where(eq(products.id, input.productID))

    // Revalidate Path ==================================
}

export async function deleteProductFromWalletAction(input: { productID: number }) {
    const user = await currentUser()

    if (!user) {
        throw new Error("Could not get user")
    }

    const wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userID, user.id)
    })

    if (!wallet) {
        throw new Error("Could not find wallet")
    }

    if (!wallet.products) {
        wallet.products = []
    } else {
        const idx = wallet.products.indexOf(input.productID)
        if (idx > -1) {
            wallet.products.splice(idx, 1)
        }
    }

    await db.update(wallets).set(wallet).where(eq(wallets.userID, user.id))
}

export async function updateUsernameAction(input: {
    username: string,
    firstName: string,
    lastName: string,
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

    try {
        await clerkClient.users.updateUser(curuser.id, input)
    } catch (err) {
        catchClerkError(err)
    }
}

export async function checkUsernameAction() {
    const user = await currentUser()

    if(!user) {
        return("/signin")
    }

    if(!user.username) {
        return("/username")
    }

    return("/")
}