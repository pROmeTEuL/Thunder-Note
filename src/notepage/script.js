const noteContainer = document.getElementById('note-container');

function getNote() {
    var id = window.location.search.split('=')[1];
    //return api.get(`/note/${id}`);
    return {
        id: 2,
        title: "Grocery List",
        preview: "Milk, bread, eggs, butter, tomatoes, spinach, chicken breast...",
        content: "Large content (I'm lazy :P)",
        time: "Yesterday • October 5, 2024",
    };
}

function renderNote(note) {
    noteContainer.innerHTML = `
        <p class="note-title">${note.title}</p>
        <p class="note-content">${note.content}</p>
        <p class="note-time">${note.time}</p>
    `;
}

function goBack() {
    window.history.back();
}

function editNote() {
    var id = window.location.search.split('=')[1];
    window.location.assign(`../editpage/page.html?id=${id}`);
}

renderNote(getNote());