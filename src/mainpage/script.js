import api from "../api/api.js";
const { ipcRenderer } = require('electron');

function log(message) {
  ipcRenderer.send("log", message);
}

log('Main page loaded');

async function fetchNotes() {
  return api.get("/");
}

async function renderNotes() {
  const notesContainer = document.getElementById("notes-container");
  const notes = await fetchNotes();

  notes.forEach((note) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");
    noteItem.setAttribute("id", `note-${note.id}`);

    noteItem.innerHTML = `
        <p class="note-title">${note.title}</p>
        <p class="note-preview">${note.preview}</p>
        <p class="note-time">${note.time}</p>
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

window.onload = renderNotes;
