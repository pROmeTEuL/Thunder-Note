import { app, BrowserWindow } from 'electron';
import log from 'electron-log';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  win.loadFile("src/mainpage/page.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.setName("Thunder Note");

import { ipcMain, dialog } from 'electron';

ipcMain.handle('show-back-confirm-dialog', async (event) => {
  const options = {
    type: 'question',
    buttons: ['Yes', 'No'],
    defaultId: 1,
    title: 'Confirm',
    message: 'Are you sure you want to go back? Your changes will be lost.',
  };

  const response = await dialog.showMessageBox(null, options);
  return response;
});

ipcMain.handle('show-delete-confirm-dialog', async (event) => {
  const options = {
    type: 'question',
    buttons: ['Yes', 'No'],
    defaultId: 1,
    title: 'Confirm',
    message: 'Are you sure you want to delete this note? This process is irreversible.',
  };

  const response = await dialog.showMessageBox(null, options);
  return response;
});

ipcMain.on('log', (event, message) => {
  log.info(message); // or log.error, log.warn, depending on the type of log
});

/*
import { api } from './src/api/api.js';

api.get('/').then(console.log);
*/