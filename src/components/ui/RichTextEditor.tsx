import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  List,
  ListOrdered
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4 space-y-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4 space-y-1',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'mb-2',
          },
        },
      }),
      Underline
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-orange max-w-none p-4 min-h-[160px] focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
        <div className="bg-gray-50 border-b p-2 flex gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded hover:bg-orange-100 ${
              editor.isActive('bold') ? 'bg-orange-100 text-orange-600' : ''
            }`}
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded hover:bg-orange-100 ${
              editor.isActive('italic') ? 'bg-orange-100 text-orange-600' : ''
            }`}
          >
            <Italic className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1 rounded hover:bg-orange-100 ${
              editor.isActive('underline') ? 'bg-orange-100 text-orange-600' : ''
            }`}
          >
            <UnderlineIcon className="w-5 h-5" />
          </button>
          <div className="w-px bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded hover:bg-orange-100 ${
              editor.isActive('bulletList') ? 'bg-orange-100 text-orange-600' : ''
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 rounded hover:bg-orange-100 ${
              editor.isActive('orderedList') ? 'bg-orange-100 text-orange-600' : ''
            }`}
          >
            <ListOrdered className="w-5 h-5" />
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}