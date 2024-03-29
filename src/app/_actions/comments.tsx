"use server"

import { db } from "@/db"
import { eq, and, desc } from "drizzle-orm"
import { posts, reports, comments, userStats, artists } from "@/db/schema"
import { clerkClient, currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

// how to weigh various things when calculating a users points
const joinsWeight = 100
const likesWeight = 1
const postsWeight = 10
const commentsWeight = 5

// creates a new comment
// input: postId - id of the post to comment on
//        message - the content of the comment
// returns: void
export async function addCommentAction(input: {
    postId: number,
    message: string,
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("user not found")
    }

    const { post, userInfo } = await db.transaction(async (tx) => {
        const post = await tx.query.posts.findFirst({
            where: eq(posts.id, input.postId)
        })

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, user.id)
        })

        return {
            post,
            userInfo,
        }
    })

    if (!post) {
        throw new Error("post not found")
    }

    post.numComments = post.numComments + 1

    const comment = {
        user: user.id,
        artistId: post.artistId,
        postId: input.postId,
        message: input.message,
        likers: null
    }

    if (!userInfo) {
        const newUserInfo = {
            userId: user.id,
            numComments: 1,
        }

        await db.transaction(async (tx) => {
            await tx.update(posts).set(post).where(eq(posts.id, post.id))
            await tx.insert(comments).values(comment)
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numComments = userInfo.numComments + 1

    await db.transaction(async (tx) => {
        await tx.update(posts).set(post).where(eq(posts.id, post.id))
        await tx.insert(comments).values(comment)
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })

    revalidatePath(`/community-post/${comment.postId}`)
}

// replies to a comment
// input: commentId - id of the comment to reply to
//        message - content of the reply
// returns: void
export async function replyToCommentAction(input: {
    commentId: number,
    message: string,
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("user not found")
    }

    const { comment, post, userInfo } = await db.transaction(async (tx) => {
        const comment = await tx.query.comments.findFirst({
            where: eq(comments.id, input.commentId)
        })
        if (!comment) { throw new Error("comment not found") }

        const post = await tx.query.posts.findFirst({
            where: eq(posts.id, comment.postId)
        })

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, user.id)
        })

        return {
            comment,
            post,
            userInfo,
        }
    })

    const reply = {
        user: user.id,
        artistId: comment.artistId,
        postId: comment.postId,
        replyingTo: comment.replyingTo ? comment.replyingTo : comment.id,
        message: input.message,
    }

    comment.numReplies = comment.numReplies + 1

    if (!post) {
        throw new Error("parent post not found")
    }
    post.numComments = post.numComments + 1

    if (!userInfo) {
        const newUserInfo = {
            userId: user.id,
            numComments: 1,
        }

        await db.transaction(async (tx) => {
            await tx.insert(comments).values(reply)
            await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
            await tx.update(posts).set(post).where(eq(posts.id, post.id))
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numComments = userInfo.numComments + 1

    await db.transaction(async (tx) => {
        await tx.insert(comments).values(reply)
        await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
        await tx.update(posts).set(post).where(eq(posts.id, post.id))
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })

    revalidatePath(`/community-post/${comment.postId}`)
}

// likes a comment for a user
// input: the comment id to like
// returns: void
export async function likeCommentAction(input: {
    commentId: number
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("user not found")
    }

    const { comment, userInfo } = await db.transaction(async (tx) => {
        const comment = await tx.query.comments.findFirst({
            where: eq(comments.id, input.commentId)
        })

        if (!comment) {
            throw new Error("comment not found")
        }

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, comment.user)
        })

        return {
            comment,
            userInfo
        }
    })

    if (!comment.likers || !comment.likers.length) {
        comment.likers = [user.id]
    } else {
        comment.likers.push(user.id)
    }

    if (!userInfo) {
        const newUserInfo = {
            userId: comment.user,
            numLikes: 1
        }

        await db.transaction(async (tx) => {
            await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numLikes = userInfo.numLikes + 1

    await db.transaction(async (tx) => {
        await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })
}

// removes a users like from a comment
// input: id of the comment to like
// returns: void
export async function removeLikeCommentAction(input: {
    commentId: number
}) {
    const user = await currentUser()
    if (!user) {
        throw new Error("user not found")
    }

    const { comment, userInfo } = await db.transaction(async (tx) => {
        const comment = await tx.query.comments.findFirst({
            where: eq(comments.id, input.commentId)
        })

        if (!comment) {
            throw new Error("comment not found")
        }

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, comment.user)
        })

        return {
            comment,
            userInfo
        }
    })

    if (!comment.likers) { return }

    const idx = comment.likers.indexOf(user.id)
    if (idx > -1) {
        comment.likers.splice(idx, 1)
    } else { return }

    if (!userInfo) {
        const newUserInfo = {
            userId: comment.user,
            numLikes: 0,
        }

        await db.transaction(async (tx) => {
            await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numLikes = userInfo.numLikes - 1

    await db.transaction(async (tx) => {
        await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })
}

// gets comments from a certain post
// input: postId - id of the post you want the comments for
//        limit - optional - how many comments you want returned
//        page - optional - which set of (limit) comments do you want
// returns: an array where each element has all the attributes of a comment +
//              - points: int corresponding to the users points
//              - username: string of the users username
//              - image: url of the users profile image
export async function getAllCommentsAction(input: {
    postId: number,
    limit?: number,
    page?: number
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

    const { items, artist } = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: comments.id,
                user: comments.user,
                artistId: comments.artistId,
                postId: comments.postId,
                replyingTo: comments.replyingTo,
                numReplies: comments.numReplies,
                message: comments.message,
                likers: comments.likers,
                createdAt: comments.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt,
            })
            .from(comments)
            .leftJoin(userStats, eq(userStats.userId, comments.user))
            .where(eq(comments.postId, input.postId))
            .orderBy(desc(comments.createdAt))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)

        if (items[0]) {
            const artist = await tx.query.artists.findFirst({
                where: eq(artists.id, items[0].artistId)
            })

            return {
                items,
                artist,
            }
        }
        return {
            items,
            undefined,
        }
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
            postId: item.postId,
            replyingTo: item.replyingTo,
            numReplies: item.numReplies,
            message: item.message,
            likers: item.likers,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.user === artist?.userId ? artist?.name : (item.username ? item.username : "[deleted]"),
            image: item.user === artist?.userId ? artist?.images[0]?.url ?? "/images/product-placeholder.webp" : (item.image ? item.image : "/images/product-placeholder.webp"),
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1,
            userIsPremium: item.userPremiumHubs !== null && item.userPremiumHubs.map(a => a.artistId).indexOf(item.artistId) > -1,
            userJoined: item.userHubsJoined !== null && item.userHubsJoined.map(a => a.artistId).indexOf(item.artistId) > -1,
        }

        result.push(info)
    }

    return result
}

