"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { wallets, products, type Wallet, type Product } from "@/db/schema"
import type { StoredFile } from "@/types"
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
} from "drizzle-orm"
import { type z } from "zod"

import type {
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "@/lib/validations/product"

import { currentUser } from "@clerk/nextjs"

export async function getProductsAction() {
    const user = await currentUser()

    if(!user) {
        throw new Error("Could not get user")
    }

    const wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userID, user.id)
    })

    if(!wallet) {
        throw new Error("Could not find wallet")
    } else if(!wallet.products) {
        return
    }

   
    const { items } = await db.transaction(async (tx) => {
        const items = await tx
            .select()
            .from(products)
            .where( inArray(products.id, wallet.products) )
    })
}