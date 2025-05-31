// components/TiptapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

import "@/styles/TipTapStyles.css";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>
        <b>Bold</b>
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>
        <i>Italic</i>
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>
        H2
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>
        • Lista
      </button>
      <button onClick={() => {
        const url = prompt("URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }}>
        🔗 Enlace
      </button>
    </div>
  );
};

const TiptapEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p>Escribe tu mensaje aquí...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="tiptap-editor border p-4 rounded">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="min-h-[200px] border p-2" />
    </div>
  );
};

export default TiptapEditor;