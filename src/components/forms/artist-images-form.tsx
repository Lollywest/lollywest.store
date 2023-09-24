"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    UncontrolledFormMessage,
} from "@/components/ui/form"

import { isArrayOfFile } from "@/lib/utils"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { FileDialog } from "@/components/file-dialog"
import { Zoom } from "@/components/zoom-image"
import type { FileWithPreview } from "@/types"
import Image from "next/image"
import { Icons } from "@/components/icons"
import { updateArtistImagesAction } from "@/app/_actions/store"

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
})

type Inputs = z.infer<typeof formSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function ArtistImagesForm() {
    const [isPending, startTransition] = React.useTransition()

    const [files1, setFiles1] = React.useState<FileWithPreview[] | null>(null)
    const [files2, setFiles2] = React.useState<FileWithPreview[] | null>(null)
    const { isUploading, startUpload } = useUploadThing("productImage")

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        // defaultValues: {
        //   category: "sponsorship",
        // },
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
            
            await updateArtistImagesAction({image1, image2})

            toast.success("Images Updated")
        })
    }

    return (
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
                        <FileDialog
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
                <Button className="w-fit" disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Update Images
                    <span className="sr-only">Update Images</span>
                </Button>
            </form>
        </Form>
    )
}