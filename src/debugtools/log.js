const { ipcRenderer } = require('electron');

export function log(message) {
    ipcRenderer.send("log", message);
}