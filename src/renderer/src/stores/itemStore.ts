import _ from 'lodash';
import { derived } from 'svelte/store';
import { stateStore } from './stateStore';
import { cardStore } from './cardStore';

let staticCardStore = undefined;

cardStore.subscribe(value => {
  staticCardStore = value;
});

export const itemStore = derived(
  [stateStore],
  ([$stateStore], set) => {
    let items = {};

    if ($stateStore.length > 0 && staticCardStore) {
      const cards = staticCardStore;

      const validatedCards = validateCards(cards, $stateStore);

      if (validatedCards) {
        items = groupCardsByPlacement(validatedCards);
      }
    }

    set(Object.entries(items));
  }
);

// Validate the cards by merging with stateStore
const validateCards = (cards, stateStore) => {
  const validatedCards = _.cloneDeep(cards);

  _.forEach(validatedCards, (card) => {
    _.merge(card, _.find(stateStore, { entity_id: card.entity_id }));

    if (card.hasOwnProperty('entities')) {
      for (let [key] of Object.entries(card.entities)) {
        _.merge(
          card.entities[key],
          _.find(stateStore, { entity_id: card.entities[key].entity_id })
        );
      }
    }
  });

  return validatedCards;
};

// Group the cards by placement
const groupCardsByPlacement = (cards) => {
  return _.groupBy(_.values(cards), 'placement');
};
