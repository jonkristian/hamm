<script>
  import { onMount, onDestroy } from 'svelte';
  import { t } from "../i18n";
  import { formatCalendarEvents, getCalendarEvents, getColorByIndex } from '../calendar';
  import CalendarItem from './CalendarItem.svelte';
  import dayjs from 'dayjs';
  export let item;
  import { configStore } from '../stores/configStore';

  let result = [];
  async function fetchCalendars(conf) {
    let calendars = [];
    if(undefined !== conf) {
      for (let index = 0; index < item.entities.length; index++) {
        const value =
        await getCalendarEvents(
          index,
          item.entities[index],
          item.days,
          conf
        );
        if(value) {
          calendars.push(value)
        }
      }

      result = formatCalendarEvents(calendars.flat());
    }
  }

  const interval = setInterval(async () => {
    $configStore && fetchCalendars($configStore);
  }, 30000);

  onMount(async () => {
    $configStore && fetchCalendars($configStore);
  });

  onDestroy(() => clearInterval(interval));
</script>

<div class="calendar">
{#await fetchCalendars()}
  <p>{$t('loading')}</p>
{:then items}
  {#each result as item, dayIdx}
    <div class="day idx-{dayIdx}">
      <header class="header">
      {#if dayjs(item.date).isToday()}
        <h2 class="title">{$t('today')}</h2>
      {:else}
        <h2 class="title">
          {dayjs(item.date).format('dddd')}
        </h2>
        <span class="date">
          {dayjs(item.date).format('DD/MM')} • {dayjs(item.date).fromNow()}
        </span>
      {/if}
      </header>
      <div class="events">
        {#each item.events as event}
          <CalendarItem dayIdx="{dayIdx}" event="{event}" />
        {/each}
      </div>

    </div>
  {/each}
{:catch error}
  <p class="error">{error.message}</p>
{/await}
</div>

<style lang="scss">
  .calendar {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .day {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-sm);
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-md);
    font-size: var(--header-size-sm);
  }

  .date {
    margin-top: 4px;
    color: var(--color-secondary);
    font-size: var(--text-size-sm);
    font-weight: 600;
  }

  .idx-0 .title {
    font-size: var(--header-size-lg);
  }

  .events {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
</style>
