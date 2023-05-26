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

  // Handle file change event
  watcher.on('change', async (filePath) => {
    try {
      const [configContent, cardsContent] = await Promise.all([
        readFileContent(configFilePath),
        readFileContent(cardsFilePath),
      ]);
      console.log('File changed:', filePath);
      mainWindow.webContents.send('file-changed', filePath, {
        config: configContent,
        cards: cardsContent,
      });
    } catch (error) {
      console.error('Error reading file:', error);
      mainWindow.webContents.send('file-changed', filePath, null);
    }
  });

  ipcMain.handle('get-file-content', async () => {
    console.log('get-file-content');
    try {
      const [configContent, cardsContent] = await Promise.all([
        readFileContent(configFilePath),
        readFileContent(cardsFilePath),
      ]);
      return {
        config: configContent,
        cards: cardsContent,
      };
    } catch (error) {
      console.error('Error reading file:', error);
      return {
        config: null,
        cards: null,
      };
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
    fs.readFile(filePath, 'utf-8', (error, content) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(content));
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
