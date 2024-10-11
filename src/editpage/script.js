const container = document.getElementById('note-container');

const title_td = document.getElementById('title-td');
const content_td = document.getElementById('content-td');
const date_td = document.getElementById('date-td');

const title = document.createElement('input');
title.type = 'text';
title.classList.add('note-title');

const content = document.createElement('textarea');
content.style.resize = 'none';
title.classList.add('note-content');

const date = document.createElement('p');
date.classList.add('note-time');

var changed = false;

title.addEventListener('change', () => {
    changed = true;
});

content.addEventListener('change', () => {
    changed = true;
});
function editNote() {
    const noteId = window.location.search.split('=')[1];
    // const note = await api.get(`/notes/${noteId}`);
    const note = {
        title: 'Note title',
        content: 'Note content',
        time: '10:30 AM • October 6, 2024'
    }
    title.value = note.title;
    content.value = note.content;
    date.textContent = note.time;
    title_td.appendChild(title);
    content_td.appendChild(content);
    date_td.appendChild(date);
}

function cancelEdit() {
    window.history.back();
}

function doneEdit() {
    if (changed) {
        date.textContent = new Date().toLocaleString();
        const noteId = window.location.search.split('=')[1];
        // api.post(`/notes/${noteId}`, {
        //     title: title.value,
        //     content: content.value
        //     time: date.textContent
        // });
    }
    window.history.back();
}

function goBack() {
    if (changed) {
        if (confirm('Are you sure you want to go back? Your changes will be lost.')) {
            window.history.back();
        }
    } else {
        window.history.back();
    }
}

editNote();