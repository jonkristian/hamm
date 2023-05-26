<script lang="ts">
  import { itemStore } from "../stores/itemStore";
  import { t, locale, locales } from "../i18n";
  import GridItem from '../lib/GridItem.svelte';

  $locale = 'nb';

  export const gridArea = (placement) => {
    if(placement == 'top' || placement == 'bottom') {
      return `<style="grid-area: ${placement};">`;
    }
  }
</script>

{#await $itemStore}
    <p>Laster ...</p>
  {:then}
    {#if $itemStore}
      <div class="cards">
        {#each $itemStore as item}
          {#if item}
            <GridItem {item} />
          {/if}
        {/each}
      </div>
    {/if}
{/await}
