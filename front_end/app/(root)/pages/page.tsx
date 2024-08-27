"use client"; // Add this line to mark the component as a Client Component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Page: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:8000/api/notes');
    setNotes(response.data);
  };

  const createNote = async () => {
    if (!title) {
      toast.error('The title field is required');
      return;
    }
    await axios.post('http://localhost:8000/api/notes', { title, content });
    toast.success('Note added successfully!');
    fetchNotes();
    resetForm();
  };

  const updateNote = async () => {
    if (editingNote) {
      await axios.put(`http://localhost:8000/api/notes/${editingNote.id}`, { title, content });
      toast.success('Note updated successfully!');
      fetchNotes();
      resetForm();
      setEditingNote(null);
    }
  };

  const deleteNote = async (id: number) => {
    await axios.delete(`http://localhost:8000/api/notes/${id}`);
    toast.success('Note deleted successfully!');
    fetchNotes();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
  };

  const startEditing = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const isCode = (text: string) => {
    const codePatterns = [/function\s*\(/, /const\s+\w+\s*=/, /let\s+\w+\s*=/, /var\s+\w+\s*=/, /=>/, /<[^>]+>/, /{[^}]+}/, /;$/];
    return codePatterns.some(pattern => pattern.test(text));
  };

  return (
    <div className="container mx-auto p-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-white font-bold text-3xl text-center mb-6">Notes</h1>
      <form className="mb-6 grid grid-cols-1 gap-4">
        <input
          type="text"
          className="rounded-md p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="rounded-md p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={editingNote ? updateNote : createNote}
          type="button"
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 transition duration-200"
        >
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
      </form>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex justify-between items-start shadow-md hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex-1">
              <p className="font-semibold text-lg text-white">{note.title}</p>
              {isCode(note.content) ? (
                <pre className="text-gray-300 whitespace-pre-wrap">{note.content}</pre>
              ) : (
                <p className="text-gray-300">{note.content}</p>
              )}
              <p className="text-xs text-gray-400">Created: {new Date(note.created_at).toLocaleString()}</p>
              <p className="text-xs text-gray-400">Updated: {new Date(note.updated_at).toLocaleString()}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => startEditing(note)} className="text-green-400 hover:text-green-300">
                <FaEdit />
              </button>
              <button onClick={() => deleteNote(note.id)} className="text-red-400 hover:text-red-300">
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Page;