import { useSetAtom } from "jotai";
import { ActionButton, ActionButtonType } from "./action-button"
import { BiEdit } from "react-icons/bi";
import { createEmptyNoteAtom } from "@renderer/store";

export const NewNoteButton = (props: ActionButtonType) => {
  const createEmptyNode = useSetAtom(createEmptyNoteAtom)

  const handleCreation = () => {
    createEmptyNode()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <BiEdit className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
