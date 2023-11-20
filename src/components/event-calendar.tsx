import * as React from "react"
import { Shell } from "@/components/shells/shell"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq, and, asc } from "drizzle-orm"
import { EventCalendarChild } from "./event-calendar-child"

interface EventCalendarProps {
    artistId: number
}

export async function EventCalendar({ artistId }: EventCalendarProps) {
    const items = await db.query.posts.findMany({
        columns: { eventTime: true },
        where: and(eq(posts.artistId, artistId), eq(posts.isEvent, true)),
        orderBy: asc(posts.eventTime),
    })

    const dates: Date[] = []
    for(let i=0; i < items.length; ++i) {
        dates.push(items[i]!.eventTime!)
    }

    const props = {
        artistId: artistId,
        dates: dates
    }

    return (
        <Shell>
            <EventCalendarChild {...props} />
        </Shell>
    )
}