<script lang="ts">
  import "@fontsource/arimo";
  import { haStore } from './ha.js';
  import { t, locale, locales } from "./i18n";

  import GridItem from './lib/GridItem.svelte';

  $locale = 'nb';
  $: isLoading = $haStore.length === 0;

  export const gridArea = (placement) => {
    if(placement == 'top' || placement == 'bottom') {
      return `<style="grid-area: ${placement};">`;
    }
  }
</script>

{#await haStore.init()}
  <p>Loading ...</p>
{:then}

  {#if !isLoading}
    <div class="cards">
      {#each $haStore as item}
        <GridItem {item} />
      {/each}
    </div>
  {/if}
{/await}