// gets a comments replies
// input: commentId - id of the comment you want the replies for
//        limit - optional - how many replies you want returned
//        page - optional - which set of (limit) replies do you want
// returns: an array where each element has all the attributes of a comment +
//              - points: int corresponding to the users points
//              - username: string of the users username
//              - image: url of the users profile image
export async function getCommentRepliesAction(input: {
    commentId: number,
    limit?: number,
    page?: number,
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

    const { items, artist } = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: comments.id,
                user: comments.user,
                artistId: comments.artistId,
                postId: comments.postId,
                replyingTo: comments.replyingTo,
                numReplies: comments.numReplies,
                message: comments.message,
                likers: comments.likers,
                createdAt: comments.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt,
            })
            .from(comments)
            .leftJoin(userStats, eq(userStats.userId, comments.user))
            .where(eq(comments.replyingTo, input.commentId))
            .orderBy(desc(comments.createdAt))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)

        if (items[0]) {
            const artist = await tx.query.artists.findFirst({
                where: eq(artists.id, items[0].artistId)
            })

            return {
                items,
                artist,
            }
        }
        return {
            items,
            undefined,
        }
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
            postId: item.postId,
            replyingTo: item.replyingTo,
            numReplies: item.numReplies,
            message: item.message,
            likers: item.likers,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.user === artist?.userId ? artist?.name : (item.username ? item.username : "[deleted]"),
            image: item.user === artist?.userId ? artist?.images[0]?.url ?? "/images/product-placeholder.webp" : (item.image ? item.image : "/images/product-placeholder.webp"),
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1,
            userIsPremium: item.userPremiumHubs !== null && item.userPremiumHubs.map(a => a.artistId).indexOf(item.artistId) > -1,
            userJoined: item.userHubsJoined !== null && item.userHubsJoined.map(a => a.artistId).indexOf(item.artistId) > -1,
        }

        result.push(info)
    }

    return result
}

// delete a comment and optionally report it
//input: id of the comment
//       optionally set report to true if you want to report the comment
// returns: void
export async function deleteCommentAction(input: {
    commentId: number,
    report?: boolean
}) {
    if (input.report) {
        const { comment, post } = await db.transaction(async (tx) => {
            const comment = await tx.query.comments.findFirst({
                where: eq(comments.id, input.commentId)
            })
            if (!comment) {
                throw new Error("comment not found")
            }

            const post = await tx.query.posts.findFirst({
                where: eq(posts.id, comment.postId)
            })

            return {
                comment,
                post,
            }
        })

        if (!post) {
            throw new Error("parent post not found")
        }

        await db.transaction(async (tx) => {
            await tx.insert(reports).values({
                user: comment.user,
                title: null,
                message: comment.message,
                artistId: post.artistId
            })

            await tx.delete(comments).where(eq(comments.id, input.commentId))
        })

        revalidatePath(`/community-post/${comment.postId}`)

        return
    }

    await db.delete(comments).where(eq(comments.id, input.commentId))
}

// not current: idk if we need it
export async function getCommentUserInfo(input: {
    commentId: number
}) {
    const comment = await db.query.comments.findFirst({
        where: eq(posts.id, input.commentId)
    })
    if (!comment) {
        throw new Error("comment not found")
    }

    const user = await clerkClient.users.getUser(comment.user)
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

export async function reportCommentAction(input: {
    commentId: number
}) {
    const { comment, post } = await db.transaction(async (tx) => {
        const comment = await tx.query.comments.findFirst({
            where: eq(comments.id, input.commentId)
        })
        if (!comment) {
            throw new Error("comment not found")
        }

        const post = await tx.query.posts.findFirst({
            where: eq(posts.id, comment.postId)
        })

        return {
            comment,
            post,
        }
    })

    if (!post) {
        throw new Error("parent post not found")
    }

    await db.insert(reports).values({
        user: comment.user,
        title: null,
        message: comment.message,
        artistId: post.artistId
    })
}

export async function getFirstComments(input: {
    postId: number,
    limit?: number,
}) {
    const curuser = await currentUser()
    if (!curuser) {
        throw new Error("user not found")
    }

    const { items, artist } = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: comments.id,
                user: comments.user,
                artistId: comments.artistId,
                postId: comments.postId,
                replyingTo: comments.replyingTo,
                numReplies: comments.numReplies,
                message: comments.message,
                likers: comments.likers,
                createdAt: comments.createdAt,
                username: userStats.username,
                image: userStats.image,
                userHubsJoined: userStats.hubsJoined,
                userPremiumHubs: userStats.premiumHubs,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
                updatedAt: userStats.updatedAt,
            })
            .from(comments)
            .leftJoin(userStats, eq(userStats.userId, comments.user))
            .where(and(eq(comments.postId, input.postId), eq(comments.replyingTo, 0)))
            .orderBy(desc(comments.createdAt))
            .limit(input.limit ? input.limit : 3)

        if (items[0]) {
            const artist = await tx.query.artists.findFirst({
                where: eq(artists.id, items[0].artistId)
            })

            return {
                items,
                artist,
            }
        }
        return {
            items,
            undefined,
        }
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
            postId: item.postId,
            replyingTo: item.replyingTo,
            numReplies: item.numReplies,
            message: item.message,
            likers: item.likers,
            createdAt: item.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: item.user === artist?.userId ? artist?.name : (item.username ? item.username : "[deleted]"),
            image: item.user === artist?.userId ? artist?.images[0]?.url ?? "/images/product-placeholder.webp" : (item.image ? item.image : "/images/product-placeholder.webp"),
            likedByUser: item.likers !== null && item.likers.indexOf(curuser.id) > -1,
            userIsPremium: item.userPremiumHubs !== null && item.userPremiumHubs.map(a => a.artistId).indexOf(item.artistId) > -1,
            userJoined: item.userHubsJoined !== null && item.userHubsJoined.map(a => a.artistId).indexOf(item.artistId) > -1,
        }

        result.push(info)
    }

    return result
}