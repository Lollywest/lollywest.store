import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const postBadgeVariants = cva(
    "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
                artist:
                    "bg-[#FFB619] hover:bg-[#FFB619] border-[#cc8b00] text-[#996900]",
                trending:
                    "bg-[#08b7f7] hover:bg-[#08b7f7] border-[#0686b3] text-[#045c7c]",
                new:
                    "bg-[#a5b4f3] hover:bg-[#a5b4f3] border-[#4a6ae8] text-[#15309e]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof postBadgeVariants> { }

function PostBadge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(postBadgeVariants({ variant }), className)} {...props} />
    )
}

export { PostBadge, postBadgeVariants }