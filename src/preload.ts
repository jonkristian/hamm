const { contextBridge, ipcRenderer } = require('electron');

// Custom APIs for renderer
const electronAPI = {
  getConfig: () => ipcRenderer.invoke('get-config'),
  getCards: () => ipcRenderer.invoke('get-cards'),
  onFileChanged: (callback) => {
    ipcRenderer.on('file-changed', (event, userDataPath, content) => {
      callback(userDataPath, content);
    });
  },
};

// Expose the electronAPI to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Request initial config.json
electronAPI.getConfig().then((content) => {
  const { userDataPath } = content;
  window.postMessage({ type: 'config-content', userDataPath, content }, '*');
});

// Request initial cards.json
electronAPI.getCards().then((content) => {
  const { userDataPath } = content;
  window.postMessage({ type: 'cards-content', userDataPath, content }, '*');
});
