<script lang="ts">
	import Pomodoro from "$lib/components/Pomodoro.svelte";
	import ConfigIcon from "$lib/components/icons/ConfigIcon.svelte";
</script>

<div class="page-wrapper">
	<div class="config-link-container">
		<a href="/configuration">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<ConfigIcon />
			</svg>
		</a>
	</div>
	
	<div class="content">
		<Pomodoro />
	</div>
</div>

<style>
	.config-link-container {
		display: flex;
		justify-content: center;
		padding: 1rem;
		
		a {
			color: var(--color-text);
			transition: color 0.3s;
		}
	}

	.page-wrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		text-align: center;
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