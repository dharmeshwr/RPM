import { useSetAtom } from "jotai";
import { ActionButton, ActionButtonType } from "./action-button"
import { AiOutlineDelete } from "react-icons/ai";
import { deleteNoteAtom } from "@renderer/store";

export const DeleteNoteButton = (props: ActionButtonType) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => await deleteNote()

  return (
    <ActionButton {...props} onClick={handleDelete}>
      <AiOutlineDelete className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
