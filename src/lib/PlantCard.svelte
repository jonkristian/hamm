<script lang="ts">
  import Icon from '@iconify/svelte';
  export let item;

  const icons = {
    problem: 'mdi-flower-tulip',
    ok: 'mdi-flower',
  };

  let problems = [];
  if (item.attributes.problem) {
    let problems_arr = item.attributes.problem.split(',');
    problems_arr.forEach(element => {
      problems.push(element.replace(/^\s*|\s*$/g,'').replace(/\s/g, '_'));
    });
  }
  console.log(problems);
</script>
    
<div class="plant {item.state}">
  <Icon height={48} icon="{icons[item.state]}" />

  <div class="plant__main">
    <h5 class="plant__title">{item.attributes.friendly_name}</h5>

    <ul class="plant__details">
      {#if item.attributes.moisture != 'unavailable'}
        <li class="moisture">
          <Icon icon="mdi-water-percent" />
          {item.attributes.moisture} {item.attributes.unit_of_measurement_dict['moisture']}
        </li>
      {/if}
      {#if item.attributes.temperature != 'unavailable'}
        <li class="temperature">
          <Icon icon="mdi-temperature" />
          {item.attributes.temperature} {item.attributes.unit_of_measurement_dict['temperature']}
        </li>
      {/if}
      {#if item.attributes.conductivity != 'unavailable'}
      <li class="conductivity">
        <Icon icon="mdi-leaf" />
        {item.attributes.conductivity} {item.attributes.unit_of_measurement_dict['conductivity']}
      </li>
      {/if}
      {#if item.display_brightness && item.attributes.brightness != 'unavailable'}
        <li class="brightness">
          <Icon icon="mdi-sun" />
          {item.attributes.brightness} {item.attributes.unit_of_measurement_dict['brightness']}
        </li>
      {/if}
    </ul>
  </div>

  <ul class="plant__problems">
    <li class="plant__problems-moisture">
      {#if problems.includes('moisture_high')}
        &darr;
        <Icon height={32} icon="mdi-water-alert" />
      {/if}
      {#if problems.includes('moisture_low')}
        &uarr;
        <Icon height={32} icon="mdi-watering-can" />
      {/if}
    </li>

    <li class="plant__problems-conductivity">
      {#if problems.includes('conductivity_high')}
        &darr;
        <Icon height={32} icon="mdi-leaf" />
      {/if}
      {#if problems.includes('conductivity_low')}
        &uarr;
        <Icon height={32} icon="mdi-leaf-off" />
      {/if}
    </li>
  </ul>
</div>

<style>
  .plant {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
  }

  .plant__title {
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: .5rem;
  }

  .plant__details {
    list-style: none;
    padding: 0;
    display: flex;
    margin-left: auto;
    column-gap: .8rem;
    font-size: 1.1rem;
  }

  .plant__details li {
    display: flex;
    align-items: center;
    margin-top: .5rem;
  }

  .plant__problems {
    list-style: none;
    padding: 0;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1rem;
  }

  .plant__problems li {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: rgb(255, 155, 155);
  }
</style>