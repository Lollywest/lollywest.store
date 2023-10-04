import type { StoredFile, CartItem, StripeItem } from "@/types"
import { relations, type InferModel } from "drizzle-orm"
import {
  boolean,
  decimal,
  int,
  json,
  mysqlTable,
  mysqlEnum,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import type { HubJoinInfo, SponsorInfo } from "@/types"

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  artistID: int("artistID").notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  perks: json("perks").$type<string[] | null>().default(null),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: mysqlEnum("category", [
    "deck",
    "wrap",
    "sponsorship",
  ])
    .notNull()
    .default("sponsorship"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePriceId: varchar("stripePriceId", { length: 191 }),
  decksLeft: int("decksLeft").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  owners: json("owners").$type<string[] | null>().default(null),
  slug: text("slug")
})

export type Product = InferModel<typeof products>
export type UpcomingProduct = InferModel<typeof upcoming>


export const productsRelations = relations(products, ({ one, many }) => ({
  artist: one(artists, {
    fields: [products.artistID],
    references: [artists.id]
  }),
  productPosts: many(posts)
  // owners: many(wallets, {
  //   fields: [products.owners],
  //   references: [wallets.id]
  // })
}))

//upcoming

export const upcoming = mysqlTable("upcoming", {
  id: serial("id").primaryKey(),
  artistID: int("artistID").notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  perks: json("perks").$type<string[] | null>().default(null),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: mysqlEnum("category", [
    "deck",
    "wrap",
    "sponsorship",
  ])
    .notNull()
    .default("sponsorship"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("createdAt").defaultNow(),
  releaseDate: timestamp("releaseDate").defaultNow(),
  slug: text("slug")
})

export type Upcoming = InferModel<typeof upcoming>

export const upcomingRelations = relations(upcoming, ({ one }) => ({
  artist: one(artists, {
    fields: [upcoming.artistID],
    references: [artists.id]
  }),
}))

export const artists = mysqlTable("artists", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    images: json("image").$type<StoredFile[] | null>().default(null),
    products: json("products").$type<number[] | null>().default(null),
    createdAt: timestamp("createdAt").defaultNow(),
    hubMembers: json("hubMembers").$type<string[] | null>().default(null),
    slug: text("slug")
})

export type Artist = InferModel<typeof artists>

export const artistsRelations = relations(artists, ({ many }) => ({
    items: many(products),
    artistPosts: many(posts)
}))

//wallet
export const wallets = mysqlTable("wallet", {
    id: serial("id").primaryKey(),
    userID: varchar("userId", { length: 191 }).notNull(),
    products: json("products").$type<number[] | null>().default(null),
    orders: json("orders").$type<number[] | null>().default(null)
})

export type Wallet = InferModel<typeof wallets>

export const walletRelations = relations(wallets, ({ many }) => ({
  // products: many(products),
  wallets_orders: many(orders)
}))

export const payments = mysqlTable("payments", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 191 }),
    artistID: int("artistID").notNull(),
    stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
    stripeAccountCreatedAt: int("stripeAccountCreatedAt").notNull(),
    stripeAccountExpiresAt: int("stripeAccountExpiresAt").notNull(),
    detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
    createdAt: timestamp("createdAt").defaultNow(),
})
  
export type Payment = InferModel<typeof payments>

export const paymentsRelations = relations(payments, ({ one }) => ({
  artist: one(artists, {
    fields: [payments.artistID],
    references: [artists.id]
  }),
}))
  
export const orders = mysqlTable("orders", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 191 }),
    username: varchar("username", { length: 191 }),
    name: varchar("name", { length: 191 }),
    customerId: varchar("customerId", { length: 191 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    createdAt: timestamp("createdAt").defaultNow(),
    products: json("products").$type<StripeItem[] | null>().default(null)
})
  
export type Order = InferModel<typeof orders>


export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  checkoutSessionId: varchar("checkoutSessionId", { length: 191 }),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Cart = InferModel<typeof carts>

export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Address = InferModel<typeof addresses>

export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  category: mysqlEnum("category", [
    "artist",
    "manager",
    "partner",
  ])
    .notNull()
    .default("artist"),
  contactInfo: text("contactInfo"),
  message: text("message")
})

export type Contact = InferModel<typeof contacts>

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  user: varchar("user", { length: 191 }).notNull(),
  isArtist: boolean("isArtist").notNull().default(false),
  artistId: int("artistId").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  images: json("images").$type<StoredFile[] | null>().default(null),
  likers: json("likers").$type<string[] | null>().default(null),
  numLikes: int("numLikes").notNull().default(0),
  numComments: int("numComments").notNull().default(0),
  isEvent: boolean("isEvent").default(false),
  eventTime: timestamp("eventTime").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow()
})

export type Post = InferModel<typeof posts>

export const postRelations = relations(posts, ({ one, many }) => ({
  artist: one(artists, {
    fields: [posts.artistId],
    references: [artists.id]
  }),
  replies: many(comments)
}))

export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey(),
  user: varchar("user", { length: 191 }).notNull(),
  postId: int("postId").notNull(),
  replyingTo: int("replyingTo").default(0),
  numReplies: int("numReplies").notNull().default(0),
  message: text("message").notNull(),
  likers: json("likers").$type<string[] | null>().default(null),
  createdAt: timestamp("createdAt").defaultNow()
})

export type Comment = InferModel<typeof comments>

export const commentsRelations = relations(comments, ({ one }) => ({
  parent: one(posts, {
    fields: [comments.postId],
    references: [posts.id]
  })
}))

export const reports = mysqlTable("reported", {
  id: serial("reported").primaryKey(),
  user: varchar("user", { length: 191 }),
  title: text("title"),
  message: text("message"),
  artistId: int("artistId").notNull(),
})

export type Report = InferModel<typeof reports>

export const userStats = mysqlTable("userStats", {
  userId: varchar("user", { length: 191 }).notNull(),
  hubsJoined: json("hubsJoined").$type<HubJoinInfo[] | null>().default(null),
  premiumHubs: json("premiumHubs").$type<number[] | null>().default(null),
  sponsorAmounts: json("sponsorAmounts").$type<SponsorInfo[] | null>().default(null),
  numLikes: int("numLikes").notNull().default(0),
  numComments: int("numComments").notNull().default(0),
  numPosts: int("numPosts").notNull().default(0),
})
