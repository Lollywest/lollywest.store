"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { addArtistPostAction } from "@/app/_actions/post"

import { isArrayOfFile } from "@/lib/utils"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { FileDialog } from "@/components/file-dialog"
import { Zoom } from "@/components/zoom-image"
import type { FileWithPreview } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface newPremiumPostProps {
    artistId: number
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
    isEvent: z.boolean().default(false),
    isPremium: z.boolean().default(true),
    eventDate: z.date().optional(),
    eventTime: z.string().optional(),
})

type Inputs = z.infer<typeof formSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function NewArtistPremiumPostForm({ artistId }: newPremiumPostProps) {
    const [isEvent, setIsEvent] = React.useState(false)

    React.useEffect(() => {
        console.log("event toggled")
    }, [isEvent])

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
            if (isEvent) {
                if (!data.eventTime || !data.eventDate) {
                    toast.error("Please add a date and time to this event")
                    return
                }
                const [hours, minutes] = data.eventTime.split(":").map(Number);
                data.eventDate.setHours(hours ? hours : 0)
                data.eventDate.setMinutes(minutes ? minutes : 0)
            }

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

            await addArtistPostAction({
                artistId: artistId,
                title: data.title,
                message: data.message,
                images: images,
                isEvent: isEvent,
                eventTime: data.eventDate ? data.eventDate : null,
                isPremium: data.isPremium,
            })

            toast.success("Post Sent")
            form.reset()

            router.refresh()
        })
    }

    return (
        <Form {...form} >
            <form
                className="grid w-full max-w-2xl gap-5 "
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Access Pass Perk Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Pre-sale available now!" {...field} />
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
                            <FormLabel>Short Perk Description</FormLabel>
                            <FormControl>
                                <Textarea className="resize" placeholder="Exclusive pre-sale tickets for my upcoming 2024 tour..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isEvent"
                    render={({ field }) => (
                        <FormItem >
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={isEvent}
                                        onCheckedChange={(() => setIsEvent(!isEvent))}
                                    />
                                    <label
                                        htmlFor="event"
                                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Does this perk expire?
                                    </label>
                                </div>
                            </FormControl>

                        </FormItem>
                    )}
                />
                {isEvent && <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Experation</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "ml-4 w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />}
                {isEvent && <FormField
                    control={form.control}
                    name="eventTime"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center space-x-4">
                                <FormLabel>Time of Experation</FormLabel>
                                <FormControl className="ml-4 w-[120px] pl-3 text-center font-normal">
                                    <Input placeholder="" type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />}
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
                {/* <FormField
                    control={form.control}
                    name="isPremium"
                    render={({ field }) => (
                        <FormItem >
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <label
                                        htmlFor="event"
                                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Make this post for premium members only?
                                    </label>
                                </div>
                            </FormControl>

                        </FormItem>
                    )}
                /> */}
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