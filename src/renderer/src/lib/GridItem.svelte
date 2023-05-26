<script>
  import EntityCard from './EntityCard.svelte';
  import PersonCard from './PersonCard.svelte';
  import WeatherCard from './WeatherCard.svelte';
  import PlantCard from './PlantCard.svelte';
  import DateTimeCard from './DateTimeCard.svelte';

  export let item;

  const components = {
    EntityCard,
    PersonCard,
    WeatherCard,
    PlantCard,
    DateTimeCard,
  }
</script>

{#if item[0] == 'top' || item[0] == 'bottom'}

  <div class="cards__placement {item[0]}">
    {#each item[1] as card}
      {#if card.component in components}
        <div class="cards__item">
          <svelte:component this={components[card.component]} item={card} />
        </div>
      {/if}
    {/each}
  </div>

{:else}

  <div class="cards__placement {item[0]}" style="grid-area: {item[0]}">
    {#each item[1] as card}
      {#if card.component in components}
        <div class="cards__card">
          <svelte:component this={components[card.component]} item={card} />
        </div>
      {/if}
    {/each}
  </div>

{/if}
