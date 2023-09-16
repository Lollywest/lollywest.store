"use server"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { posts, artists } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"

export async function addPostAction(input: {
    productId: number,
    title: string,
    message: string,
    eventTime: Date,
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("User not found")
    }

    const artist = await db.query.artists.findFirst({
        where: eq(artists.userId, user.id)
    })
    if(!artist) {
        throw new Error("User is not an artist")
    }

    const post = {
        productId: input.productId,
        artistId: artist.id,
        title: input.title,
        message: input.message,
        users: null,
        eventTime: input.eventTime
    }

    await db.insert(posts).values(post)
}

export async function deletePost(input: {
    postId: number
}) {
    await db.delete(posts).where(eq(posts.id, input.postId))
}

export async function likePost(input: {
    postId: number
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const post = await db.query.posts.findFirst({
        where: eq(posts.id, input.postId)
    })

    if(!post) {
        throw new Error("post not found")
    }

    if(!post.users) {
        post.users = [ user.id ]
    } else {
        post.users.push(user.id)
    }

    await db.update(posts).set(post).where(eq(posts.id, post.id))
}

export async function getPosts(input: {
    productId: number
}) {
    const items = await db.query.posts.findMany({
        where: eq(posts.productId, input.productId)
    })

    if(!items) {
        return []
    }

    return items
}