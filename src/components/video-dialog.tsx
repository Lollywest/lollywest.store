import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from 'react'
import { Icons } from "@/components/icons"
import MuxUploader from "@mux/mux-uploader-react"
import MuxUploaderDrop from "@mux/mux-uploader-react"

interface VideoDialogProps {
    endpointCallback: () => Promise<string>,
    successCallback: () => void,
}

export function VideoDialog({endpointCallback, successCallback}: VideoDialogProps) {
    const [ uploaded, setUploaded ] = useState(false)

    const success = () => {
        setUploaded(true)
        successCallback()
    }

    console.log("video dialog")

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={uploaded}>
                    {!uploaded &&
                        <span className="sr-only">Upload Video</span>
                    }
                    {uploaded && 
                        <Icons.check 
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                        />
                    }
                </Button>
            </DialogTrigger>
            <DialogContent>
                <MuxUploaderDrop mux-uploader="uploader" >
                    <MuxUploader endpoint={endpointCallback} onSuccess={success} id="uploader" />
                </MuxUploaderDrop>
            </DialogContent>
        </Dialog>
    )
}
