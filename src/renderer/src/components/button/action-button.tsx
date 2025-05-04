import { deleteNoteAtom } from "@renderer/store";
import { cn } from "@renderer/utils";
import { useSetAtom } from "jotai";
import { ComponentProps } from "react";

export type ActionButtonType = ComponentProps<'button'>

export const ActionButton = ({ className, children, ...rest }: ActionButtonType) => {
  const deleteEmptyNode = useSetAtom(deleteNoteAtom)

  const handleDelete = () => {
    deleteEmptyNode()
  }

  return (
    <button
      onClick={handleDelete}
      className={cn('px-2 py-1 rounded-md border cursor-pointer border-zinc-400/50 hover:border-zinc-600/50 transition-colors duration-100', className)}
      {...rest}
    >
      {children}
    </button>
  )
}
