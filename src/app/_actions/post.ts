"use server"

import { db } from "@/db"
import { eq, and, desc } from "drizzle-orm"
import { posts, artists, reports } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"
import type { StoredFile } from "@/types"

export async function addArtistPostAction(input: {
    artistId: number,
    title: string,
    message: string,
    images: StoredFile[] | null,
    isEvent: boolean,
    eventTime: Date | null,
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
    } else if(artist.id != input.artistId) {
        throw new Error("user is not this page's artist")
    }

    const post = {
        user: user.id,
        isArtist: true,
        artistId: input.artistId,
        title: input.title,
        message: input.message,
        images: input.images,
        likers: null,
        numComments: 0,
        isEvent: input.isEvent,
        eventTime: input.eventTime ? input.eventTime : undefined
    }

    await db.insert(posts).values(post)
}

export async function addCommunityPostAction(input : {
    artistId: number,
    title: string,
    message: string,
    images: StoredFile[] | null,
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const post = {
        user: user.id,
        isArtist: false,
        artistId: input.artistId,
        title: input.title,
        message: input.message,
        images: null,
        likers: null,
        numComments: 0,
        isEvent: false,
    }

    await db.insert(posts).values(post)
}

// delete a post and optionally report it
//input: id of the post
//       optionally set report to true if you want to report the post
// returns: void
export async function deletePostAction(input: {
    postId: number,
    report?: boolean
}) {
    if(input.report) {
        const post = await db.query.posts.findFirst({
            where: eq(posts.id, input.postId)
        })
        if(!post) {
            throw new Error("post not found")
        }

        await db.insert(reports).values({
            user: post.user,
            title: post.title,
            message: post.message,
            artistId: post.artistId
        })
    }
    await db.delete(posts).where(eq(posts.id, input.postId))
}

// like a post for the current user
// input: id of the post
// returns: void
export async function likePostAction(input: {
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

    if(!post.likers) {
        post.likers = [ user.id ]
    } else {
        post.likers.push(user.id)
    }

    await db.update(posts).set(post).where(eq(posts.id, post.id))
}

// get all of an artists posts ordered by when they were posted
// input: the artistId of the page
// returns: Post[]
export async function getArtistPostsAction(input: {
    artistId: number,
    limit?: number,
    page?: number
}) {
    const items = await db.query.posts.findMany({
        where: and(eq(posts.artistId, input.artistId), eq(posts.isArtist, true)),
        orderBy: [desc(posts.createdAt)],
        limit: input.limit ? input.limit : undefined,
        offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    })

    if(!items) {
        return []
    }

    return items
}

// get all of the community posts from an artist page ordered by when they were posted
// input: the artistId of the page
// returns: Post[]
export async function getCommunityPostsAction(input: {
    artistId: number,
    limit?: number,
    page?: number
}) {
    const items = await db.query.posts.findMany({
        where: and(eq(posts.artistId, input.artistId), eq(posts.isArtist, false)),
        orderBy: [desc(posts.createdAt)],
        limit: input.limit ? input.limit : undefined,
        offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    })

    if(!items) {
        return []
    }

    return items
}

export async function getEventsAction(input: {
    artistId: number,
    limit?: number,
    page?: number
}) {
    const items = await db.query.posts.findMany({
        where: and(eq(posts.artistId, input.artistId), eq(posts.isEvent, true)),
        orderBy: [desc(posts.createdAt)],
        limit: input.limit ? input.limit : undefined,
        offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    })

    return items
}