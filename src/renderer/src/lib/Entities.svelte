<script lang="ts">
  import {t} from '../i18n';
  import Icon from '@iconify/svelte';
  export let item;
</script>

<div class="entities">
  {#each item.entities as entity}
    <div class="entity">
      {#if entity.icon}
        <Icon height={32} icon="{entity.icon}" />
      {:else if entity.attributes.icon}
        <Icon height={32} icon="{entity.attributes.icon}" />
      {:else if entity.entity_id.startsWith('light')}
        <Icon height={32} icon="mdi:ceiling-light" />
      {:else}
        ''
      {/if}

      <header class="header">
        <h1 class="title">
          {#if entity.title}
            {entity.title}
          {:else if entity.attributes.friendly_name}
            {entity.attributes.friendly_name}
          {:else}
            {$t('missing_name')}
          {/if}
        </h1>
        <p class="state">
          {#if entity.state == 'on'}
            {entity.state_true ?? $t(entity.state)}
          {:else}
            {entity.state_false ?? $t(entity.state)}
          {/if}
        </p>
      </header>
    </div>
  {/each}
</div>

<style lang="scss">
  .entities {
    max-width: fit-content;
  }

  .entity {
    display: flex;
    flex-direction: row;
    gap: var(--space-sm);
    align-items: center;
    margin-bottom: var(--space-sm);
    transform: translateX(-6px);
  }

  .header {
    display: flex;
    flex-direction: row;
    gap: var(--space-lg);
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .title {
    font-size: var(--text-size-lg);
  }

  .state {
    font-size: var(--text-size-sm);
    color: var(--color-secondary);
  }
</style>
