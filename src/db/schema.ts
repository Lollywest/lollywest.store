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


export const productsRelations = relations(products, ({ one }) => ({
  artist: one(artists, {
    fields: [products.artistID],
    references: [artists.id]
  }),
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
    slug: text("slug")
})

export type Artist = InferModel<typeof artists>

export const artistsRelations = relations(artists, ({ many }) => ({
    items: many(products)
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

//=================================== old schema ===================================

// import type { CartItem, CheckoutItem, StoredFile } from "@/types"
// import { relations, type InferModel } from "drizzle-orm"
// import {
//   boolean,
//   decimal,
//   int,
//   json,
//   mysqlEnum,
//   mysqlTable,
//   serial,
//   text,
//   timestamp,
//   varchar,
// } from "drizzle-orm/mysql-core"

// export const stores = mysqlTable("stores", {
//   id: serial("id").primaryKey(),
//   userId: varchar("userId", { length: 191 }).notNull(),
//   name: varchar("name", { length: 191 }).notNull(),
//   description: text("description"),
//   slug: text("slug"),
//   active: boolean("active").notNull().default(true),
//   stripeAccountId: varchar("stripeAccountId", { length: 191 }),
//   createdAt: timestamp("createdAt").defaultNow(),
// })

// export type Store = InferModel<typeof stores>

// export const storesRelations = relations(stores, ({ many }) => ({
//   products: many(products),
// }))

// export const products = mysqlTable("products", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 191 }).notNull(),
//   description: text("description"),
//   images: json("images").$type<StoredFile[] | null>().default(null),
//   category: mysqlEnum("category", [
//     "skateboards",
//     "clothing",
//     "shoes",
//     "accessories",
//   ])
//     .notNull()
//     .default("skateboards"),
//   subcategory: varchar("subcategory", { length: 191 }),
//   price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
//   inventory: int("inventory").notNull().default(0),
//   rating: int("rating").notNull().default(0),
//   tags: json("tags").$type<string[] | null>().default(null),
//   storeId: int("storeId").notNull(),
//   createdAt: timestamp("createdAt").defaultNow(),
// })

// export type Product = InferModel<typeof products>

// export const productsRelations = relations(products, ({ one }) => ({
//   store: one(stores, { fields: [products.storeId], references: [stores.id] }),
// }))

// export const carts = mysqlTable("carts", {
//   id: serial("id").primaryKey(),
//   userId: varchar("userId", { length: 191 }),
//   paymentIntentId: varchar("paymentIntentId", { length: 191 }),
//   clientSecret: varchar("clientSecret", { length: 191 }),
//   items: json("items").$type<CartItem[] | null>().default(null),
//   createdAt: timestamp("createdAt").defaultNow(),
// })

// export type Cart = InferModel<typeof carts>

// export const emailPreferences = mysqlTable("email_preferences", {
//   id: serial("id").primaryKey(),
//   userId: varchar("userId", { length: 191 }),
//   email: varchar("email", { length: 191 }).notNull(),
//   token: varchar("token", { length: 191 }).notNull(),
//   newsletter: boolean("newsletter").notNull().default(false),
//   marketing: boolean("marketing").notNull().default(false),
//   transactional: boolean("transactional").notNull().default(false),
//   createdAt: timestamp("createdAt").defaultNow(),
// })

// export type EmailPreference = InferModel<typeof emailPreferences>

// export const payments = mysqlTable("payments", {
//   id: serial("id").primaryKey(),
//   userId: varchar("userId", { length: 191 }),
//   storeId: int("storeId").notNull(),
//   stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
//   stripeAccountCreatedAt: int("stripeAccountCreatedAt").notNull(),
//   stripeAccountExpiresAt: int("stripeAccountExpiresAt").notNull(),
//   detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
//   createdAt: timestamp("createdAt").defaultNow(),
// })

// export type Payment = InferModel<typeof payments>

// export const orders = mysqlTable("orders", {
//   id: serial("id").primaryKey(),
//   userId: varchar("userId", { length: 191 }),
//   storeId: int("storeId").notNull(),
//   items: json("items").$type<CheckoutItem[] | null>().default(null),
//   total: decimal("total", { precision: 10, scale: 2 }).notNull().default("0"),
//   stripePaymentIntentId: varchar("stripePaymentIntentId", {
//     length: 191,
//   }).notNull(),
//   stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
//     length: 191,
//   }).notNull(),
//   name: varchar("name", { length: 191 }),
//   email: varchar("email", { length: 191 }),
//   addressId: int("addressId"),
//   createdAt: timestamp("createdAt").defaultNow(),
// })

// export type Order = InferModel<typeof orders>

// export const addresses = mysqlTable("addresses", {
//   id: serial("id").primaryKey(),
//   line1: varchar("line1", { length: 191 }),
//   line2: varchar("line2", { length: 191 }),
//   city: varchar("city", { length: 191 }),
//   state: varchar("state", { length: 191 }),
//   postalCode: varchar("postalCode", { length: 191 }),
//   country: varchar("country", { length: 191 }),
//   createdAt: timestamp("createdAt").defaultNow(),
// })

// export type Address = InferModel<typeof addresses>

// export const deckFamilies = mysqlTable("deck_families", {
//   id: serial("id").primaryKey(),
//   artistID: int("artistID").notNull(),
//   name: varchar("name", { length: 191 }).notNull(),
//   description: text("description"),
//   perks: json("perks").$type<string[] | null>().default(null),
//   totalDecks: int("totalDecks").notNull().default(0),
//   image: json("image").$type<StoredFile | null>().default(null),
//   initPrice: decimal("initPrice", { precision: 10, scale: 2 }).notNull().default("0"),
//   priceHistory: json("priceHistory").$type<Float32Array | null>().default(null),
// })

// export type DeckFamilies = InferModel<typeof deckFamilies>

// export const deckFamiliesRelations = relations(deckFamilies, ({ one, many }) => ({
//   artist: one(artists, {
//     fields: [deckFamilies.artistID],
//     references: [artists.id],
//   }),
//     decks: many(decks)
// }))

// export const decks = mysqlTable("decks", {
//     id: serial("id").primaryKey(),
//     ownerID: varchar("ownerID", { length: 191 }).notNull(),
//     deckFamily: int("deckFamily").notNull(),
// })

// export type Decks = InferModel<typeof decks>

// export const decksRelations = relations(decks, ({ one, many }) => ({
//   deckFamily: one(deckFamilies, {
//     fields: [decks.deckFamily],
//     references: [deckFamilies.id]
//   }),
//   orders: many(orders)
// }))

// export const wraps = mysqlTable("wraps", {
//   id: serial("id").primaryKey(),
//   artistID: int("artistID").notNull(),
//   name: varchar("name", { length: 191 }).notNull(),
//   description: text("description"),
//   perks: json("perks").$type<string[] | null>().default(null),
//   image: json("image").$type<StoredFile | null>().default(null),
//   price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
//   subscribers: json("subscribers").$type<string[] | null>().default(null),
// })

// export type Wraps = InferModel<typeof wraps>

// export const wrapsRelations = relations(wraps, ({ one }) => ({
//   artist: one(artists, {
//     fields: [wraps.artistID],
//     references: [artists.id]
//   })
// }))

// export const sponsorships = mysqlTable("sponsorships", {
//   id: serial("id").primaryKey(),
//   artistID: int("artistID").notNull(),
//   name: varchar("name", { length: 191 }).notNull(),
//   description: text("description"),
//   image: json("image").$type<StoredFile | null>().default(null),
//   price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
//   sponsors: json("sponsors").$type<string[] | null>().default(null),
// })

// export type Sponsorships = InferModel<typeof sponsorships>

// export const sponsorshipsRelations = relations(sponsorships, ({ one }) => ({
//   artist: one(artists, {
//     fields: [sponsorships.artistID],
//     references: [artists.id]
//   })
// }))