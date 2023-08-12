import type { FooterItem, MainNavItem } from "@/types"

import { productCategories } from "@/config/products"
import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com/sadmann17",
  github: "https://github.com/sadmann7/skateshop",
  githubAccount: "https://github.com/sadmann7",
  discord: "https://discord.com/users/sadmann7",
  calDotCom: "https://cal.com/sadmann7",
}

export const siteConfig = {
  name: "Lollywest",
  description:
    "A marketplace for selling cards",
  url: "https://www.lollywest.store/",
  ogImage: "https://skateshop.sadmn.com/opengraph-image.png",
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Our Products",
          href: "/products",
          description: "Check out our artists and Wraps.",
          items: [],
        },
        {
          title: "Social Hour",
          href: "/build-a-board",
          description: "Build your own custom skateboard.",
          items: [],
        },
        // {
        //   title: "Connect (Discord)",
        //   href: "/build-a-board",
        //   description: "Build your own custom skateboard.",
        //   items: [],
        // },
        {
          title: "News",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "All",
          href: `/categories/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
          description: subcategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    // {
    //   title: "About our Products",
    //   items: [
    //     {
    //       title: "Wraps",
    //       href: "https://onestopshop.jackblatch.com",
    //       external: true,
    //     },
    //     {
    //       title: "Subscriptions",
    //       href: "https://acme-corp.jumr.dev",
    //       external: true,
    //     },
    //     {
    //       title: "Artist Info",
    //       href: "https://craft.mxkaske.dev",
    //       external: true,
    //     },
    //     {
    //       title: "User Info",
    //       href: "https://tx.shadcn.com/",
    //       external: true,
    //     },
    //     // {
    //     //   title: "shadcn/ui",
    //     //   href: "https://ui.shadcn.com",
    //     //   external: true,
    //     // },
    //   ],
    // },
    {
      title: "Help",
      items: [
        {
          title: "Contact",
          href: "/about",
          external: false,
        },
        {
          title: "Terms & Conditions",
          href: "/contact",
          external: false,
        },
        {
          title: "Privacy",
          href: "/terms",
          external: false,
        },
        {
          title: "General FAQ",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Discord",
          href: links.twitter,
          external: true,
        },
        {
          title: "Instagram",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "X (Twitter)",
          href: links.discord,
          external: true,
        },
        // {
        //   title: "cal.com",
        //   href: links.calDotCom,
        //   external: true,
        // },
      ],
    },
    {
      title: "Make Money with Us",
      items: [
        {
          title: "Artist Applications",
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
          external: true,
        },
        {
          title: "For Managers & Labels",
          href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
          external: true,
        },
        {
          title: "Partner with Lollywest",
          href: "https://www.youtube.com/watch?v=rwionZbOryo",
          external: true,
        },
        // {
        //   title: "coffee to go",
        //   href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
        //   external: true,
        // },
      ],
    },
  ] satisfies FooterItem[],
}
