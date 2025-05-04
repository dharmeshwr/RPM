import { ComponentProps, useState } from "react"
import { NotePreview } from "./note-preview"
import { cn } from "@renderer/utils"
import { useNotesList } from "@renderer/hooks/use-notes-list"

export type NotePreviewListProps = ComponentProps<'div'> & {
  onSelect?: Function
}

export const NotePreviewList = ({ className, onSelect, ...rest }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  if (notes.length === 0) {
    return (
      <div className={cn('text-center pt-3', className)} {...rest}>
        <span>No Notes yet !</span>
      </div>
    )
  }


  return (
    <div className={className} {...rest}>
      {notes.map((note, i) => (
        <NotePreview
          key={i}
          isActive={selectedNoteIndex == i}
          onClick={handleNoteSelect(i)}
          {...note}
        />
      ))}
    </div>
  )
}
