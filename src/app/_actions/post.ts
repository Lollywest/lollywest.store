"use server"

import { db } from "@/db"
import { eq, and, desc, between, gte } from "drizzle-orm"
import { posts, artists, reports, userStats } from "@/db/schema"
import { clerkClient, currentUser } from "@clerk/nextjs"
import type { StoredFile } from "@/types"

// how to weigh various things when calculating a users points
const joinsWeight = 100
const likesWeight = 1
const postsWeight = 10
const commentsWeight = 5

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
    isPremium: boolean,
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("User not found")
    }

    const { artist, userInfo } = await db.transaction(async (tx) => {
        const artist = await tx.query.artists.findFirst({
            where: eq(artists.userId, user.id)
        })

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, user.id)
        })

        return {
            artist,
            userInfo,
        }
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
        eventTime: input.eventTime ? input.eventTime : undefined,
        isPremium: input.isPremium,
    }

    if (!userInfo) {
        const newUserInfo = {
            userId: user.id,
            numPosts: 1
        }

        await db.transaction(async (tx) => {
            await tx.insert(posts).values(post)
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numPosts = userInfo.numPosts + 1

    await db.transaction(async (tx) => {
        await tx.insert(posts).values(post)
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })
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

    const userInfo = await db.query.userStats.findFirst({
        where: eq(userStats.userId, user.id)
    })

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

    if (!userInfo) {
        const newUserInfo = {
            userId: user.id,
            numPosts: 1
        }

        await db.transaction(async (tx) => {
            await tx.insert(posts).values(post)
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numPosts = userInfo.numPosts + 1

    await db.transaction(async (tx) => {
        await tx.insert(posts).values(post)
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })
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

        await db.transaction(async (tx) => {
            await tx.insert(reports).values({
                user: post.user,
                title: post.title,
                message: post.message,
                artistId: post.artistId
            })
            await tx.delete(posts).where(eq(posts.id, input.postId))
        })

        return
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

    const { post, userInfo } = await db.transaction(async (tx) => {
        const post = await tx.query.posts.findFirst({
            where: eq(posts.id, input.postId)
        })

        if (!post) {
            throw new Error("post not found")
        }

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, post.user)
        })

        return {
            post,
            userInfo,
        }
    })

    if (!post.likers) {
        post.likers = [user.id]
    } else {
        post.likers.push(user.id)
    }

    post.numLikes = post.numLikes + 1

    if (!userInfo) {
        const newUserInfo = {
            userId: post.user,
            numLikes: 1
        }

        await db.transaction(async (tx) => {
            await tx.update(posts).set(post).where(eq(posts.id, post.id))
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numLikes = userInfo.numLikes + 1

    await db.transaction(async (tx) => {
        await tx.update(posts).set(post).where(eq(posts.id, post.id))
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })
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

    const { post, userInfo } = await db.transaction(async (tx) => {
        const post = await tx.query.posts.findFirst({
            where: eq(posts.id, input.postId)
        })

        if (!post) {
            throw new Error("post not found")
        }

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, post.user)
        })

        return {
            post,
            userInfo,
        }
    })

    if (!post.likers) { return }

    const idx = post.likers.indexOf(user.id)
    if (idx > -1) {
        post.likers.splice(idx, 1)
    } else { return }

    post.numLikes = post.numLikes - 1

    if (!userInfo) {
        const newUserInfo = {
            userId: post.user,
            numLikes: 0
        }

        await db.transaction(async (tx) => {
            await tx.update(posts).set(post).where(eq(posts.id, post.id))
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numLikes = userInfo.numLikes - 1

    await db.transaction(async (tx) => {
        await tx.update(posts).set(post).where(eq(posts.id, post.id))
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })
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
// returns: an array where each element has all the attributes of a post +
//              - points: int corresponding to the users points
//              - username: string of the users username
//              - image: url of the users profile image
export async function getArtistPostsAction(input: {
    artistId: number,
    limit?: number,
    page?: number
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

    const items = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: posts.id,
                user: posts.user,
                isArtist: posts.isArtist,
                artistId: posts.artistId,
                title: posts.title,
                message: posts.message,
                images: posts.images,
                likers: posts.likers,
                numLikes: posts.numLikes,
                numComments: posts.numComments,
                isEvent: posts.isEvent,
                eventTime: posts.eventTime,
                isPremium: posts.isPremium,
                createdAt: posts.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt,
            })
            .from(posts)
            .leftJoin(userStats, eq(userStats.userId, posts.user))
            .where(and(eq(posts.artistId, input.artistId), eq(posts.isArtist, true)))
            .orderBy(desc(posts.createdAt))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)
        return items
    })

    // const items = await db.query.posts.findMany({
    //     where: and(eq(posts.artistId, input.artistId), eq(posts.isArtist, true)),
    //     orderBy: [desc(posts.createdAt)],
    //     limit: input.limit ? input.limit : undefined,
    //     offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    // })
    const weekAgo = new Date()
    weekAgo.setTime(weekAgo.getTime() - (86400000 * 7))
    const now = new Date()

    const result = []
    for (const item of items) {
        if (item.updatedAt && item.updatedAt.getTime() < weekAgo.getTime()) {
            const user = await clerkClient.users.getUser(item.user)

            if (item.image != user?.imageUrl) {
                await db.update(userStats).set({ image: user.imageUrl, updatedAt: now }).where(eq(userStats.userId, user.id))
            } else {
                await db.update(userStats).set({ updatedAt: now }).where(eq(userStats.userId, user.id))
            }
        }

        item.userHubsJoined = item.userHubsJoined ?? []
        item.userNumPosts = item.userNumPosts ?? 0
        item.userNumComments = item.userNumComments ?? 0
        item.userNumLikes = item.userNumLikes ?? 0

        const info = {
            id: item.id,
            user: item.user,
            isArtist: item.isArtist,
            artistId: item.artistId,
            title: item.title,
            message: item.message,
            images: item.images,
            likers: item.likers,
            numLikes: item.numLikes,
            numComments: item.numComments,
            isEvent: item.isEvent,
            eventTime: item.eventTime,
            isPremium: item.isPremium,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.username ? item.username : "[deleted]",
            image: item.image ? item.image : "/images/product-placeholder.webp",
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1,
            userIsPremium: item.userPremiumHubs !== null && item.userPremiumHubs.map(a => a.artistId).indexOf(item.artistId) > -1
        }

        result.push(info)
    }

    return result
}

// get all of the community posts from an artist page ordered by when they were posted
// input: the artistId of the page
// returns: an array where each element has all the attributes of a post +
//              - points: int corresponding to the users points
//              - username: string of the users username
//              - image: url of the users profile image
export async function getCommunityPostsAction(input: {
    artistId: number,
    limit?: number,
    page?: number
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

    const items = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: posts.id,
                user: posts.user,
                isArtist: posts.isArtist,
                artistId: posts.artistId,
                title: posts.title,
                message: posts.message,
                images: posts.images,
                likers: posts.likers,
                numLikes: posts.numLikes,
                numComments: posts.numComments,
                isEvent: posts.isEvent,
                eventTime: posts.eventTime,
                isPremium: posts.isPremium,
                createdAt: posts.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt
            })
            .from(posts)
            .leftJoin(userStats, eq(userStats.userId, posts.user))
            .where(eq(posts.artistId, input.artistId))
            .orderBy(desc(posts.createdAt))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)
        return items
    })

    const weekAgo = new Date()
    weekAgo.setTime(weekAgo.getTime() - (86400000 * 7))
    const now = new Date()

    const result = []
    for (const item of items) {
        if (item.updatedAt && item.updatedAt.getTime() < weekAgo.getTime()) {
            const user = await clerkClient.users.getUser(item.user)

            if (item.image != user?.imageUrl) {
                await db.update(userStats).set({ image: user.imageUrl, updatedAt: now }).where(eq(userStats.userId, user.id))
            } else {
                await db.update(userStats).set({ updatedAt: now }).where(eq(userStats.userId, user.id))
            }
        }

        item.userHubsJoined = item.userHubsJoined ?? []
        item.userNumPosts = item.userNumPosts ?? 0
        item.userNumComments = item.userNumComments ?? 0
        item.userNumLikes = item.userNumLikes ?? 0

        const info = {
            id: item.id,
            user: item.user,
            isArtist: item.isArtist,
            artistId: item.artistId,
            title: item.title,
            message: item.message,
            images: item.images,
            likers: item.likers,
            numLikes: item.numLikes,
            numComments: item.numComments,
            isEvent: item.isEvent,
            eventTime: item.eventTime,
            isPremium: item.isPremium,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.username ? item.username : "[deleted]",
            image: item.image ? item.image : "/images/product-placeholder.webp",
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1

        }

        result.push(info)
    }

    return result
}

