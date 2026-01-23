"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"

interface FeyButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    asChild?: boolean
}



export function FeyButton({
    className,
    children,
    asChild = false,
    ...props
}: FeyButtonProps) {
    const styles = cn(
        "group relative flex items-center justify-center gap-1",
        "h-8 min-w-[136px] whitespace-nowrap rounded-[28px] px-4 py-2",
        "text-sm font-semibold leading-tight",
        // Text color
        "text-white",
        // Base gradient
        "bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(31,41,55)_0%,rgb(15,23,42)_100%)]",
        // Shadows
        "[box-shadow:inset_0_0_0_0.5px_rgba(0,0,0,0.1),inset_1px_1px_0_-0.5px_rgba(0,0,0,0.1),inset_-1px_-1px_0_-0.5px_rgba(0,0,0,0.1)]",
        // Hover effect pseudo-element
        "after:absolute after:inset-0 after:rounded-[28px] after:opacity-0 after:transition-opacity after:duration-200",
        // Hover gradient
        "after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(51,65,85)_0%,rgb(30,41,59)_100%)]",
        // Hover shadows
        "after:[box-shadow:inset_0_0_0_0.5px_rgba(0,0,0,0.2),inset_1px_1px_0_-0.5px_rgba(0,0,0,0.2),inset_-1px_-1px_0_-0.5px_rgba(0,0,0,0.2),0_0_3px_rgba(0,0,0,0.05)]",
        "hover:after:opacity-100",
        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
    )

    if (asChild && React.isValidElement(children)) {
        const child = children as React.ReactElement<any>
        return React.cloneElement(child, {
            className: cn(styles, child.props.className),
            children: (
                <span className="relative z-10 flex items-center gap-1">
                    {child.props.children}
                </span>
            ),
            ...props
        })
    }

    return (
        <button className={styles} {...props}>
            <span className="relative z-10 flex items-center gap-1">
                {children}
            </span>
        </button>
    )
}
