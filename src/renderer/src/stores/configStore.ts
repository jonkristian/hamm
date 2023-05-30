import { writable } from 'svelte/store';

export const configStore = writable();

// Request initial file content
window.electronAPI.getConfig().then(({ content }) => {
  updateConfigStore(content);
});

// Listen for file changes
window.electronAPI.onFileChanged((filePath, { content }) => {
  if (filePath.endsWith('config.json')) {
    updateConfigStore(content);
  }
});

function updateConfigStore(jsonString) {
  let parsedContent = null;
  try {
    parsedContent = JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing config.json:', error);
  }

  if (isValidJSON(parsedContent)) {
    configStore.set(parsedContent);
  } else {
    console.error('Invalid config.json content:', parsedContent);
  }
}

function isValidJSON(parsedJSON) {
  // Add your validation logic here
  // Return true if the parsedJSON is valid, false otherwise
  return parsedJSON !== null && typeof parsedJSON === 'object';
}