export async function getCommunityPostAction(input: {
    // artistId: number,
    postId: number,
    limit?: number,
    page?: number
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

    const items = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: posts.id,
                user: posts.user,
                isArtist: posts.isArtist,
                artistId: posts.artistId,
                title: posts.title,
                message: posts.message,
                images: posts.images,
                likers: posts.likers,
                numLikes: posts.numLikes,
                numComments: posts.numComments,
                isEvent: posts.isEvent,
                eventTime: posts.eventTime,
                isPremium: posts.isPremium,
                createdAt: posts.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt,
            })
            .from(posts)
            .leftJoin(userStats, eq(userStats.userId, posts.user))
            // .where(and(eq(posts.artistId, input.artistId), eq(posts.id, input.postId)))
            .where(eq(posts.id, input.postId))
            .orderBy(desc(posts.createdAt))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)
        return items
    })

    const weekAgo = new Date()
    weekAgo.setTime(weekAgo.getTime() - (86400000 * 7))
    const now = new Date()

    const result = []
    for (const item of items) {
        if (item.updatedAt && item.updatedAt.getTime() < weekAgo.getTime()) {
            const user = await clerkClient.users.getUser(item.user)

            if (item.image != user?.imageUrl) {
                await db.update(userStats).set({ image: user.imageUrl, updatedAt: now }).where(eq(userStats.userId, user.id))
            } else {
                await db.update(userStats).set({ updatedAt: now }).where(eq(userStats.userId, user.id))
            }
        }

        item.userHubsJoined = item.userHubsJoined ?? []
        item.userNumPosts = item.userNumPosts ?? 0
        item.userNumComments = item.userNumComments ?? 0
        item.userNumLikes = item.userNumLikes ?? 0

        const info = {
            id: item.id,
            user: item.user,
            isArtist: item.isArtist,
            artistId: item.artistId,
            title: item.title,
            message: item.message,
            images: item.images,
            likers: item.likers,
            numLikes: item.numLikes,
            numComments: item.numComments,
            isEvent: item.isEvent,
            eventTime: item.eventTime,
            isPremium: item.isPremium,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.username ? item.username : "[deleted]",
            image: item.image ? item.image : "/images/product-placeholder.webp",
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1,
            userIsPremium: item.userPremiumHubs !== null && item.userPremiumHubs.map(a => a.artistId).indexOf(item.artistId) > -1
        }

        result.push(info)
    }

    return result
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
// returns: an array where each element has all the attributes of a post +
//              - points: int corresponding to the users points
//              - username: string of the users username
//              - image: url of the users profile image
export async function getTopPostsAction(input: {
    artistId: number,
    timeFrame: TimeFrame,
    artistPosts?: boolean,
    limit?: number,
    page?: number,
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

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

    const items = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: posts.id,
                user: posts.user,
                isArtist: posts.isArtist,
                artistId: posts.artistId,
                title: posts.title,
                message: posts.message,
                images: posts.images,
                likers: posts.likers,
                numLikes: posts.numLikes,
                numComments: posts.numComments,
                isEvent: posts.isEvent,
                eventTime: posts.eventTime,
                isPremium: posts.isPremium,
                createdAt: posts.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt
            })
            .from(posts)
            .leftJoin(userStats, eq(userStats.userId, posts.user))
            .where(and(eq(posts.artistId, input.artistId), and((input.artistPosts !== undefined ? eq(posts.isArtist, input.artistPosts) : undefined), gte(posts.createdAt, start))))
            .orderBy(desc(posts.numLikes))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)
        return items
    })

    const weekAgo = new Date()
    weekAgo.setTime(weekAgo.getTime() - (86400000 * 7))
    const now = new Date()

    const result = []
    for (const item of items) {
        if (item.updatedAt && item.updatedAt.getTime() < weekAgo.getTime()) {
            const user = await clerkClient.users.getUser(item.user)

            if (item.image != user?.imageUrl) {
                await db.update(userStats).set({ image: user.imageUrl, updatedAt: now }).where(eq(userStats.userId, user.id))
            } else {
                await db.update(userStats).set({ updatedAt: now }).where(eq(userStats.userId, user.id))
            }
        }

        item.userHubsJoined = item.userHubsJoined ?? []
        item.userNumPosts = item.userNumPosts ?? 0
        item.userNumComments = item.userNumComments ?? 0
        item.userNumLikes = item.userNumLikes ?? 0

        const info = {
            id: item.id,
            user: item.user,
            isArtist: item.isArtist,
            artistId: item.artistId,
            title: item.title,
            message: item.message,
            images: item.images,
            likers: item.likers,
            numLikes: item.numLikes,
            numComments: item.numComments,
            isEvent: item.isEvent,
            eventTime: item.eventTime,
            isPremium: item.isPremium,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.username ? item.username : "[deleted]",
            image: item.image ? item.image : "/images/product-placeholder.webp",
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1,
            userIsPremium: item.userPremiumHubs !== null && item.userPremiumHubs.map(a => a.artistId).indexOf(item.artistId) > -1
        }

        result.push(info)
    }

    return result

    // if (input.artistPosts !== undefined) {
    //     const items = await db.query.posts.findMany({
    //         where: and(eq(posts.artistId, input.artistId), and(eq(posts.isArtist, input.artistPosts), gte(posts.createdAt, start))),
    //         orderBy: desc(posts.numLikes),
    //         limit: input.limit ? input.limit : undefined,
    //         offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    //     })

    //     return items
    // }

    // const items = await db.query.posts.findMany({
    //     where: and(eq(posts.artistId, input.artistId), gte(posts.createdAt, start)),
    //     orderBy: desc(posts.numLikes),
    //     limit: input.limit ? input.limit : undefined,
    //     offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    // })

    // return items
}

