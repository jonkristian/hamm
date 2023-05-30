<script lang="ts">
  export let item;
</script>

<div class="glance cols-{(item.columns ? item.columns : '2')}">
  {#each item.entities as entity}
    <div class="item {entity.attributes?.device_class}">
    <h1 class="title">{entity.title}</h1>
    <p class="state">{entity.state}<small class="unit">{entity.attributes?.unit_of_measurement}</small></p>
  </div>
  {/each}
</div>

<style lang="scss">
  .glance {
    display: flex;
    flex-direction: row;
    gap: var(--space-xl);
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .title {
    color: var(--color-secondary);
    font-size: var(--text-size-lg);
  }

  .state {
    font-size: var(--header-size-md);
    font-weight: 600;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-sm);
  }

  .temperature .state {
    gap: 0;
  }

  .unit {
    line-height: 2;
  }
</style>
