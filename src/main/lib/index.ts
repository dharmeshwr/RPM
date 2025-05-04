import { appDirectoryName, fileEnconding } from "../../shared/constants"
import { NoteInfo } from "@shared/models"
import { GetNotes, ReadNote, WriteNote } from "@shared/types"
import { readdir, ensureDir, stat, readFile, writeFile } from "fs-extra"
import { homedir } from "os"
import { title } from "process"

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
