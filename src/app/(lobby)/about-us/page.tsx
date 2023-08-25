import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import dayjs from "dayjs"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string | null
  size?: "default" | "sm"
}
export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Blog",
    description: "Explore the latest news and updates from the community",
  }
  
  export default function BlogPage() {
    const posts = allPosts
      .filter((post) => post.published)
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
  
    return (
      <Shell className="md:pb-10">
        <Header
          title="About Us"
          description="What is Lollywest?"
        />
        <Separator className="mb-2.5" />

        
      
   
      <div className="about-us">
        {/* <header>
          <h1>About Us</h1>
          <p>{description}</p>
          <img src={image} alt={description} />
          <p>Published on {date}</p>
          <p>Authors: {authors.join(', ')}</p>
        </header> */}

        <section >
          <h2 className = "line-clamp-1 text-3xl tracking-tight">Introduction to Lollywest</h2>
          <div className = "line-clamp-2 text-muted-foreground">
          Lollywest is a creative and fan-centric hub where artists unveil decks, wraps, and sponsorship opportunities to enhance financial support and deepen fan interaction. The Lollywest leaderboard prominently showcases top sponsors and artists, determined by the worth of their sponsorship credits. Each transaction generates sponsorship credits that can be utilized to qualify for the yearly Lollywest incentive payout.
          </div>
        </section>

        <section>
          <h2>What is skateboarding?</h2>
          ... content goes here fghddfg
          <blockquote>
            I feel like skateboarding is as much of a sport as a lifestyle, and an art form, so there's so much that that transcends in terms of music, fashion, and entertainment.
          </blockquote>
        </section>

      {/* ... Other sections can be added similarly ... */}

        <footer>
          <h2>References</h2>
          <ul>
            <li><a href="https://en.wikipedia.org/wiki/Skateboarding">Wikipedia on Skateboarding</a></li>
            <li><a href="https://www.brainyquote.com/authors/tony-hawk-quotes">Tony Hawk Quotes</a></li>
          </ul>
        </footer>
    </div>
      {/* <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Lollywest?</AccordionTrigger>
          <AccordionContent>
            Blah Blah.........
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How it Works</AccordionTrigger>
          <AccordionContent>
            hmmmmm......
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>About our Products</AccordionTrigger>
          <AccordionContent>
            Our products........
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Buying Guide</AccordionTrigger>
          <AccordionContent>
            Buy.........
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Our Values</AccordionTrigger>
          <AccordionContent>
            Our values........
          </AccordionContent>
        </AccordionItem>
    </Accordion> */}

       
        {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Link key={post.slug} href={post.slug}>
              <article className="flex flex-col space-y-2.5">
                <AspectRatio ratio={16 / 9}>
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                      className="rounded-lg object-cover"
                      priority={i <= 1}
                    />
                  ) : (
                    <div
                      aria-label="Placeholder"
                      role="img"
                      aria-roledescription="placeholder"
                      className="flex h-full w-full items-center justify-center rounded-lg bg-secondary"
                    >
                      <Icons.placeholder
                        className="h-9 w-9 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </AspectRatio>
                <h2 className="line-clamp-1 text-xl font-semibold">
                  {post.title}
                </h2>
                <p className="line-clamp-2 text-muted-foreground">
                  {post.description}
                </p>
                {/* {post.date ? (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                ) : null} */}
              {/* </article>
            </Link>
          ))} */}
        {/* </div> */} 
      </Shell>
    )
  }
  