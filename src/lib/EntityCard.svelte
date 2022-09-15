<script lang="ts">
  import Icon from '@iconify/svelte';
  export let item;
</script>

<div class="entitycard">
  <Icon height={32} icon="{item.icon ? item.icon : item.attributes.icon}" />
  {item.title ? item.title : item.attributes.friendly_name}
  {item.state_on ? item.state == 'on' ? item.state_on : item.state_off : item.state}
</div>

<style lang="scss">
  .entitycard {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
    margin-bottom: .5rem;
  }
</style>