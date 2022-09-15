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

<div class="datetimecard">
  <header class="datetimecard__header">
    <h1 class="datetimecard__time">{time}</h1>
    <span class="datetimecard__second">{second}</span>
  </header>
  <p class="datetimecard__date">{date}</p>

</div>

<style lang="scss">
  .datetimecard {
    &__header {
      display: flex;
    }

    &__second {
      color: #999;
      font-size: 2rem;
      line-height: 175%;
    }
  }
</style>