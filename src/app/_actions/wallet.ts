"use server"

import { db } from "@/db"
import { wallets, products, orders, userStats, artists, type Artist } from "@/db/schema"
import {
    eq,
    inArray,
} from "drizzle-orm"
import { currentUser } from "@clerk/nextjs"
import { clerkClient } from "@clerk/nextjs"
import { catchClerkError } from "@/lib/utils"
import { StoredFile } from "@/types"

export async function getProductsAction(input?: { category?: string }) {
    if (input && input.category && input.category !== "deck" && input.category !== "wrap" && input.category !== "sponsorship") {
        throw new Error("Invalid category: must be 'deck | wrap | sponsorship'")
    }

    const user = await currentUser()

    if(!user) {
        throw new Error("Could not find user")
    }

    const userOrders = await db.query.orders.findMany({
        where: eq(orders.userId, user.id)
    })

    const arr = []
    for(const order of userOrders) {
        if(order.products) {
            for(const row of order.products!) {
                arr.push(row.id)
            }
        }
    }

    if(!arr.length) {
        return []
    }

    const items = await db.query.products.findMany({
        where: inArray(products.id, arr)
    })

    if(!items) {
        return []
    }

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

    const userInfo = await db.query.userStats.findFirst({
        where: eq(userStats.userId, curuser.id)
    })

    if(!userInfo) {
        const newUserInfo = {
            userId: curuser.id,
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            image: curuser.imageUrl,
        }

        await db.insert(userStats).values(newUserInfo)

        return
    }

    userInfo.username = input.username
    userInfo.firstName = input.firstName
    userInfo.lastName = input.lastName
    userInfo.image = curuser.imageUrl
    userInfo.updatedAt = new Date()

    await db.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
}

export async function checkUsernameAction() {
    const user = await currentUser()

    if(!user) {
        return(false)
    }

    const userInfo = await db.query.userStats.findFirst({
        where: eq(userStats.userId, user.id)
    })

    if(!userInfo || !userInfo.username) {
        return(false)
    }

    return(true)
}

export async function getUserHubsAction() {
    const user = await currentUser()
    if (!user) {
        throw new Error("user not found")
    }

    const items = await db.transaction(async (tx) => {
        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, user.id)
        })

        if (!userInfo || !userInfo.hubsJoined) {
            return null
        }

        const hubs = userInfo.hubsJoined.map(a => a.artistId)

        const items = await tx.query.artists.findMany({
            where: inArray(artists.id, hubs)
        })

        return items
    })

    return items
}

export async function checkUserJoined(input: {
    artistId: number
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, input.artistId)
    })
    if(!artist) {
        throw new Error("artist not found")
    }

    return (artist.hubMembers !== null && artist.hubMembers.indexOf(user.id) > -1)
}

export async function checkUserPremium(input: {
    artistId: number
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, input.artistId)
    })
    if(!artist) {
        throw new Error("artist not found")
    }

    return (artist.premiumHubMembers !== null && artist.premiumHubMembers.indexOf(user.id) > -1)
}

export async function checkUserArtist(input: {
    artistId: number
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, input.artistId)
    })
    if(!artist) {
        throw new Error("artist not found")
    }

    return (artist.userId == user.id)
}

// this one is most efficent so preferably use this one instead of all three of the previous ones
export async function checkUserPrivileges(input: {
    artistId: number
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, input.artistId)
    })
    if(!artist) {
        throw new Error("artist not found")
    }

    return ({
        joined: (artist.hubMembers !== null && artist.hubMembers.indexOf(user.id) > -1),
        premium: (artist.premiumHubMembers !== null && artist.premiumHubMembers.indexOf(user.id) > -1),
        artist: (artist.userId === user.id),
    })
}

export async function updateArtistAction(input: {
    artist: Artist,
}) {
    await db.update(artists).set(input.artist).where(eq(artists.id, input.artist.id))
}