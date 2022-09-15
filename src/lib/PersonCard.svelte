<script lang="ts">
  import Icon from '@iconify/svelte';
  export let item;

  const states = {
    home: 'Hjemme',
    not_home: 'Borte',
    work: 'Arbeid',
};
</script>

<div class="personcard">
  <Icon height={32} icon="{item.icon ? item.icon : item.attributes.icon}" />
  {item.title ? item.title : item.attributes.friendly_name}
  {item.state in states ? states[item.state] : item.state}
</div>

<style lang="scss">
  .personcard {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
  }
</style>