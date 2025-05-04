import { useSetAtom } from "jotai";
import { ActionButton, ActionButtonType } from "./action-button"
import { BiEdit } from "react-icons/bi";
import { createEmptyNoteAtom } from "@renderer/store";

export const NewNoteButton = (props: ActionButtonType) => {
  const createEmptyNode = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNode()
  }

  return (
    <ActionButton onClick={handleCreation} className="outline-none" {...props}>
      <BiEdit className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
