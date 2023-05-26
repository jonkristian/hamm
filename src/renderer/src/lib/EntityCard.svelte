<script lang="ts">
  import Icon from '@iconify/svelte';
  export let item;
</script>

<div class="entitycard">
  <Icon height={32} icon="{item.icon ? item.icon : ''}" />
  <h5>{item.title ? item.title : item.attributes.friendly_name}</h5>
  <span class="state">{item.state_prefix ? item.state_prefix : ''}{item.state_on ? item.state == 'on' ? item.state_on : item.state_off : item.state}{item.state_suffix ? item.state_suffix : ''}</span>
</div>

<style lang="scss">
  .entitycard {
    display: flex;
    flex-direction: row;
    column-gap: .8rem;
    align-items: center;
    margin-bottom: .5rem;
  }

  .state {
    color: #999;
  }
</style>
