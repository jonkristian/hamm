const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

let mainWindow; // Declare the mainWindow variable

// Create a new Electron window
function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, '/src/preload.ts'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  const userDataPath = app.getPath('userData');
  const configFilePath = path.join(userDataPath, 'config.json');
  const cardsFilePath = path.join(userDataPath, 'cards.json');

  // Watch file changes using chokidar
  const watcher = chokidar.watch([configFilePath, cardsFilePath], {
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('change', async (filePath) => {
    try {
      setTimeout(async () => {
        const content = await readFileContent(filePath);
        mainWindow.webContents.send('file-changed', filePath, { content });
      }, 1500); // Delay of 1500 milliseconds
    } catch (error) {
      console.error('Error reading file:', error);
      mainWindow.webContents.send('file-changed', filePath, null);
    }
  });

  ipcMain.handle('get-config', async () => {
    try {
      const content = await readFileContent(configFilePath);
      return { userDataPath: configFilePath, content };
    } catch (error) {
      console.error('Error reading config file:', error);
      return null;
    }
  });

  ipcMain.handle('get-cards', async () => {
    try {
      const content = await readFileContent(cardsFilePath);
      return { userDataPath: cardsFilePath, content };
    } catch (error) {
      console.error('Error reading cards file:', error);
      return null;
    }
  });

  // Load the Electron app
  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5173/'
      : `file://${path.join(__dirname, '/src/renderer/dist/index.html')}`
  );

  // Additional setup code for macOS
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

function readFileContent(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, content) => {
      if (error) {
        reject(error);
      } else {
        resolve(content);
      }
    });
  });
}

// When Electron has finished initialization and is ready to create browser windows
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
