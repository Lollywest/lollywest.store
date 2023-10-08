import { Icons } from "@/components/icons"
import Link from "next/link"

interface inputs {
    href: string
}

export default function IconLink({ href }: inputs) {
    return (
        <Link href={href}>
            {href.includes("instagram.com") ?
                <Icons.instagram
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            : href.includes("twitter.com") ?
                <Icons.twitter
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            : href.includes("spotify.com") ?
                <Icons.spotify
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            : href.includes("music.apple.com") ?
                <Icons.appleMusic
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            : href.includes("soundcloud.com") ?
                <Icons.soundcloud
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            : href.includes("youtube.com") ?
                <Icons.youtube
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            : href.includes("twitch.tv") ?
                <Icons.twitch
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            : href.includes("discord.com") ?
                <Icons.discord
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            :
                <Icons.globe
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                />
            }
        </Link>
    )
}