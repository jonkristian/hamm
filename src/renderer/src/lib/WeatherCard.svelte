<script lang="ts">
import Icon from '@iconify/svelte';
import dayjs from 'dayjs';
export let item;

const icons = {
  "clear-night": 'mdi-weather-night',
  "cloudy": 'mdi-weather-cloudy',
  "fog": 'mdi-weather-fog',
  "hail": 'mdi-weather-hail',
  "lightning": 'mdi-weather-lightning',
  "lightning-rainy": 'mdi-weather-lightning-rainy',
  "partlycloudy": 'mdi-weather-partly-cloudy',
  "pouring": 'mdi-weather-pouring',
  "rainy": 'mdi-weather-rainy',
  "snowy": 'mdi-weather-snowy',
  "snowy-rainy": 'mdi-weather-snowy-rainy',
  "sunny": 'mdi-weather-sunny',
  "windy": 'mdi-weather-windy',
  "windy-variant": 'mdi-weather-windy-variant',
  "exceptional": 'mdi-earth'
};

function getCardinalDirection(angle, format=null) {
  let directions;
  if('icons' == format) {
    directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
  } else if('both' == format) {
    directions = ['↑N', '↗NØ', '→Ø', '↘SØ', '↓S', '↙SV', '←V', '↖NV'];
  } else {
    directions = ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'];
  }

  return directions[Math.round(angle / 45) % 8];
}

</script>

<div class="weathercard">
  <header class="header">
    <h1>{item.attributes.temperature}<span>{item.attributes.temperature_unit}</span></h1>
    <span class="cloud"><Icon height={80} icon="{icons[item.state]}" /></span>
  </header>
  <footer class="footer">
    <p><Icon icon="mdi-water-percent" /> {item.attributes.humidity} %</p>
    <p><Icon icon="mdi-weather-windy" /> {getCardinalDirection(item.attributes.wind_bearing, 'both')} {item.attributes.wind_speed} {item.attributes.wind_speed_unit}</p>
    <p><Icon icon="mdi-weather-windy-variant" /> {item.attributes.pressure} {item.attributes.pressure_unit}</p>
  </footer>

  {#if item.show_forecast == true}
    <div class="forecast">
      {#each item.attributes.forecast as forecast}
        <div class="forecast-item">
          <Icon icon="{icons[forecast.condition]}" />
          <p class="day">{dayjs(forecast.datetime).format('dddd')}</p>
          <small class="low"><Icon icon="mdi-thermometer-low" /> {forecast.templow}{item.attributes.temperature_unit}</small>
          <small class="high"><Icon icon="mdi-thermometer-high" /> {forecast.temperature}{item.attributes.temperature_unit}</small>
          <small class="speed">
            <Icon icon="mdi-weather-windy" />
            {getCardinalDirection(forecast.wind_bearing, 'icons')}
            {forecast.wind_speed} {item.attributes.wind_speed_unit}
          </small>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 2rem;
  }

  .cloud {
    animation: nudge 5s infinite;
    transform: translate3d(0,0,0);
    perspective: 1000;
    backface-visibility: hidden;
  }

  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 2rem;
  }

  .footer p {
    display: flex;
    align-items: center;
    column-gap: .5rem;
  }

  .forecast {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }

  .forecast-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: .5rem;
    font-size: 1.2rem;
  }

  .forecast-item .low {
    color: #ccc;
  }

  .forecast-item small {
    display: inline-flex;
    align-items: center;
  }

  .forecast-item .day {
    width: 100px;
  }

  .forecast-item .low,
  .forecast-item .high {
    width: 70px;
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
