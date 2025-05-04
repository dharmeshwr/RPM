import { NoteContent, NoteInfo } from "@shared/models"
import { unwrap } from "jotai/utils"
import { atom } from "jotai"

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  return notes.sort((a, b) => b.lastEditedTime - a.lastEditedTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, prev => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null;

  const selectedNote = notes[selectedNoteIndex]
  const selectedNoteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: selectedNoteContent
  }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, prev => prev ?? {
  title: '',
  content: '',
  lastEditedTime: Date.now()
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return
  const title = `Note ${notes.length + 1}`

  const newNote: NoteInfo = {
    title,
    lastEditedTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note => note.title !== newNote.title))])

  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  set(notesAtom, notes.filter(note => note.title !== selectedNote.title))

  set(selectedNoteIndexAtom, null)
})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes) return;

  await window.context.writeNote(selectedNote.title, newContent)

  set(notesAtom, notes.map((note) => {
    return note.title === selectedNote.title ? { ...note, lastEditTime: Date.now() } : note
  }))
})
