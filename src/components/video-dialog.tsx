import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect } from 'react'
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"
import MuxUploader from "@mux/mux-uploader-react"
import MuxUploaderDrop from "@mux/mux-uploader-react"

interface VideoDialogProps {
    endpointCallback: () => Promise<string>,
    successCallback: () => void,
}

export function VideoDialog({endpointCallback, successCallback}: VideoDialogProps) {
    const [ uploaded, setUploaded ] = useState(false)
    const [ url, setUrl ] = useState("")

    const success = () => {
        setUploaded(true)
        successCallback()
    }

    useEffect(() => {
        const urlFetch = async () => {
            const str = await endpointCallback()
            setUrl(str)
        }

        void urlFetch()

        console.log(url)
    }, [endpointCallback])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={uploaded}>
                    {!uploaded &&
                        <div>
                            <p>Upload Video</p>
                            <span className="sr-only">Upload Video</span>
                        </div>
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
                {!url ?
                    <Shell className="max-w-lg justify-center">
                        <Icons.spinner
                            className="h-20 w-20 animate-spin"
                            aria-hidden="true"
                        />
                    </Shell>
                :
                    <MuxUploaderDrop mux-uploader="uploader" >
                        <MuxUploader endpoint={url} onSuccess={success} id="uploader" />
                    </MuxUploaderDrop>
                }
            </DialogContent>
        </Dialog>
    )
}
