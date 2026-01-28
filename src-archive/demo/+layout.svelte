<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import '$lib/styles/nav-buttons.css';
    
    let { children } = $props();
</script>

{#if page.url.pathname !== '/demo'}
<a href="{resolve('/demo')}" class="home-button">Demos</a>
{/if}

{@render children()}