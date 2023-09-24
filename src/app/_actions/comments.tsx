"use server"

import { db } from "@/db"
import { eq, desc } from "drizzle-orm"
import { posts, reports, comments } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"

export async function addCommentAction(input: {
    postId: number,
    message: string,
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

    post.numComments = post.numComments + 1
    await db.update(posts).set(post).where(eq(posts.id, post.id))

    const comment = {
        user: user.id,
        postId: input.postId,
        message: input.message,
        likers: null
    }

    await db.insert(comments).values(comment)
}

export async function likeCommentAction(input: {
    commentId: number
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const comment = await db.query.comments.findFirst({
        where: eq(comments.id, input.commentId)
    })
    if(!comment) {
        throw new Error("comment not found")
    }

    if(!comment.likers || !comment.likers.length) {
        comment.likers = [ user.id ]
    } else {
        comment.likers.push(user.id)
    }

    await db.update(comments).set(comment).where(eq(comments.id, comment.id))
}

export async function removeLikeCommentAction(input: {
    commentId: number
}) {
    const user = await currentUser()
    if(!user) {
        throw new Error("user not found")
    }

    const comment = await db.query.comments.findFirst({
        where: eq(comments.id, input.commentId)
    })

    if(!comment) {
        throw new Error("comment not found")
    }
    if(!comment.likers) { return }
    
    const idx = comment.likers.indexOf(user.id)
    if(idx > -1) {
        comment.likers.splice(idx, 1)
    } else { return }

    await db.update(comments).set(comment).where(eq(comments.id, comment.id))
}

export async function getAllCommentsAction(input: {
    postId: number,
    limit?: number,
    page?: number
}) {
    const items = await db.query.comments.findMany({
        where: eq(comments.postId, input.postId),
        orderBy: [desc(comments.createdAt)],
        limit: input.limit ? input.limit : undefined,
        offset: input.page ? input.page * (input.limit ? input.limit : 0) : undefined
    })

    return items
}

export async function deleteCommentAction(input: {
    commentId: number,
    report?: boolean
}) {
    if(input.report) {
        const comment = await db.query.comments.findFirst({
            where: eq(comments.id, input.commentId)
        })
        if(!comment) {
            throw new Error("comment not found")
        }

        const post = await db.query.posts.findFirst({
            where: eq(posts.id, comment.postId)
        })
        if(!post) {
            throw new Error("parent post not found")
        }

        await db.insert(reports).values({
            user: comment.user,
            title: null,
            message: comment.message,
            artistId: post.artistId
        })
    }

    await db.delete(comments).where(eq(comments.id, input.commentId))
}