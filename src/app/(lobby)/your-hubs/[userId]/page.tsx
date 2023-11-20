import Link from "next/link"
import { db } from "@/db"
//import { products, stores } from "@/db/schema"
import { products, upcoming, artists, userStats, type Artist } from "@/db/schema"

import { desc, eq, or, inArray } from "drizzle-orm"
//import Balance from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

import { SponsorProductCard } from "@/components/sponsor-product-card"
import { WrapProductCard } from "@/components/wrap-product-card"


import { UpcomingCard } from "@/components/upcoming-card"
import { UpcomingDeckCard } from "@/components/upcoming-deck-card"

import { Shell } from "@/components/shells/shell"

import SimpleSlider from "@/components/HomePageCarousel"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatDate, toTitleCase } from "@/lib/utils"
import { LobbyCommunityCard } from "@/components/lobby-community-card"
import type { User } from "@clerk/nextjs/dist/types/server"
import { getUserHubsAction } from "@/app/_actions/wallet"
// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

// This is equivalent to getServersideProps() in the pages directory
// Read more: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic"

// interface YourHubsPageProps {
//     user: User
// }

export default async function YourHubsPage() {

    // if (!user) {
    //     throw new Error("User not found")
    // }

    // const userId = user?.id

    // const { userInfo } = await db.transaction(async (tx) => {

    //     const userInfo = await tx.query.userStats.findFirst({
    //         where: eq(userStats.userId, userId)
    //     })

    //     return {
    //         userInfo,
    //     }
    // })

    // const hubArtistIds = userInfo?.hubsJoined?.map(entry => entry.artistId) || []

    const hubArtistIds = await getUserHubsAction()

    // const yourArtistCommunities = await db
    //     .select()
    //     .from(artists)
    //     .limit(12)
    //     .orderBy(desc(artists.createdAt))
    // .where(eq(artists.id, userInfo?.hubsJoined))
    // .where(eq(artists.id, hubArtistIds))
    // .where(or(...hubArtistIds.map(id => eq(artists.id, id))))
    // .where(inArray(artists, hubArtistIds))


    return (
        <Shell as="div" className="gap-12">
            <section
                id="artist-communities"
                aria-labelledby="artist-communities-heading"
                className="space-y-6"
            >
                <div className="flex items-center">
                    <h2 className="text-2xl font-medium sm:text-3xl"> Your Artist Communities</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {hubArtistIds?.map((artist) => (

                        <LobbyCommunityCard key={artist.id} artist={artist} />

                    ))}

                </div>

            </section>



        </Shell>
    )
}