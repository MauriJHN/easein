<script lang="ts">
	import SvgBackground from "$lib/components/SvgBackground.svelte";
</script>

<div class="page-wrapper">
	<div class="background">
		<SvgBackground />
	</div>

	<div class="content">
		<h1 class="mono-font">Coming Soon</h1>
		<p>Ease into either, work or rest</p>
	</div>
</div>

<style>

	.page-wrapper {
		position: relative;
		min-height: 100vh;
	}

	.background {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-align: center;
		/* background-color: var(--color-bg); */
		color: var(--color-text);
	}

	h1 {
		font-size: 6rem;
		margin: 0;
	}

	p {
		font-size: 1.5rem;
		margin-top: 1rem;
	}
</style>