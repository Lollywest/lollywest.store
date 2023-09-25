"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Shell } from "@/components/shells/shell"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

import type { Post } from "@/db/schema"
import { getEventsOnDayAction } from "@/app/_actions/post"

interface EventCalendarChildProps {
    artistId: number
    dates: Date[]
}

export function EventCalendarChild({ artistId, dates }: EventCalendarChildProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [events, setEvents] = React.useState<Post[]>([])

    const [isPending, startTransition] = React.useTransition()

    React.useEffect(() => {
        if (!date) {
            return
        }
        startTransition(async () => {
            const items = await getEventsOnDayAction({
                artistId: artistId,
                date: date
            })

            setEvents(items)
        })
    }, [date, artistId])



    return (
        <Shell>
            <Card className="overflow-hidden rounded-3xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) =>
                            dates.length !== 0 ? (date < dates[0]! || date > dates[dates.length - 1]! || dates.indexOf(date) === -1) : true
                        }
                    />
                    {isPending ?
                        <Shell className="max-w-lg justify-center">
                            <Icons.spinner
                                className="h-20 w-20 animate-spin"
                                aria-hidden="true"
                            />
                        </Shell>
                        :
                        <p></p> // placeholder
                        // events.map(...)
                    }
                </CardContent>
            </Card>
        </Shell>
    )
}