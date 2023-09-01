import type { FooterItem, MainNavItem } from "@/types"

import { productCategories } from "@/config/products"
import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com/",
  github: "https://github.com/",
  githubAccount: "https://github.com/",
  discord: "https://discord.com/users/",
  calDotCom: "https://cal.com/",
  instagram: "https://www.instagram.com/lollywest.drops/",
}

export const siteConfig = {
  name: "Lollywest",
  description:
    "Changing how artists earn and fans engage",
  url: "https://www.lollywest.store/",
  ogImage: "https://skateshop.sadmn.com/opengraph-image.png",
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Our Products",
          href: "/featured",
          description: "Check out our Artists and Wraps.",
          items: [],
        },
        {
          title: "Drop a Wrap/Deck",
          href: "/drop-on-lollywest",
          description: "Want to get involved?",
          items: [],
        },
        // {
        //   title: "Connect (Discord)",
        //   href: "/build-a-board",
        //   description: "Build your own custom skateboard.",
        //   items: [],
        // },
        {
          title: "About Us",
          href: "/about-lollywest",
          description: "All about Lollywest",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        // {
        //   title: "All",
        //   href: `/categories/${slugify(category.title)}`,
        //   description: `All ${category.title}.`,
        //   items: [],
        // },
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
          href: "/contact",
          external: false,
        },
        {
          title: "Terms & Conditions",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
        // {
        //   title: "General FAQ",
        //   href: "https://www.lollywest.com/",
        //   external: true,
        // },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Instagram",
          href: links.instagram,
          external: true,
        },
        {
          title: "Discord (Coming Soon)",
          href: links.discord,
          external: true,
        },
        {
          title: "X/Twitter (Coming Soon)",
          href: links.twitter,
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
          href: "/drop-on-lollywest",
          external: false,
        },
        {
          title: "For Managers & Labels",
          href: "/manager-form",
          external: false,
        },
        {
          title: "Partner with Lollywest",
          href: "/partner-with-lollywest",
          external: false,
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
