<script lang="ts">
  import PlantItem from "./PlantItem.svelte";
  export let item;
</script>

<div class="plants">
  {#each item.entities as plant}
    <PlantItem
    item="{plant}"
    />
  {/each}
</div>

<style>
  .plants {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
</style>
