"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { products, artists } from "@/db/schema"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import type { FileWithPreview } from "@/types"
import { catchError, isArrayOfFile } from "@/lib/utils"
import Image from "next/image"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
    UncontrolledFormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Zoom } from "@/components/zoom-image"
import { FileDialog } from "@/components/file-dialog"
import { toast } from "sonner"
import { getArtistByNameAction } from "@/app/_actions/store"
import { addProductAction } from "@/app/_actions/product"

const inputsSchema = z.object({
    artistName: z.string(),
    name: z.string(),
    description: z.string(),
    perk1: z.string(),
    perk2: z.string(),
    perk3: z.string(),
    perk4: z.string(),
    perk5: z.string(),
    perk6: z.string(),
    category: z
        .enum(products.category.enumValues, {
            required_error: "Must be a valid category",
        })
        .default(products.category.enumValues[2]),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
        message: "Must be a valid price",
    }),
    decksLeft: z.number().optional().default(0),
    images: z
        .unknown()
        .refine((val) => {
            if (!Array.isArray(val)) return false
            if (val.some((file) => !(file instanceof File))) return false
            return true
        }, "Must be an array of File")
        .optional()
        .nullable()
        .default(null),
    stripePriceId: z.string()
})

type Inputs = z.infer<typeof inputsSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export default function AddProductPage() {
    const [isPending, startTransition] = React.useTransition()
    const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
    const { isUploading, startUpload } = useUploadThing("productImage")

    const form = useForm<Inputs>({
        resolver: zodResolver(inputsSchema),
        // defaultValues: {
        //     username: "",
        //     firstName: "",
        //     lastName: "",
        // },
    })

    const previews = form.watch("images") as FileWithPreview[] | null

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            const artistId = await getArtistByNameAction({ name: data.artistName })
            if (!artistId) {
                toast.error("Could not find artist")
                return
            }

            const perks = [data.perk1, data.perk2, data.perk3, data.perk4, data.perk5, data.perk6]
            perks.filter(Boolean)

            const owners : string[] = []

            const images = isArrayOfFile(data.images)
                ? await startUpload(data.images).then((res) => {
                    const formattedImages = res?.map((image) => ({
                        id: image.fileKey,
                        name: image.fileKey.split("_")[1] ?? image.fileKey,
                        url: image.fileUrl,
                    }))
                    return formattedImages ?? null
                })
                : null
            
            await addProductAction({
                artistId: artistId,
                name: data.name,
                description: data.description,
                perks: perks,
                images: images,
                category: data.category,
                price: data.price,
                stripePriceId: data.stripePriceId,
                decksLeft: data.decksLeft,
                owners: owners
            })

            toast.success("Product Added")
        })
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="artistName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Artist Name</FormLabel>
                            <FormControl>
                                <Input placeholder="The Aftergreens" {...field} />
                            </FormControl>
                            <FormDescription>This must match exactly</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Sponsor The Aftergreens" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Toss The Aftergreens a couple bucks" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <p>leave unused perks blank</p>
                <FormField
                    control={form.control}
                    name="perk1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perk 1</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="perk2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perk 2</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="perk3"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perk 3</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="perk4"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perk 4</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="perk5"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perk 5</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="perk6"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perk 6</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the product type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="sponsorship">Sponsorship</SelectItem>
                                    <SelectItem value="wrap">Wrap</SelectItem>
                                    <SelectItem value="deck">Deck</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="9.99" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="decksLeft"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Decks</FormLabel>
                            <FormControl>
                                <Input placeholder="0" {...field} />
                            </FormControl>
                            <FormDescription>Leave blank if not a deck</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stripePriceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stripe Price ID</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>Add the product in stripe and copy the product ID over</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel>Images</FormLabel>
                    {!isUploading && previews?.length ? (
                        <div className="flex items-center gap-2">
                            {previews.map((file) => (
                                <Zoom key={file.name}>
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                                        width={80}
                                        height={80}
                                    />
                                </Zoom>
                            ))}
                        </div>
                    ) : null}
                    <FormControl>
                        <FileDialog
                            setValue={form.setValue}
                            name="images"
                            maxFiles={3}
                            maxSize={1024 * 1024 * 4}
                            files={files}
                            setFiles={setFiles}
                            isUploading={isUploading}
                            disabled={isPending}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.images?.message}
                    />
                </FormItem>
                <Button className="w-fit" disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Add Product
                    <span className="sr-only">Add Product</span>
                </Button>
            </form>
        </Form>
    )
}