// gets the userId, username, and profile images of the person who made the post
// input: postId of the post
// return: id - clerk userId
//         username - string username
//         image - url of the users profile image
//
// not current: idk if we need it
export async function getPostUserInfo(input: {
    postId: number
}) {
    const post = await db.query.posts.findFirst({
        where: eq(posts.id, input.postId)
    })
    if (!post) {
        throw new Error("post not found")
    }

    const user = await clerkClient.users.getUser(post.user)
    if (!user) {
        throw new Error("user not found")
    }

    const info = {
        id: user.id,
        username: user.username,
        image: user.imageUrl,
    }

    return info
}

export async function getActivePostsAction(input: {
    artistId: number,
    timeFrame: TimeFrame,
    artistPosts?: boolean,
    limit?: number,
    page?: number,
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

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

    const items = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: posts.id,
                user: posts.user,
                isArtist: posts.isArtist,
                artistId: posts.artistId,
                title: posts.title,
                message: posts.message,
                images: posts.images,
                likers: posts.likers,
                numLikes: posts.numLikes,
                numComments: posts.numComments,
                isEvent: posts.isEvent,
                eventTime: posts.eventTime,
                isPremium: posts.isPremium,
                createdAt: posts.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt
            })
            .from(posts)
            .leftJoin(userStats, eq(userStats.userId, posts.user))
            .where(and(eq(posts.artistId, input.artistId), and((input.artistPosts !== undefined ? eq(posts.isArtist, input.artistPosts) : undefined), gte(posts.createdAt, start))))
            .orderBy(desc(posts.numComments))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)
        return items
    })

    const weekAgo = new Date()
    weekAgo.setTime(weekAgo.getTime() - (86400000 * 7))
    const now = new Date()

    const result = []
    for (const item of items) {
        if (item.updatedAt && item.updatedAt.getTime() < weekAgo.getTime()) {
            const user = await clerkClient.users.getUser(item.user)

            if (item.image != user?.imageUrl) {
                await db.update(userStats).set({ image: user.imageUrl, updatedAt: now }).where(eq(userStats.userId, user.id))
            } else {
                await db.update(userStats).set({ updatedAt: now }).where(eq(userStats.userId, user.id))
            }
        }

        item.userHubsJoined = item.userHubsJoined ?? []
        item.userNumPosts = item.userNumPosts ?? 0
        item.userNumComments = item.userNumComments ?? 0
        item.userNumLikes = item.userNumLikes ?? 0

        const info = {
            id: item.id,
            user: item.user,
            isArtist: item.isArtist,
            artistId: item.artistId,
            title: item.title,
            message: item.message,
            images: item.images,
            likers: item.likers,
            numLikes: item.numLikes,
            numComments: item.numComments,
            isEvent: item.isEvent,
            eventTime: item.eventTime,
            isPremium: item.isPremium,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.username ? item.username : "[deleted]",
            image: item.image ? item.image : "/images/product-placeholder.webp",
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1,
            userIsPremium: item.userPremiumHubs !== null && item.userPremiumHubs.map(a => a.artistId).indexOf(item.artistId) > -1
        }

        result.push(info)
    }

    return result
}