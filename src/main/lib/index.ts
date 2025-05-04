import { appDirectoryName, fileEnconding, welcomeNoteFilename } from "../../shared/constants"
import { NoteInfo } from "@shared/models"
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types"
import { dialog } from "electron"
import { readdir, ensureDir, stat, readFile, writeFile, remove } from "fs-extra"
import { homedir } from "os"
import { isEmpty } from 'lodash'
import welcomeNoteFile from "../../../resources/welcomeNote.md?asset"
import path from "path"

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir);

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEnconding,
    withFileTypes: false
  })
  const notes = notesFileNames.filter(filename => filename.endsWith('.md'))

  if (isEmpty(notes)) {
    console.log('No notes found, createing a welcome note');
    const content = await readFile(welcomeNoteFile, { encoding: fileEnconding })

    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEnconding })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditedTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEnconding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  console.log(`Writing note ${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEnconding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir);

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('Note creation cancelled')
    return false;
  }

  const { name: filename, dir: parentDir } = path.parse(filePath);

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: "error",
      title: "Creation failed",
      message: `All notes must be saved under ${rootDir}. Avoid using other directories`,
    })

    return false
  }
  console.log(`Creating path: ${filePath}`)
  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (filename: string) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: "warning",
    title: "Delete Note",
    message: `Are you sure you want to delete ${filename} ?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response == 1) {
    console.info('Note deletion cancelled')
    return false
  }

  console.log(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)

  return true
}
