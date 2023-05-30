import { writable } from 'svelte/store';

export const cardStore = writable();

// Request initial file content
window.electronAPI.getCards().then(({ content }) => {
  updateCardStore(content);
});

// Listen for file changes
window.electronAPI.onFileChanged((filePath, { content }) => {
  if (filePath.endsWith('cards.json')) {
    updateCardStore(content);
  }
});

function updateCardStore(jsonString) {
  let parsedContent = null;
  try {
    parsedContent = JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing cards.json:', error);
  }

  if (isValidJSON(parsedContent)) {
    cardStore.set(parsedContent);
  } else {
    console.error('Invalid cards.json content:', parsedContent);
  }
}

function isValidJSON(parsedJSON) {
  // Add your validation logic here
  // Return true if the parsedJSON is valid, false otherwise
  return parsedJSON !== null && typeof parsedJSON === 'object';
}
