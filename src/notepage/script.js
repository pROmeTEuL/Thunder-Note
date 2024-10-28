import { api } from '../api/api.js';
import { log } from '../debugtools/log.js';

const noteContainer = document.getElementById('note-container');

function getNote() {
    var id = window.location.search.split('=')[1];
    log(`id: ${id}`);
    let temp = api.get(`/${id}`);
    log(JSON.stringify(temp));
    return temp;
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
        <p class="note-content">${note.body}</p>
        <p class="note-time">${note.date}</p>
    `;
}

export function goBack() {
    window.location.assign('../mainpage/page.html');
}

function editNote() {
    var id = window.location.search.split('=')[1];
    window.location.assign(`../editpage/page.html?id=${id}`);
}

document.getElementById('back-button').addEventListener('click', goBack);
document.getElementById('edit-note').addEventListener('click', editNote);

window.onload = () => renderNote(getNote());