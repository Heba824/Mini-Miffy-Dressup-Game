const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 560,
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false  // Add this to allow local file access
    },
  });

  win.loadFile('public/index.html');
  
  // Pass the app path to the renderer process
  win.webContents.on('dom-ready', () => {
    win.webContents.executeJavaScript(`
      window.appPath = '${app.getAppPath()}';
      window.isPackaged = ${app.isPackaged};
    `);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});