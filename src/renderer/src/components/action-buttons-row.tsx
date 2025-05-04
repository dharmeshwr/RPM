import { ComponentProps } from "react"
import { DeleteNoteButton } from "./button/delete-note-button"
import { NewNoteButton } from "./button/new-note-button"

export const ActionButtonsRow = (props: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <DeleteNoteButton />
      <NewNoteButton />
    </div>
  )
}
