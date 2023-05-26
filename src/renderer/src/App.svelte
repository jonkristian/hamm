<script lang="ts">
  import "@fontsource/arimo";

  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Test from './routes/Test.svelte';
</script>

<Router routes={{
	'/': Home,
	'/test': Test,
}} />
