
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deletePostAction } from "src/app/_actions/post"

// interface DeletePostDialogProps extends React.HTMLAttributes<HTMLDivElement> {
interface DeletePostDialogProps {

    postId: number
}

export default function DeletePostDialog({ postId }: DeletePostDialogProps) {

    // const DeletePostHandle = async () => {
    //     await deletePostAction({ postId });
    // }
    const DeletePostHandle = () => {
        void (async () => {
            await deletePostAction({ postId });
        })();
    }



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">
                    <Icons.close
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                    />
                    Delete Post
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        post and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction >Continue</AlertDialogAction> */}
                    <AlertDialogAction >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl p-1 "
                            onClick={() => void DeletePostHandle}
                        >Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
