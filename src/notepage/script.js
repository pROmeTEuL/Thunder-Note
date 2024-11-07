import { api } from '../api/api.js';
import { log } from '../debugtools/log.js';

const { ipcRenderer } = require('electron');

const noteContainer = document.getElementById('note-container');

async function getNote() {
    var id = window.location.search.split('=')[1];
    log(`id: ${id}`);
    return await api.get(`/${id}`);
}

async function renderNote() {
    let note = await getNote();
    note.date = note.date.substring(0, note.date.length - 3);
    noteContainer.innerHTML = `
        <p class="note-title">${note.title}</p>
        <p class="note-body">${note.body}</p>
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

function deleteNote() {
    ipcRenderer.invoke('show-delete-confirm-dialog').then(result => {
        if (result.response === 0) { // 'Yes' was clicked
            var id = window.location.search.split('=')[1];
            api.delete(`/${id}`);
            window.location.assign('../mainpage/page.html');
        }
    });
}

document.getElementById('back-button').addEventListener('click', goBack);
document.getElementById('edit-button').addEventListener('click', editNote);
document.getElementById('delete-button').addEventListener('click', deleteNote);

window.onload = () => renderNote();