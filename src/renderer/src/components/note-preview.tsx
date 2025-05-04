import { cn, formatDateFromMs } from "@renderer/utils"
import { NoteInfo } from "@shared/models"
import { ComponentProps } from "react"

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({ title, content, lastEditedTime, isActive = false, ...rest }: NotePreviewProps) => {
  const dateAndTime = formatDateFromMs(lastEditedTime)
  return (
    <div
      className={cn('cursor-pointer px-2 py-3 rounded-md transition-colors duration-75', {
        'bg-zinc-700/80': isActive,
        'hover:bg-zinc-700/50': !isActive
      })}
      {...rest}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{dateAndTime}</span>
    </div>
  )
}
