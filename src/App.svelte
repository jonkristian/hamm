<script lang="ts">
  import "@fontsource/arimo";
  import { haStore } from './ha.js';
  import { t, locale, locales } from "./i18n";

  $locale = 'nb';
  $: isLoading = $haStore.length === 0;
</script>

{#await haStore.init()}
  <p>Loading ...</p>
{:then}

  {#if !isLoading}

  <div class="cards">
    {#each $haStore as item}
      <div class="area-{item[0].placement}">
        {#each item as entity}
          <svelte:component this={entity.component} item={entity} />
        {/each}
    </div>
    {/each}
  </div>

  {/if}
{/await}