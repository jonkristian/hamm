<script lang="ts">
  import Icon from '@iconify/svelte';
  export let item;

  const states = {
    'home': 'er hjemme',
    'not_home': 'er borte',
    'work': 'på arbeid',
};
</script>

<div class="personcard">
  <Icon height={32} icon="{item.icon ? item.icon : item.attributes.icon}" />
  {item.title ? item.title : item.attributes.friendly_name}
  {item.state in states ? states[item.state] : 'er borte'}
</div>

<style lang="scss">
  .personcard {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
  }
</style>
