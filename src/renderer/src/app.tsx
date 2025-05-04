import { Content, RootLayout, Sidebar } from "./components/app-layout";
import { ActionButtonsRow } from "./components/action-buttons-row";
import { NotePreviewList } from "./components/note-preview-list";
import { MarkdownEditor } from "./components/markdown-editor";
import { FloatingNoteTitle } from "./components/floating-note-title";
import { useRef } from "react";

function App(): React.JSX.Element {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <RootLayout>
        <Sidebar className="bg-zinc-800 text-white p-2 ">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="pt-2 flex flex-col gap-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="bg-zinc-900 text-white border-l border-l-white/20 p-2">
          <FloatingNoteTitle />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  );
}

export default App
