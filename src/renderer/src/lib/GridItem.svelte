<script>
  import Entities from './Entities.svelte';
  import Person from './Person.svelte';
  import Weather from './Weather.svelte';
  import Plants from './Plants.svelte';
  import DateTime from './DateTime.svelte';
  import Calendar from './Calendar.svelte';
  import Glance from './Glance.svelte';
  import Entur from './Entur.svelte';

  export let item;

  const components = {
    Entities,
    Person,
    Weather,
    Plants,
    DateTime,
    Calendar,
    Glance,
    Entur,
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
