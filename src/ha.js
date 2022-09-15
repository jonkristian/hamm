import { writable } from 'svelte/store'
import _ from 'lodash';

const ha_url = import.meta.env.VITE_HA_URL
const ha_token = import.meta.env.VITE_HA_TOKEN

import {
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";
import { cards } from './cards.js';

export function createHaStore() {
    const { subscribe, update, set } = writable([])

    return {
        subscribe,
        init: async () => {

          const auth = createLongLivedTokenAuth(
            ha_url,
            ha_token
          );
    
          const connection = await createConnection({ auth });
          subscribeEntities(connection, ents => {
            const merged = _.merge(cards, _.pick(ents, _.keys(cards)));
            const grouped = _.groupBy(_.values(merged), 'placement');
            set(Object.values(grouped));
          });
				}
    }
}

export const haStore = createHaStore();