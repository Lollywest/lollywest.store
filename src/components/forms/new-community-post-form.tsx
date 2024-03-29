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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { addCommunityPostAction } from "@/app/_actions/post"

import { isArrayOfFile } from "@/lib/utils"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { PostFileDialog } from "@/components/post-file-dialog"
import { Zoom } from "@/components/zoom-image"
import type { FileWithPreview } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getUploadUrl, getUploadAsset } from "@/app/_actions/video"
import { VideoDialog } from "../video-dialog"

interface newPostProps {
    artistId: number
}

interface MuxInfo {
    url: string,
    id: string,
}

const formSchema = z.object({
    title: z.string(),
    message: z.string(),
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
    videoUploaded: z.boolean().default(false),
})

type Inputs = z.infer<typeof formSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function NewCommunityPostForm({ artistId }: newPostProps) {
    const [isPending, startTransition] = React.useTransition()

    const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
    const { isUploading, startUpload } = useUploadThing("productImage")

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
    })

    const previews = form.watch("images") as FileWithPreview[] | null

    const router = useRouter()

    function onSubmit(data: Inputs) {
        startTransition(async () => {
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

            await addCommunityPostAction({
                artistId: artistId,
                title: data.title,
                message: data.message,
                images: images,
                videoAssetId: assetId,
            })

            toast.success("Post sent")
            form.reset()

            router.refresh()
        })
    }

    let muxInfo: MuxInfo | undefined
    const [uploadId, setUploadId] = React.useState("")

    const getMuxInfo = async () => {
        muxInfo = await getUploadUrl()
        setUploadId(muxInfo.id)
        return muxInfo.url
    }

    let asset: string = ""
    const [assetId, setAssetId] = React.useState("")

    const onMuxSuccess = () => {
        startTransition(async () => {
            asset = await getUploadAsset({ uploadId: uploadId })
            setAssetId(asset)
        })
    }

    return (
        <Form {...form}>
            <form
                className="grid w-full max-w-2xl gap-5"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="First Ave was amazing!!!" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Had a great time at the concert on saturday!!!" {...field} />
                            </FormControl>
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
                        <PostFileDialog
                            setValue={form.setValue}
                            name="images"
                            maxFiles={10}
                            maxSize={1024 * 1024 * 10}
                            files={files}
                            setFiles={setFiles}
                            isUploading={isUploading}
                            disabled={isPending || assetId.length > 0}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.images?.message}
                    />
                </FormItem>
                <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel className="mr-2">Video</FormLabel>
                    <FormControl>
                        <VideoDialog endpointCallback={getMuxInfo} successCallback={onMuxSuccess} disabled={files?.length !== undefined && files?.length > 0} />
                    </FormControl>
                </FormItem>
                <Button className="w-fit" disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Post
                    <span className="sr-only">Post</span>
                </Button>
            </form>
        </Form>
    )
}