<script lang="ts">
  import {t} from '../i18n';
  import Icon from '@iconify/svelte';
  import dayjs from 'dayjs';
  export let item;

  function humanReadable(due_at, delay) {
    const now = dayjs();
    let due = dayjs(due_at, "H:mm");

    if (delay > 0) {
      due = due.add(delay, "minute");
    }

    if (due > now) {
      return $t('arrives')+' '+due.fromNow();
    } else if (due.add(120, "second") > now) {
      return $t('arrived')+' '+due.fromNow();
    } else {
      return $t('departs')+' '+due.add(1, "day").fromNow();
    }
  }
</script>

<div class="routes">
  {#each item.entities as entity}
    <div class="route">

        <div class="route-icon">
          {#if entity.icon}
            <Icon height={32} icon="{entity.icon}" />
          {:else if entity.attributes.icon}
            <Icon height={32} icon="{entity.attributes.icon}" />
          {:else}
            <Icon height={32} icon="mdi:map" />
          {/if}
        </div>

        <header class="station">
          <h1 class="station-title">
            {#if entity.title}
              {entity.title}
            {:else if entity.attributes.friendly_name}
              {entity.attributes.friendly_name}
            {:else}
              {$t('missing_name')}
            {/if}
          </h1>
          {#if entity.destination}
            <Icon height={28} icon="mdi:chevron-right" />
            <h2 class="destination-title">
              {entity.destination}
            </h2>
          {/if}
        </header>

        <div class="line">
          <div class="line-header">
            <h1 class="line-title">{entity.attributes.route}</h1>
            {#if entity.human_readable}
              <p class="line-hr">{humanReadable(entity.attributes.due_at, entity.attributes.delay)}</p>
            {/if}
          </div>
          <p class="line-time">{entity.attributes.due_at}</p>
        </div>

        {#if entity.show_next}
        <div class="line next">
          <header class="line-header">
            <h1 class="line-title">{entity.attributes.next_route}</h1>
            {#if entity.human_readable}
              <p class="line-hr">{humanReadable(entity.attributes.next_due_at, entity.attributes.next_delay)}</p>
            {/if}
          </header>
          <p class="line-time">{entity.attributes.next_due_at}</p>
        </div>
        {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .routes {
    max-width: fit-content;
  }

  .route {
    display: grid;
    grid-template-columns: 32px 1fr;
    column-gap: var(--space-md);
    row-gap: var(--space-sm);
    align-items: center;
    margin-bottom: var(--space-sm);
  }

  .station {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-sm);
  }

  .station-title {
    font-size: var(--text-size-lg);
  }

  .destination-title {
    font-size: var(--text-size-lg);
  }

  .line {
    grid-column-start: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-lg);
    justify-content: space-between;
    margin-bottom: var(--space-sm);
  }

  .line-title {
    font-size: var(--text-size-md);
    font-weight: 400;
  }

  .line-time {
    font-size: var(--text-size-sm);
  }

  .line-hr {
    font-style: italic;
    font-size: var(--text-size-xs);
    color: var(--color-secondary);
  }
</style>
