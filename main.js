const { app, BrowserWindow } = require("electron");
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

const { ipcMain, dialog } = require('electron');

ipcMain.handle('show-confirm-dialog', async (event) => {
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
