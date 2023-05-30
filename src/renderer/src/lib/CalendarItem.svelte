<script>
  import Icon from '@iconify/svelte';

  export let event;
  export let dayIdx;

  const meta = JSON.parse(event.location);

  let isMediaTracker = false;
  if(meta && undefined !== meta.host) {
    isMediaTracker = true;
  }
</script>

<div class="event idx-{dayIdx}" style="--event-color: {event.color}">
  <header class="header">
    <span class="dot"></span>
    <h1 class="title">{event.summary}</h1>
    {#if isMediaTracker && meta.tmdb_rating}
      <small class="rating"><Icon icon="mdi-star" /> {meta.tmdb_rating.toFixed(1)}</small>
    {/if}
  </header>
  {#if event.show_description === "all"}
    <p class="description">{event.description}</p>
  {/if}

  {#if event.show_description === 'next' && event.type_count == 1}
      <p class="description">{event.description}</p>
  {/if}
</div>

<style lang="scss">
  .event {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-sm);
  }

  .title {
    font-size: var(--text-size-md);
    font-weight: 400;
  }

  .dot {
    background-color: var(--event-color);
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .description {
    color: var(--color-secondary);
    font-size: var(--text-size-sm);
    max-width: 48ch;
    margin-bottom: var(--space-md);
    margin-left: 22px;
  }

  small {
    color: var(--color-yellow);
  }
</style>
