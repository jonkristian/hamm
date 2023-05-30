<script>
	import { onMount } from 'svelte';
  import { t } from "../i18n";
  import dayjs from 'dayjs';

  export let item;
  let currentDateTime = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			currentDateTime = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

  $: week = dayjs(currentDateTime).week();
	$: date = dayjs(currentDateTime).format('dddd DD. MMMM YYYY');
  $: time = dayjs(currentDateTime).format('HH:mm');
  $: second = dayjs(currentDateTime).format('ss');
</script>

<div class="datetime">
  <header class="header">
    <h1 class="time">{time}</h1>
    {#if item.show_seconds && item.show_seconds === true}
      <span class="second">{second}</span>
    {/if}
  </header>
  <footer class="footer">
    <p class="date">{date}</p>
    <p class="week">{$t('week', { number: week})}</p>
  </footer>
</div>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-sm);
  }
  .footer {
    display: flex;
    column-gap: var(--space-sm);
  }

  .second {
    color: var(--color-secondary);
    font-size: var(--text-size-xl);
    line-height: 1.8;
  }
</style>
