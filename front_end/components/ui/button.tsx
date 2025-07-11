import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl shadow-soft p-md text-sm font-medium transition-soft hover-elevate disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-[#27548A] text-[#F3F3E0] border border-[#27548A] hover:bg-[#F3F3E0] hover:text-[#27548A] hover:border-[#27548A]",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border border-[#27548A] text-[#27548A] bg-transparent hover:bg-[#DDA853] hover:text-[#27548A] hover:border-[#27548A]",
                secondary:
                    "bg-[#DDA853] text-[#27548A] border border-[#DDA853] hover:bg-[#e6b75c] hover:text-[#27548A] hover:border-[#DDA853]",
                ghost:
                    "hover:bg-[#DDA853] hover:text-[#27548A]",
                link: "text-[#27548A] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-xl gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-12 rounded-xl px-8 py-4 has-[>svg]:px-6",
                icon: "size-10 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
