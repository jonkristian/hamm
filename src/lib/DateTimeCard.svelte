<script>
	import { onMount } from 'svelte';

  import Icon from '@iconify/svelte';
  export let item;

	// Getting The Current Date & Time And Setting It
  let currentDateTime = new Date();
	
	onMount(() => {
		const interval = setInterval(() => {
			currentDateTime = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
	
	const dateFormatter = new Intl.DateTimeFormat([item.lang, 'default'], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
	});

	const timeFormatter = new Intl.DateTimeFormat([item.lang, 'default'], {
    hour: '2-digit',
    minute: '2-digit',
		hour12: item.hour12,
	});

  const secondFormatter = new Intl.DateTimeFormat([item.lang, 'default'], {
    second: '2-digit'
  });

	$: date = dateFormatter.format(currentDateTime);
  $: time = timeFormatter.format(currentDateTime);
  $: second = secondFormatter.format(currentDateTime);
</script>

<div class="datetime">
  <header class="datetime__header">
    <h1 class="time">{time}</h1>
    <span class="second">{second}</span>
  </header>
  <p class="date">{date}</p>
</div>

<style>
  .datetime {
    margin-bottom: 2rem;
  }
  .datetime__header {
    display: flex;
  }

  .datetime__header .second {
    color: #999;
    font-size: 2rem;
    line-height: 175%;
  }
</style>