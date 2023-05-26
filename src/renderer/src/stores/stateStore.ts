import _ from 'lodash';
import hass from '../ha-ws';
import { writable } from 'svelte/store';

let config = null;
let cards = null;

export const stateStore = writable([]);
export const fileStore = writable({});

const getStates = async () => {
  if (!config || !cards) {
    return;
  }

  if(config.ha_url) {
    let itemsFiltered = [];
    const client = await hass({
      host: config.ha_url,
      token: config.ha_token
    });

    const items = await client.getStates()
    const cardsEntities = _.map(cards, 'entity_id')
    itemsFiltered = _.filter(items, (o) => cardsEntities.includes(o.entity_id))

    // Set initial states (Filtered by cards).
    stateStore.set(itemsFiltered)

    // Listen for state changed event.
    client.on('state_changed', (stateChangedEvent) => {
      const item = stateChangedEvent.data.new_state
      itemsFiltered[itemsFiltered.findIndex(el => el.entity_id === item.entity_id)] = item
      stateStore.update(n => [...itemsFiltered, n])
    });
  }
}

// Request initial file content
window.electronAPI.getFileContent().then((content) => {
  // Update config and cards with the new values from file content
  config = content?.config || null;
  cards = content?.cards || null;

  // Validate the new config and cards
  try {
    JSON.parse(JSON.stringify(config));
    JSON.parse(JSON.stringify(cards));
  } catch (error) {
    console.warn('Malformed JSON file');
    return;
  }

  // Set the file content in the fileStore
  fileStore.set(content);

  getStates();
});

getStates();
