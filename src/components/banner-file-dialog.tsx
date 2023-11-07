import * as React from "react"
import type { FileWithPreview } from "@/types"
import Cropper, { type ReactCropperElement } from "react-cropper"
import {
    useDropzone,
    type Accept,
    type FileRejection,
    type FileWithPath,
} from "react-dropzone"
import type {
    FieldValues,
    Path,
    PathValue,
    UseFormSetValue,
} from "react-hook-form"
import { toast } from "sonner"

import "cropperjs/dist/cropper.css"

import { cn, formatBytes } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

// FIXME Your proposed upload exceeds the maximum allowed size, this should trigger toast.error too

const bannerAspectRatio = 4 / 1

interface FileDialogProps<TFieldValues extends FieldValues>
    extends React.HTMLAttributes<HTMLDivElement> {
    name: Path<TFieldValues>
    setValue: UseFormSetValue<TFieldValues>
    accept?: Accept
    maxSize?: number
    maxFiles?: number
    files: FileWithPreview[] | null
    setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
    isUploading?: boolean
    disabled?: boolean
}

export function BannerFileDialog<TFieldValues extends FieldValues>({
    name,
    setValue,
    accept = {
        "image/*": [],
    },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    files,
    setFiles,
    isUploading = false,
    disabled = false,
    className,
    ...props
}: FileDialogProps<TFieldValues>) {
    const [isOpen, setIsOpen] = React.useState(false)
    const cropperRef = React.useRef<ReactCropperElement>(null)

    const onCrop = React.useCallback(() => {
        if (!files || !files[0] || !cropperRef.current) return

        const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas()

        croppedCanvas.toBlob((blob) => {
            if (!blob) {
                console.error("Blob creation failed")
                return
            }
            const croppedImage = new File([blob], files[0]!.name, {
                type: files[0]!.type,
                lastModified: Date.now(),
            })

            const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
                preview: URL.createObjectURL(croppedImage),
                path: files[0]!.name,
            }) satisfies FileWithPreview

            const newFiles = [...files]
            newFiles.splice(0, 1, croppedFileWithPathAndPreview)
            setValue(name, newFiles as PathValue<TFieldValues, Path<TFieldValues>>)
        })
    }, [files, name, setValue])

    const onDrop = React.useCallback(
        (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
            setValue(
                name,
                acceptedFiles as PathValue<TFieldValues, Path<TFieldValues>>,
                {
                    shouldValidate: true,
                }
            )

            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )

            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ errors }) => {
                    if (errors[0]?.code === "file-too-large") {
                        toast.error(
                            `File is too large. Max size is ${formatBytes(maxSize)}`
                        )
                        return
                    }
                    errors[0]?.message && toast.error(errors[0].message)
                })
            }
        },

        [maxSize, name, setFiles, setValue]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles,
        multiple: maxFiles > 1,
        disabled,
    })

    // Revoke preview url when component unmounts
    React.useEffect(() => {
        return () => {
            if (!files) return
            files.forEach((file) => URL.revokeObjectURL(file.preview))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button variant="outline" disabled={disabled}>
                    Upload Images
                    <span className="sr-only">Upload Images</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl sm:max-w-[480px]">
                {files?.length ? (
                    <div className="rounded-xl">
                        <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
                            Crop image
                        </p>
                        <div className="mt-8 grid place-items-center space-y-5">
                            <Cropper
                                ref={cropperRef}
                                className="h-[450px] w-[450px] object-cover"
                                aspectRatio={bannerAspectRatio}
                                preview=".img-preview"
                                src={files[0]!.preview}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                guides={true}
                            />
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    aria-label="Crop image"
                                    type="button"
                                    size="sm"
                                    className="h-8 rounded-xl"
                                    onClick={() => {
                                        onCrop()
                                        setIsOpen(false)
                                    }}
                                >
                                    <Icons.check
                                        className="mr-2 h-3.5 w-3.5"
                                        aria-hidden="true"
                                    />
                                    Submit
                                </Button>
                                <Button
                                    aria-label="Reset crop"
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-8 rounded-xl"
                                    onClick={() => {
                                        cropperRef.current?.cropper.reset()
                                    }}
                                >
                                    <Icons.reset
                                        className="mr-2 h-3.5 w-3.5"
                                        aria-hidden="true"
                                    />
                                    Reset
                                </Button>
                                <Button
                                    aria-label="remove file"
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-8 rounded-xl"
                                    onClick={() => {
                                        setFiles(null)
                                        setValue(
                                            name,
                                            null as PathValue<TFieldValues, Path<TFieldValues>>,
                                            {
                                                shouldValidate: true,
                                            }
                                        )
                                    }}
                                >
                                    <Icons.trash className="mr-2 h-4 w-4" aria-hidden="true" />
                                    Remove
                                    <span className="sr-only">Remove</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl" >
                        <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
                            Upload a banner image
                        </p>
                        <div
                            {...getRootProps()}
                            className={cn(
                                "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                isDragActive && "border-muted-foreground/50",
                                disabled && "pointer-events-none opacity-60",
                                className
                            )}
                            {...props}
                        >
                            <input {...getInputProps()} />
                            {isUploading ? (
                                <div className="group grid w-full place-items-center gap-1 sm:px-10">
                                    <Icons.upload
                                        className="h-9 w-9 animate-pulse text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </div>
                            ) : isDragActive ? (
                                <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
                                    <Icons.upload
                                        className={cn("h-8 w-8", isDragActive && "animate-bounce")}
                                        aria-hidden="true"
                                    />
                                    <p className="text-base font-medium">Drop the file here</p>
                                </div>
                            ) : (
                                <div className="grid place-items-center gap-1 sm:px-5">
                                    <Icons.upload
                                        className="h-8 w-8 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                    <p className="mt-2 text-base font-medium text-muted-foreground">
                                        Drag {`'n'`} drop file here, or click to select file
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Please upload file with size less than {formatBytes(maxSize)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
