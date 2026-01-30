<script lang="ts">
    interface Props {
        toggleFlag: boolean;
        icon?: import('svelte').Snippet;
    }

    let { toggleFlag = $bindable(false), icon }: Props = $props();

    const toggle = () => {
        toggleFlag = !toggleFlag;
    }
</script>

<button class="toggle-control" onclick={toggle}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block">
        {#if icon}
            {@render icon()}
        {:else}
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="currentColor" />
        {/if}
        {#if !toggleFlag}
            <path d="M 2,2 l 20,20" stroke-width="2" stroke="currentColor" />
        {/if}
    </svg>
</button>