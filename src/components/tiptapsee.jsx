import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import { AlignLeft, AlignRight, AlignCenter } from 'lucide-react'
import { useEffect } from "react";

import "@/styles/TipTapStyles.css";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {/* ... botones de formato iguales que antes ... */}
    </div>
  );
};

const TiptapEditor = ({ content = "<p>Escribe tu mensaje aquí...</p>", editable = true, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Underline,
      Strike,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      if(onChange) onChange(editor.getHTML());
    },
  });

  // Actualiza el contenido si cambia la prop `content`
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="tiptap-editor border p-4 rounded">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="min-h-[200px] border p-2" />
    </div>
  );
};

export default TiptapEditor;