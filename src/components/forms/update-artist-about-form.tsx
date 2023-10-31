"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Shell } from "@/components/shells/shell"
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
    UncontrolledFormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { isArrayOfFile } from "@/lib/utils"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { FileDialog } from "@/components/file-dialog"
import { BannerFileDialog } from "../banner-file-dialog"
import { Zoom } from "@/components/zoom-image"
import type { FileWithPreview } from "@/types"
import Image from "next/image"
import { Icons } from "@/components/icons"
import type { Artist } from "@/db/schema"
import IconLink from "@/components/icon-link"
import { updateArtistAction } from "@/app/_actions/wallet"

interface props {
    artist: Artist,
    isArtist: boolean
}

interface LinkType {
    value: string
}

const formSchema = z.object({
    image1: z
        .unknown()
        .refine((val) => {
            if (!Array.isArray(val)) return false
            if (val.some((file) => !(file instanceof File))) return false
            return true
        }, "Must be an array of File")
        .optional()
        .nullable()
        .default(null),
    image2: z
        .unknown()
        .refine((val) => {
            if (!Array.isArray(val)) return false
            if (val.some((file) => !(file instanceof File))) return false
            return true
        }, "Must be an array of File")
        .optional()
        .nullable()
        .default(null),
    description: z.string(),
    urls: z
        .array(
            z.object({
                value: z.string().url({ message: "Please enter a valid URL." }),
            })
        )
        .optional(),
    shortDescription: z.string(),
    hubTitle: z.string(),
})

type Inputs = z.infer<typeof formSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function UpdateArtistAboutForm({ artist, isArtist }: props) {
    console.log(isArtist)

    const [editing, setEditing] = React.useState(false)

    const [isPending, startTransition] = React.useTransition()

    const [files1, setFiles1] = React.useState<FileWithPreview[] | null>(null)
    const [files2, setFiles2] = React.useState<FileWithPreview[] | null>(null)
    const { isUploading, startUpload } = useUploadThing("productImage")

    const links: LinkType[] = []
    if (artist.links !== null) {
        for (const link of artist.links) {
            links.push({ value: link })
        }
    }

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: artist.description !== null ? artist.description : undefined,
            urls: links !== null ? links : undefined,
            shortDescription: artist.shortDescription !== null ? artist.shortDescription : undefined,
            hubTitle: artist.hubTitle !== null ? artist.hubTitle : undefined,
        }
    })

    const { fields, append, remove } = useFieldArray({
        name: "urls",
        control: form.control,
    })

    const preview1 = form.watch("image1") as FileWithPreview[] | null
    const preview2 = form.watch("image2") as FileWithPreview[] | null

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            const image1 = isArrayOfFile(data.image1)
                ? await startUpload(data.image1).then((res) => {
                    const formattedImages = res?.map((image) => ({
                        id: image.fileKey,
                        name: image.fileKey.split("_")[1] ?? image.fileKey,
                        url: image.fileUrl,
                    }))
                    return formattedImages ?? null
                })
                : null

            const image2 = isArrayOfFile(data.image2)
                ? await startUpload(data.image2).then((res) => {
                    const formattedImages = res?.map((image) => ({
                        id: image.fileKey,
                        name: image.fileKey.split("_")[1] ?? image.fileKey,
                        url: image.fileUrl,
                    }))
                    return formattedImages ?? null
                })
                : null

            artist.description = data.description
            artist.links = data.urls?.map(url => url.value) ?? null
            artist.shortDescription = data.shortDescription
            artist.hubTitle = data.hubTitle
            artist.images[0] = image1 !== null ? image1[0]! : artist.images[0]!
            artist.images[1] = image2 !== null ? image2[0]! : artist.images[1]!

            await updateArtistAction({ artist })

            setEditing(false)

            toast.success("Profile Updated")
        })
    }

    return (
        <Shell>
            {isArtist &&
                <Button
                    onClick={() => setEditing(!editing)}
                    className="w-1/4"
                    size="sm"
                >
                    <Icons.edit
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                    />
                    {!editing &&
                        <p>Edit</p>
                    }
                    {editing &&
                        <p>Stop Editing</p>
                    }
                </Button>
            }

            {!editing &&
                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle>About {artist.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{artist.description}</p>
                        {artist.links &&
                            <div className="flex">
                                {artist.links.map((link, i) => (
                                    <IconLink href={link} key={i} />
                                ))}
                            </div>
                        }
                    </CardContent>
                </Card>
            }

            {editing &&
                <Form {...form}>
                    <form
                        className="grid w-full max-w-2xl gap-5"
                        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                    >
                        <FormItem className="flex w-full flex-col gap-1.5">
                            <FormLabel>Profile Image</FormLabel>
                            {!isUploading && preview1?.length ? (
                                <div className="flex items-center gap-2">
                                    {preview1.map((file) => (
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
                                    name="image1"
                                    maxFiles={1}
                                    maxSize={1024 * 1024 * 4}
                                    files={files1}
                                    setFiles={setFiles1}
                                    isUploading={isUploading}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <UncontrolledFormMessage
                                message={form.formState.errors.image1?.message}
                            />
                        </FormItem>

                        <FormItem className="flex w-full flex-col gap-1.5">
                            <FormLabel>Banner Image</FormLabel>
                            {!isUploading && preview2?.length ? (
                                <div className="flex items-center gap-2">
                                    {preview2.map((file) => (
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
                                <BannerFileDialog
                                    setValue={form.setValue}
                                    name="image2"
                                    maxFiles={1}
                                    maxSize={1024 * 1024 * 4}
                                    files={files2}
                                    setFiles={setFiles2}
                                    isUploading={isUploading}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <UncontrolledFormMessage
                                message={form.formState.errors.image2?.message}
                            />
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Tell us about yourself
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="shortDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Community Bio</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Give a concise description to display beneath your name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="hubTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hub Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Name your hub
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            {fields.map((field, index) => (
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`urls.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                Links
                                            </FormLabel>
                                            <FormDescription className={cn(index !== 0 && "sr-only")}>
                                                Add links to your profile
                                            </FormDescription>
                                            <FormControl>
                                                <div className="flex">
                                                    <Input {...field} />
                                                    <Icons.removeCircle
                                                        className="m-3 h-4 w-4"
                                                        aria-hidden="true"
                                                        onClick={() => remove(index)}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append({ value: "" })}
                            >
                                Add a link
                            </Button>
                        </div>

                        <Button className="w-fit" disabled={isPending}>
                            {isPending && (
                                <Icons.spinner
                                    className="mr-2 h-4 w-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            Update Profile
                            <span className="sr-only">Update Profile</span>
                        </Button>
                    </form>
                </Form>
            }
        </Shell>
    )
}