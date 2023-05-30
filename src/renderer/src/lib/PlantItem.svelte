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
</script>

<div class="plant {item.state}">
  <div class="content">
    <header class="header">
      <Icon height={32} icon="{icons[item.state]}" />
      <h1 class="title">{item.title??item.attributes?.friendly_name}</h1>
    </header>

    <ul class="details">
      {#if item.attributes.moisture != 'unavailable'}
        <li class="moisture">
          <Icon icon="mdi-water-percent" />
          {item.attributes.moisture}{item.attributes.unit_of_measurement_dict['moisture']}
        </li>
      {/if}
      {#if item.attributes.temperature != 'unavailable'}
        <li class="temperature">
          <Icon icon="mdi-temperature" />
          {item.attributes.temperature}{item.attributes.unit_of_measurement_dict['temperature']}
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

  <ul class="problems">
    <li class="problems-moisture">
      {#if problems.includes('moisture_high')}
        ▾
        <Icon height={32} icon="mdi-water-alert" />
      {/if}
      {#if problems.includes('moisture_low')}
        ▴
        <Icon height={32} icon="mdi-watering-can" />
      {/if}
    </li>

    <li class="problems-conductivity">
      {#if problems.includes('conductivity_high')}
        ▾
        <Icon height={32} icon="mdi-leaf" />
      {/if}
      {#if problems.includes('conductivity_low')}
        ▴
        <Icon height={32} icon="mdi-leaf-off" />
      {/if}
    </li>
  </ul>
</div>

<style lang="scss">
  .plant {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: var(--space-md);
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
    flex-direction: row;
    gap: var(--space-sm);
  }

  .title {
    font-size: var(--text-size-lg);
    font-weight: 600;
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: var(--space-sm);
  }

  .details {
    list-style: none;
    padding: 0;
    display: flex;
    margin-left: auto;
    margin-top: var(--space-sm);
    column-gap: var(--space-md);
    font-size: var(--text-size-sm);
  }

  .details li {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: var(--color-secondary);
  }

  .problems {
    list-style: none;
    padding: 0;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: var(--space-md);
  }

  .problems li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--text-size-lg);
    color: var(--color-red);
  }
</style>
