<script>
  export let item;
</script>

{#if item[0].placement == 'top' || item[0].placement == 'bottom'}
<div class="cards__placement {item[0].placement}">
  {#each item as entity}
    <div class="cards__item">
      <svelte:component this={entity.component} item={entity} />
    </div>
  {/each}
</div>
{:else}
  <div class="cards__placement {item[0].placement}" style="grid-area: {item[0].placement}">
    {#each item as entity}
      <div class="cards__card">
        <svelte:component this={entity.component} item={entity} />
      </div>
    {/each}
  </div>
{/if}