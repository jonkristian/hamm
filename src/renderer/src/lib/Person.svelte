<script lang="ts">
  import { t } from "../i18n";
  import Icon from '@iconify/svelte';
  export let item;
</script>

<div class="personcard">
  <Icon height={32} icon="{item.icon ? item.icon : item.attributes.icon}" />
  {item.title ? item.title : item.attributes.friendly_name}
  {item.state ? ($t(item.state)??item.state) : $t('not_home')}
</div>

<style lang="scss">
  .personcard {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
  }
</style>
