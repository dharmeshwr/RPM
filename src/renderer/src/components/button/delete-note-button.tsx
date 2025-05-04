import { ActionButton, ActionButtonType } from "./action-button"
import { AiOutlineDelete } from "react-icons/ai";

export const DeleteNoteButton = (props: ActionButtonType) => {
  return (
    <ActionButton {...props}>
      <AiOutlineDelete className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
