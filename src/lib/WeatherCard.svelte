<script lang="ts">
import Icon from '@iconify/svelte';
export let item;

const icons = {
  sunny: 'mdi-weather-sunny',
  cloudy: 'mdi-weather-cloudy',
  rainy: 'mdi-weather-rainy',
  windy: 'mdi-weather-windy',
};
</script>

<div class="weather">
  <header class="weather__header">
    <h1>{item.attributes.temperature}<span>{item.attributes.temperature_unit}</span></h1>
    <span class="weather__cloud"><Icon height={100} icon="{icons[item.state]}" /></span>
  </header>
  <footer class="weather__footer">
    <p><Icon icon="mdi-water-percent" /> {item.attributes.humidity} %</p>
    <p><Icon icon="mdi-weather-windy" /> {item.attributes.wind_speed} {item.attributes.wind_speed_unit}</p>
    <p><Icon icon="mdi-weather-windy-variant" /> {item.attributes.pressure} {item.attributes.pressure_unit}</p>
  </footer>
</div>

<style>
  .weather {
    margin-bottom: 2rem;
  }

  .weather__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 2rem;
  }

  .weather__cloud {
    animation: nudge 5s infinite;
  }

  .weather__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 2rem;
  }

  .weather__footer p {
    display: flex;
    align-items: center;
    column-gap: .5rem;
  }

  @keyframes nudge {
    0%, 100% {
      transform: translate(0, 0);
    }
    
    50% {
      transform: translate(10px, 0);
    }
    
    80% {
      transform: translate(0px, 0);
    }
  }
</style>