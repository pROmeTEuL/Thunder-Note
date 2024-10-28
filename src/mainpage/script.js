import { api } from '../api/api.js';

async function fetchNotes() {
  return api.get('/');
}

async function renderNotes() {
  const notesContainer = document.getElementById("notes-container");
  const notes = await fetchNotes();

  notes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");
    noteItem.setAttribute("id", `note-${note.id}`);
    let noteTruncate = note.body.length > 30 ? note.body.substring(0, 30) + '...' : note.body;
    noteItem.innerHTML = `
        <p class="note-title">${note.title}</p>
        <p class="note-preview">${noteTruncate}</p>
        <p class="note-time">${note.date}</p>
      `;

    notesContainer.appendChild(noteItem);

    noteItem.addEventListener("click", () => {
      openNote(note.id);
    });
  });
}

function openNote(noteId) {
  window.location.assign(`../notepage/page.html?id=${noteId}`);
}

async function addNote() {
  api.post('/', {
    title: 'New Note',
    body: '',
  });
  window.location.assign('./page.html');
}

document.getElementById("add-button").addEventListener("click", addNote);

window.onload = renderNotes;
