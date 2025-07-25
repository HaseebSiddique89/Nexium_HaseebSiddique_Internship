// src/components/ui/switch.tsx
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Base styling for the switch track
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        
        // Background colors based on state
        "data-[state=unchecked]:bg-input data-[state=checked]:bg-primary", // Fallback for normal theme (non-gradient)
        
        className // Apply additional classes from props
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base styling for the thumb
          "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          
          // Thumb background color (default/light theme)
          "bg-background", 
          
          // Thumb position based on state
          "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }