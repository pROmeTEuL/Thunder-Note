import { api } from '../api/api.js';
import { log } from '../debugtools/log.js';

const noteContainer = document.getElementById('note-container');

async function getNote() {
    var id = window.location.search.split('=')[1];
    log(`id: ${id}`);
    return await api.get(`/${id}`);
}

async function renderNote() {
    let note = await getNote();
    noteContainer.innerHTML = `
        <p class="note-title">${note.title}</p>
        <p class="note-content">${note.body}</p>
        <p class="note-time">${note.date}</p>
    `;
}

function goBack() {
    window.location.assign('../mainpage/page.html');
}

function editNote() {
    var id = window.location.search.split('=')[1];
    window.location.assign(`../editpage/page.html?id=${id}`);
}

document.getElementById('back-button').addEventListener('click', goBack);
document.getElementById('edit-button').addEventListener('click', editNote);

window.onload = () => renderNote();