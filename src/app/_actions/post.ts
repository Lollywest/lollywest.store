"use server"

import { db } from "@/db"
import { eq, and, desc, between, gte } from "drizzle-orm"
import { posts, artists, reports } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"
import type { StoredFile } from "@/types"

// Adds an artist post
// input: artistId of the page
//        title - string of the title of the post
//        message - string of the body of the post
//        images - storedFile[] if images are being added, otherwise null
//        isEvent - true if post is an event, false otherwise. If true, event time can't be null
//        eventTime - Date object of the event date and time if post is an event, otherwise null
// returns: void
export async function addArtistPostAction(input: {
    artistId: number,
    title: string,
    message: string,
    images: StoredFile[] | null,
    isEvent: boolean,
    eventTime: Date | null,
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("User not found")
    }

    const artist = await db.query.artists.findFirst({
        where: eq(artists.userId, user.id)
    })
    if (!artist) {
        throw new Error("User is not an artist")
    } else if (artist.id != input.artistId) {
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

// Adds a community post
// input: artistId of the page
//        title - string of the title of the post
//        message - string of the body of the post
//        images - storedFile[] if images are being added, otherwise null
// returns: void
export async function addCommunityPostAction(input: {
    artistId: number,
    title: string,
    message: string,
    images: StoredFile[] | null,
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("user not found")
    }

    const post = {
        user: user.id,
        isArtist: false,
        artistId: input.artistId,
        title: input.title,
        message: input.message,
        images: input.images,
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
    if (input.report) {
        const post = await db.query.posts.findFirst({
            where: eq(posts.id, input.postId)
        })
        if (!post) {
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
    if (!user) {
        throw new Error("user not found")
    }

    const post = await db.query.posts.findFirst({
        where: eq(posts.id, input.postId)
    })

    if (!post) {
        throw new Error("post not found")
    }

    if (!post.likers) {
        post.likers = [user.id]
    } else {
        post.likers.push(user.id)
    }

    post.numLikes = post.numLikes + 1

    await db.update(posts).set(post).where(eq(posts.id, post.id))
}

// unlike a post for the current user
// input: postId of the post
// returns: void
export async function removeLikePostAction(input: {
    postId: number
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("user not found")
    }

    const post = await db.query.posts.findFirst({
        where: eq(posts.id, input.postId)
    })

    if (!post) {
        throw new Error("post not found")
    }
    if (!post.likers) { return }

    const idx = post.likers.indexOf(user.id)
    if (idx > -1) {
        post.likers.splice(idx, 1)
    } else { return }

    post.numLikes = post.numLikes - 1

    await db.update(posts).set(post).where(eq(posts.id, post.id))
}

export async function hasUserLikedPost(postId: number): Promise<boolean> {
    const user = await currentUser();
    if (!user) return false;

    const post = await db.query.posts.findFirst({
        where: eq(posts.id, postId)
    });

    if (!post || !post.likers) return false;
    return post.likers.includes(user.id);
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

    if (!items) {
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
        where: eq(posts.artistId, input.artistId),
        orderBy: [desc(posts.createdAt)],
        limit: input.limit ? input.limit : undefined,
        offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    })

    if (!items) {
        return []
    }

    return items
}

// get every post marked as an event
// input: the artistId of the page
// returns: Post[]
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

// gets every event on a certain day
// input: artistId of the page
//        Date object for the day in question
// returns: Post[]
export async function getEventsOnDayAction(input: {
    artistId: number,
    date: Date,
}) {
    const start = new Date(input.date.valueOf())
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)
    const end = new Date(input.date.valueOf())
    end.setHours(23)
    end.setMinutes(59)
    end.setSeconds(59)
    end.setMilliseconds(999)

    const items = await db.query.posts.findMany({
        where: and(eq(posts.artistId, input.artistId), and(eq(posts.isEvent, true), between(posts.eventTime, start, end)))
    })

    return items
}

// for the get top post action
enum TimeFrame {
    "d",
    "w",
    "m",
    "y",
    "a"
}

// get the top posts from a certain time frame
// input: artistId of the page
//        timeFrame - one of the options in the enum above corresponding to the desired time frame
//        (optional) artistPosts - true if you only want artist posts, false if you only want community posts, undefined for both
//  returns: Post[]
export async function getTopPostsAction(input: {
    artistId: number,
    timeFrame: TimeFrame,
    artistPosts?: boolean,
    limit?: number,
    page?: number,
}) {
    const millisecondsPerDay = 86400000

    const start = new Date()
    switch (input.timeFrame) {
        case 0:
            start.setTime(start.getTime() - millisecondsPerDay)
        case 1:
            start.setTime(start.getTime() - (millisecondsPerDay * 7))
        case 2:
            start.setTime(start.getTime() - (millisecondsPerDay * 30))
        case 3:
            start.setTime(start.getTime() - (millisecondsPerDay * 365))
        case 4:
            start.setFullYear(2022)
    }

    if (input.artistPosts !== undefined) {
        const items = await db.query.posts.findMany({
            where: and(eq(posts.artistId, input.artistId), and(eq(posts.isArtist, input.artistPosts), gte(posts.createdAt, start))),
            orderBy: desc(posts.numLikes),
            limit: input.limit ? input.limit : undefined,
            offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
        })

        return items
    }

    const items = await db.query.posts.findMany({
        where: and(eq(posts.artistId, input.artistId), gte(posts.createdAt, start)),
        orderBy: desc(posts.numLikes),
        limit: input.limit ? input.limit : undefined,
        offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    })

    return items
}