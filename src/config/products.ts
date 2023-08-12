import { type Product } from "@/db/schema"
import type { Option } from "@/types"

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
]

export const productCategories = [
  {
    title: "Featured",
    image: "/images/skateboard-one.webp",
    subcategories: [
      // {
      //   title: "All",
      //   description: "The board itself.",
      //   image: "/images/deck-one.webp",
      //   slug: "decks",
      // },
      {
        title: "Featured Wraps",
        description: "Handpicked Featured Wraps",
        image: "/images/wheel-one.webp",
        slug: "wheels",
      },
      {
        title: "Featured Decks",
        description: "Best of the Best. Featured Decks",
        image: "/images/truck-one.webp",
        slug: "Featured Decks",
      },
      {
        title: "Featured Sponsorships",
        description: "Featured Sponsorships",
        image: "/images/bearing-one.webp",
        slug: "bearings",
      },
      // {
      //   title: "Griptape",
      //   description: "The griptape that goes on the board.",
      //   image: "/images/griptape-one.webp",
      //   slug: "griptape",
      // },
      // {
      //   title: "Hardware",
      //   description: "The hardware that goes on the board.",
      //   image: "/images/hardware-one.webp",
      //   slug: "hardware",
      // },
      // {
      //   title: "Tools",
      //   description: "The tools that go with the board.",
      //   image: "/images/tool-one.webp",
      //   slug: "tools",
      // },
    ],
  },
  {
    title: "Drop on Lollywest",
    image: "/images/clothing-one.webp",
    subcategories: [
      {
        title: "Drop a Wrap",
        description: "Want to get involved? Click here.",
        slug: "t-shirts",
      },
      {
        title: "What is a Wrap?",
        description: "About our Wrap subscriptions",
        slug: "hoodies",
      },
      {
        title: "What is a Deck",
        description: "Everything about Deck ownership",
        slug: "pants",
      },
      {
        title: "What is a Sponsor?",
        description: "About our artist Sponsorships",
        slug: "shorts",
      },
      {
        title: "Artist FAQ",
        //description: "Top off your look with stylish and laid-back hats.",
        slug: "hats",
      },
    ],
  },
  {
    title: "Leaderboards",
    image: "/images/shoe-one.webp",
    subcategories: [
      {
        title: "Top Sponsors (users)",
        description: "Top fans by Sponsor Credits",
        slug: "low-tops",
      },
      {
        title: "Top Artists by Sponsors",
        description: "Top artists by Sponsor Credits",
        slug: "high-tops",
      },
      // {
      //   title: "Slip-ons",
      //   description: "Effortless style with rad slip-on shoes.",
      //   slug: "slip-ons",
      // },
      // {
      //   title: "Pros",
      //   description: "Performance-driven rad shoes for the pros.",
      //   slug: "pros",
      // },
      // {
      //   title: "Classics",
      //   description: "Timeless style with rad classic shoes.",
      //   slug: "classics",
      // },
    ],
  },
  {
    title: "About Us",
    image: "/images/backpack-one.webp",
    subcategories: [
      {
        title: "How it Works",
        description:
          "Want a look inside? Click here.",
        slug: "skate-tools",
      },
      {
        title: "About Lollywest",
        description: "What is Lollywest?",
        slug: "bushings",
      },
      {
        title: "About our Products",
        description:
          "Click here to learn more about the products we offer.",
        slug: "shock-riser-pads",
      },
      {
        title: "Buying Guide",
        description:
          "Can't decide what's best? Let us help.",
        slug: "skate-rails",
      },
      {
        title: "Our Values",
        description: "Click here to learn what were all about",
        slug: "wax",
      },
      // {
      //   title: "Socks",
      //   description: "Keep your feet comfy and stylish with our rad socks.",
      //   slug: "socks",
      // },
      // {
      //   title: "Backpacks",
      //   description: "Carry your gear in style with our rad backpacks.",
      //   slug: "backpacks",
      // },
    ],
  },
] satisfies {
  title: Product["category"]
  image: string
  subcategories: {
    title: string
    description?: string
    image?: string
    slug: string
  }[]
}[]

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
]

export function getSubcategories(category?: string): Option[] {
  if (!category) return []

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? []

  return subcategories
}
