import _ from 'lodash';
import hass from '../ha-ws';
import { writable } from 'svelte/store';
import dayjs from 'dayjs';

const config = await window.electronAPI.getConfig()
const cards = await window.electronAPI.getCards()

const getHistory = async () => {
  const history = await refreshHistory();
  historyStore.set(history);

  setInterval(async () => {
    const newHistory = await refreshHistory();
    historyStore.update(n => [...newHistory, n]);
  }, 50000);
}

const refreshHistory = async () => {
  const client = await hass({
    host: config.ha_url,
    token: config.ha_token
  });

  const itemsWithHistory = _.reduce(cards, function iter(r, o) {
    o.history && r.push(o);
    return (o.entities || []).reduce(iter, r);
  }, []);

  if(!itemsWithHistory) {
    return
  }

  let data = [];
  let result = {};

  for (let item of itemsWithHistory) {
    const start = dayjs().add(item.history.start, 'hour').toISOString();
    const end = dayjs().toISOString();

    if (item.history.hasOwnProperty('entities')) {
      const items = _.map(item.history.entities, 'entity_id');
      result = await client.getHistory(items, start, end);
    }

    if(result) {
      data.push(result);
    }
  }

  return data;
}

getHistory()

export const historyStore = writable([]);
