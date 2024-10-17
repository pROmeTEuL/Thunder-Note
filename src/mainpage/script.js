async function fetchNotes() {
  console.log("Add server connection!!!");
  return [
    {
      id: 1,
      title: "Meeting Notes",
      preview: "Discuss project milestones, deadlines, and key objectives...",
      content: "Large content (I'm lazy :P)",
      time: "10:30 AM • October 6, 2024",
    },
    {
      id: 2,
      title: "Grocery List",
      preview:
        "Milk, bread, eggs, butter, tomatoes, spinach, chicken breast...",
      content: "Large content (I'm lazy :P)",
      time: "Yesterday • October 5, 2024",
    },
    {
      id: 3,
      title: "Vacation Ideas",
      preview:
        "Research for the best hiking spots in Switzerland, accommodation options...",
      content: "Large content (I'm lazy :P)",
      time: "2 days ago • October 4, 2024",
    },
  ];
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
