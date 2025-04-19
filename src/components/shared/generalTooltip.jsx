import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const GeneralTooltip = ({ content, triggerContent, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
            {triggerContent}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-2 text-center">
          <p className="whitespace-normal break-words">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default GeneralTooltip
