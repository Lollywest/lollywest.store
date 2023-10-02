"use server"

import { db } from "@/db"
import { eq, desc } from "drizzle-orm"
import { posts, reports, comments, userStats } from "@/db/schema"
import { clerkClient, currentUser } from "@clerk/nextjs"

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

    const { comment, userInfo } = await db.transaction(async (tx) => {
        const comment = await tx.query.comments.findFirst({
            where: eq(comments.id, input.commentId)
        })

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, user.id)
        })

        return {
            comment,
            userInfo,
        }
    })

    if (!comment) {
        throw new Error("comment not found")
    }

    const reply = {
        user: user.id,
        postId: comment.postId,
        replyingTo: comment.replyingTo ? comment.replyingTo : comment.id,
        message: input.message,
    }

    comment.numReplies = comment.numReplies + 1

    if (!userInfo) {
        const newUserInfo = {
            userId: user.id,
            numComments: 1,
        }

        await db.transaction(async (tx) => {
            await tx.insert(comments).values(reply)
            await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
            await tx.insert(userStats).values(newUserInfo)
        })

        return
    }

    userInfo.numComments = userInfo.numComments + 1

    await db.transaction(async (tx) => {
        await tx.insert(comments).values(reply)
        await tx.update(comments).set(comment).where(eq(comments.id, comment.id))
        await tx.update(userStats).set(userInfo).where(eq(userStats.userId, userInfo.userId))
    })
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

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, user.id)
        })

        return {
            comment,
            userInfo
        }
    })

    if (!comment) {
        throw new Error("comment not found")
    }

    if (!comment.likers || !comment.likers.length) {
        comment.likers = [user.id]
    } else {
        comment.likers.push(user.id)
    }

    if (!userInfo) {
        const newUserInfo = {
            userId: user.id,
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

        const userInfo = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, user.id)
        })

        return {
            comment,
            userInfo
        }
    })

    if (!comment) {
        throw new Error("comment not found")
    }
    if (!comment.likers) { return }

    const idx = comment.likers.indexOf(user.id)
    if (idx > -1) {
        comment.likers.splice(idx, 1)
    } else { return }

    if (!userInfo) {
        const newUserInfo = {
            userId: user.id,
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
    const items = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: comments.id,
                user: comments.user,
                postId: comments.postId,
                replyingTo: comments.replyingTo,
                numReplies: comments.numReplies,
                message: comments.message,
                likers: comments.likers,
                createdAt: comments.createdAt,
                userHubsJoined: userStats.hubsJoined,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
            })
            .from(comments)
            .leftJoin(userStats, eq(userStats.userId, comments.user))
            .where(eq(comments.postId, input.postId))
            .orderBy(desc(comments.createdAt))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)
        return items
    })

    // const items = await db.query.comments.findMany({
    //     where: eq(comments.postId, input.postId),
    //     orderBy: [desc(comments.createdAt)],
    //     limit: input.limit ? input.limit : undefined,
    //     offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    // })

    const result = []
    for (const item of items) {
        const user = await clerkClient.users.getUser(item.user)

        item.userHubsJoined = item.userHubsJoined ?? []
        item.userNumPosts = item.userNumPosts ?? 0
        item.userNumComments = item.userNumComments ?? 0
        item.userNumLikes = item.userNumLikes ?? 0

        const info = {
            id: comments.id,
            user: comments.user,
            postId: comments.postId,
            replyingTo: comments.replyingTo,
            numReplies: comments.numReplies,
            message: comments.message,
            likers: comments.likers,
            createdAt: comments.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: user.username,
            image: user.imageUrl,
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
    const items = await db.transaction(async (tx) => {
        const items = await tx
            .select({
                id: comments.id,
                user: comments.user,
                postId: comments.postId,
                replyingTo: comments.replyingTo,
                numReplies: comments.numReplies,
                message: comments.message,
                likers: comments.likers,
                createdAt: comments.createdAt,
                userHubsJoined: userStats.hubsJoined,
                userNumPosts: userStats.numPosts,
                userNumComments: userStats.numComments,
                userNumLikes: userStats.numComments,
            })
            .from(comments)
            .leftJoin(userStats, eq(userStats.userId, comments.user))
            .where(eq(comments.replyingTo, input.commentId))
            .orderBy(desc(comments.createdAt))
            .limit(input.limit ? input.limit : 999999)
            .offset(input.page ? input.page * (input.limit ? input.limit : 0) : 0)
        return items
    })

    const result = []
    for (const item of items) {
        const user = await clerkClient.users.getUser(item.user)

        item.userHubsJoined = item.userHubsJoined ?? []
        item.userNumPosts = item.userNumPosts ?? 0
        item.userNumComments = item.userNumComments ?? 0
        item.userNumLikes = item.userNumLikes ?? 0

        const info = {
            id: comments.id,
            user: comments.user,
            postId: comments.postId,
            replyingTo: comments.replyingTo,
            numReplies: comments.numReplies,
            message: comments.message,
            likers: comments.likers,
            createdAt: comments.createdAt,
            points: item.userHubsJoined.length * joinsWeight + item.userNumPosts * postsWeight + item.userNumComments * commentsWeight + item.userNumLikes * likesWeight,
            username: user.username,
            image: user.imageUrl,
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