import { api } from '../api/api.js';
import { log } from '../debugtools/log.js';

const { ipcRenderer } = require('electron');
const container = document.getElementById('note-container');

const title_td = document.getElementById('title-td');
const body_td = document.getElementById('body-td');
const date_td = document.getElementById('date-td');

const title = document.createElement('input');
title.type = 'text';
title.classList.add('note-title');

const body = document.createElement('textarea');
body.style.resize = 'none';
body.classList.add('note-body');

const date = document.createElement('p');
date.classList.add('note-time');

var changed = false;

title.addEventListener('change', () => {
    changed = true;
});

body.addEventListener('change', () => {
    changed = true;
});

log('Html connetions ready');

async function editNote() {
    log('Editing note');
    const noteId = window.location.search.split('=')[1];
    const note = await api.get(`/${noteId}`);
    title.value = note.title;
    body.value = note.body;
    note.date = note.date.substring(0, note.date.length - 3);
    date.textContent = note.date;
    title_td.appendChild(title);
    body_td.appendChild(body);
    date_td.appendChild(date);
}

log('Note loaded');

function cancelEdit() {
    const noteId = window.location.search.split('=')[1];
    window.location.assign(`../notepage/page.html?id=${noteId}`);
}

function doneEdit() {
    const noteId = window.location.search.split('=')[1];
    if (changed) {
        api.put(`/${noteId}`, {
            title: title.value,
            body: body.value
        });
    }
    window.location.assign(`../notepage/page.html?id=${noteId}`);
}

function goBack() {
    const noteId = window.location.search.split('=')[1];
    if (changed) {
        ipcRenderer.invoke('show-back-confirm-dialog').then(result => {
            if (result.response === 0) { // 'Yes' was clicked
                window.location.assign(`../notepage/page.html?id=${noteId}`);
            }
        });
    } else {
        window.location.assign(`../notepage/page.html?id=${noteId}`);
    }
}

document.getElementById('back-button').addEventListener('click', goBack);
document.getElementById('cancel-button').addEventListener('click', cancelEdit);
document.getElementById('done-button').addEventListener('click', doneEdit);

window.onload = editNote;