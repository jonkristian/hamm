<script>
	import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import nb from 'dayjs/locale/nb';

  dayjs.extend(weekOfYear);
  dayjs.locale(nb);

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

<div class="datetimecard">
  <header class="datetimecard__header">
    <h1 class="datetimecard__time">{time}</h1>
    <span class="datetimecard__second">{second}</span>
  </header>
  <footer class="datetimecard__footer">
    <p class="datetimecard__date">{date}</p>
    <p class="datetimecard__week">(uke {week})</p>
  </footer>
</div>

<style lang="scss">
  .datetimecard__header {
    display: flex;
  }
  .datetimecard__footer {
    display: flex;
    column-gap: .5rem;
  }

  .datetimecard__second {
    color: #999;
    font-size: 2rem;
    line-height: 175%;
  }
</style>
