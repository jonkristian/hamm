import _ from 'lodash';
import hass from '../ha-ws';
import { writable } from 'svelte/store';
import { configStore } from './configStore';
import { cardStore } from './cardStore';

export const stateStore = writable([]);

let unsubscribeConfig;
let unsubscribeCards;
let config;
let cards;
let client;

const fetchStates = async () => {
  if (!config || !cards || !client) {
    return;
  }

  if (config.ha_url) {
    const itemsFiltered = [];

    const items = await client.getStates();

    const transform = ({ entity_id, entities = [] }) => [
      { entity_id },
      ...transformAll(entities)
    ];

    const transformAll = (entities = []) =>
      _.flatMap(entities, (c) => transform(c));

    const cardsEntities = _.map(transformAll(cards), 'entity_id');

    itemsFiltered.push(
      ..._.filter(items, (o) => cardsEntities.includes(o.entity_id))
    );

    stateStore.set(itemsFiltered);
  }
};

const handleConfigChange = (value) => {
  config = value;
  fetchStates();
};

const handleCardChange = (value) => {
  cards = value;
  fetchStates();
};

unsubscribeConfig = configStore.subscribe(handleConfigChange);
unsubscribeCards = cardStore.subscribe(handleCardChange);

configStore.subscribe(value => {
  config = value;
  fetchStates();
});

cardStore.subscribe(value => {
  const previousCards = cards;
  cards = value;
  if (!_.isEqual(previousCards, value)) {
    handleCardChange(value);
  }
});

configStore.subscribe(async (value) => {
  config = value;
  if (config && config.ha_url && config.ha_token) {
    client = await hass({
      host: config.ha_url,
      token: config.ha_token
    });

    client.on('state_changed', (stateChangedEvent) => {
      const item = stateChangedEvent.data.new_state;
      stateStore.update(n => {
        const itemsFiltered = n.slice();
        const index = itemsFiltered.findIndex(el => el.entity_id === item.entity_id);
        if (index !== -1) {
          itemsFiltered[index] = item;
        }
        return itemsFiltered;
      });
    });

    fetchStates();
  }
});

// Cleanup the subscriptions when necessary
// unsubscribeConfig();
// unsubscribeCards();
