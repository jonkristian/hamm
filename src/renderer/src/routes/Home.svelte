<script lang="ts">
  import { itemStore } from "../stores/itemStore";
  import { configStore } from "../stores/configStore";
  import { t, locale } from "../i18n";
  import GridItem from '../lib/GridItem.svelte';
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import relativeTime from "dayjs/plugin/relativeTime";
  import isToday from "dayjs/plugin/isToday";

  const initLocale = (lng) => {
    const locales = {
      en: import("dayjs/locale/en"),
      nb: import("dayjs/locale/nb"),
    };

    locales[lng].then(() => {
      dayjs.locale(lng);
    });

    $locale = lng;
  }

  $: $configStore && initLocale($configStore.locale);

  dayjs.extend(relativeTime);
  dayjs.extend(isToday);
  dayjs.extend(weekOfYear);

  export const gridArea = (placement) => {
    if(placement == 'top' || placement == 'bottom') {
      return `<style="grid-area: ${placement};">`;
    }
  }
</script>

{#await $itemStore}
    <p>{$t('loading')}</p>
  {:then $itemStoreValue}

    <div class="cards">
      {#each $itemStoreValue as item}
        {#if item}
          <GridItem {item} />
        {/if}
      {/each}
    </div>

{/await}
