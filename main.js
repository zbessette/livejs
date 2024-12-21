const { app, BrowserWindow } = require('electron');
const path = require('path');

// SUppress Chromium logs
app.commandLine.appendSwitch('disable-gpu'); // Disable GPU hardware acceleration
app.commandLine.appendSwitch('log-level', '3'); // Suppress info/debug logs
app.commandLine.appendSwitch('disable-software-rasterizer'); // Suppress rasterizer logs

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
