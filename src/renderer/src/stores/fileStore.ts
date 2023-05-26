import { writable } from 'svelte/store';

export const fileStore = writable({});

// Request initial file content
window.electronAPI.getFileContent().then((content) => {
  fileStore.set(content);
});

// Listen for file changes
window.electronAPI.onFileChanged((filePath, content) => {
  fileStore.set(content);
});
