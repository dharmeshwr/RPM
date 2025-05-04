import { headingsPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin } from "@mdxeditor/editor"
import { useMarkdownEditor } from "@renderer/hooks/use-markdown-editor"

export const MarkdownEditor = () => {
  const { selectedNote, handleAutoSaving, editorRef, handleBlur } = useMarkdownEditor()

  if (!selectedNote) return null

  return (
    <MDXEditor
      key={selectedNote.title}
      ref={editorRef}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      markdown={selectedNote.content}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 font-mono prose prose-invert"
    />
  )
}
