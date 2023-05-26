const { contextBridge, ipcRenderer } = require('electron');

// Custom APIs for renderer
const electronAPI = {
  getFileContent: () => ipcRenderer.invoke('get-file-content'),
  startFileWatcher: () => ipcRenderer.invoke('start-file-watcher'),
  onFileChanged: (callback) => {
    ipcRenderer.on('file-changed', (event, userDataPath, content) => {
      callback(userDataPath, content);
    });
  },
};

// Expose the electronAPI to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Request initial file content
electronAPI.getFileContent().then((content) => {
  const { userDataPath } = content;
  window.postMessage({ type: 'initial-file-content', userDataPath, content }, '*');
});
