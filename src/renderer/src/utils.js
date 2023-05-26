import { onDestroy } from 'svelte';
import dayjs from 'dayjs';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}

export function getDates(startDate, stopDate) {
  let dateArray = [];
  let currentDate = dayjs(startDate);

  while (currentDate <= stopDate) {
    dateArray.push( dayjs(currentDate).format('YYYY-MM-DD') )
    currentDate = dayjs(currentDate).add(1, 'days');
  }
  return dateArray;
}