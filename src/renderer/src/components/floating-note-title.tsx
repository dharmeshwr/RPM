import { selectedNoteAtom } from "@renderer/store"
import { cn } from "@renderer/utils"
import { useAtomValue } from "jotai"
import { ComponentProps } from "react"

export const FloatingNoteTitle = ({ className, ...rest }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return (
    <div className={cn("flex justify-center", className)} {...rest}>
      <span className="text-gray-400">{selectedNote?.title}</span>
    </div>
  )
}
