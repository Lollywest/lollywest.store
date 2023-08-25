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
    title: "deck",
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
        href:"src/app/(lobby)/featured/page.tsx",
      },
      {
        title: "Featured Decks",
        description: "Best of the Best. Featured Decks",
        image: "/images/truck-one.webp",
        slug: "Featured Decks",
        href:"src/app/(lobby)/featured/page.tsx",
      },
      {
        title: "Featured Sponsorships",
        description: "Featured Sponsorships",
        image: "/images/bearing-one.webp",
        slug: "bearings",
        href:"src/app/(lobby)/featured/page.tsx",
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
    title: "wrap",
    image: "/images/clothing-one.webp",
    subcategories: [
      {
        title: "Drop a Wrap",
        description: "Want to get involved? Click here.",
        slug: "",
        href:"src/app/(lobby)/featured/page.tsx",
      },
      {
        title: "What is a Wrap?",
        description: "About our Wrap subscriptions",
        slug: "hoodies",
        href:"src/app/(lobby)/featured/page.tsx",
      },
      {
        title: "What is a Deck",
        description: "Everything about Deck ownership",
        slug: "pants",
        href:"src/app/(lobby)/featured/page.tsx",
      },
      {
        title: "What is a Sponsor?",
        description: "About our artist Sponsorships",
        slug: "shorts",
        href:"src/app/(lobby)/featured/page.tsx",
      },
      {
        title: "Artist FAQ",
        //description: "Top off your look with stylish and laid-back hats.",
        slug: "hats",
        href:"src/app/(lobby)/featured/page.tsx",
      },
    ],
  },
  {
    title: "sponsorhsip",
    image: "/images/shoe-one.webp",
    subcategories: [
      {
        title: "Top Sponsors (users)",
        description: "Top fans by Sponsor Credits",
        slug: "low-tops",
        href:"",
      },
      {
        title: "Top Artists by Sponsors",
        description: "Top artists by Sponsor Credits",
        slug: "high-tops",
        href:"",
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
  }
] satisfies {
  title: Product["category"]
  image: string
  subcategories: {
    title: string
    description?: string
    image?: string
    slug: string
    href?: string
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
