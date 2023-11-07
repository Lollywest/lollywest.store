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
    disabled?: boolean,
}

export function VideoDialog({endpointCallback, successCallback, disabled}: VideoDialogProps) {
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
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={uploaded || disabled}>
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
                    // <p>url: {url}</p>
                    // <MuxUploaderDrop mux-uploader="uploader" >
                    //     <p>url: {url}</p>
                    //     <MuxUploader endpoint={"https://storage.googleapis.com/video-storage-gcp-us-east1-vop1-uploads/xvXpfLWVCvHxS7Hj6RQYWD?Expires=1698946064&GoogleAccessId=uploads-gcp-us-east1-vop1%40mux-video-production.iam.gserviceaccount.com&Signature=tTkRoXZ7oILsfyGM%2FKGDx0G0CL4vDYRibbUOaEMs6ijw6BEfY24dyEy7JESe46%2FKvzbwTr0WQKE0YDkAZ%2FCXkWxtVQPhla6njJ6jTRTHDVg%2ByY0334tnN9%2BNXEQ0JrtOdpJSl9H02FQmaP9w3PcOfIe9PvqZRAjvUSCR8eUiZWnsEAlhxZ9Fv6pgYW3Z21tMcbabEbZ87r81x0cTWK3DrEUayq5r4VV2TTRhafYffBQkkHy2QurW%2Fp8EzWKx4GGmJQTUMN2W%2BfrQ6uis2tXNWvnfTdO0kzuhqjAjdm%2FffKAbj88LghpErlHbxBIwJjbCPwTJc8SuygCUcru3pTxHTA%3D%3D&upload_id=ABPtcPrTTlUE-LMCTWlf3xaSJAfn-SaI2iVevWG685M33W3vRFNVaWa8j7TRe7jmMSkebGvtu80TXUy2oD2N384RegWHIS79403t7saeramJaTi-"} onSuccess={success} id="uploader" ></MuxUploader>
                    // </MuxUploaderDrop>
                    <MuxUploader endpoint={url} onSuccess={success} />
                }
            </DialogContent>
        </Dialog>
    )
}
