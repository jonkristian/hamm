<script>
	import { onMount } from 'svelte';
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

<style lang="scss">
  .datetime {
    margin-bottom: 2rem;

    &__header {
      display: flex;
      .second {
        color: #999;
        font-size: 2rem;
        line-height: 175%;
      }
    }
  }
</style>