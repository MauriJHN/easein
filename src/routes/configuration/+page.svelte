<script lang="ts">
	import '$lib/styles/buttons.css';
	import DurationInput from '$lib/components/configuration/DurationInput.svelte';
	import { CONFIG } from '$lib/constants';
	import { configurationStore } from '$lib/stores/useConfig.svelte';
	import { formatTime } from '$lib/utils/format';

	let workDurationMs = $state(configurationStore.config.workDurationMs);
	let restDurationMs = $state(configurationStore.config.restDurationMs);
	let sessionMs = $derived(workDurationMs + restDurationMs);
	let workSplit = $derived(workDurationMs / sessionMs);
</script>

<div class="config-container">
	<a class="go-back-btn nav-btn" data-testid="go-back-btn" href="/">Go Back</a>
	<h1>Configuration</h1>

	<p class="info" data-testid="session-info">Session: <b>{formatTime(sessionMs)}</b></p>
	<p class="info" data-testid="work-split-info">
		Working <b>{Math.round(workSplit * 100)}%</b> of total session. Approximately
		<b>{Math.round(workSplit * 60)} minutes</b> each hour.
	</p>
	<div class="duration-inputs">
		<div>
			<p data-testid="work-info">Work (min)</p>
			<DurationInput bind:value={workDurationMs} />
		</div>
		<div>
			<p data-testid="rest-info">Rest (min)</p>
			<DurationInput bind:value={restDurationMs} />
		</div>
	</div>

	<button
		class="save-btn default-btn"
		onclick={() => {
			configurationStore.setConfigValue(CONFIG.WORK_DURATION_MS, workDurationMs);
			configurationStore.setConfigValue(CONFIG.REST_DURATION_MS, restDurationMs);
		}}
		data-testid="save-btn">Save</button
	>
</div>

<style scoped>
	.config-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
		font-size: 1.2rem;
	}

	h1 {
		font-size: 2rem;
		margin: 2rem 0 6rem 0;
		font-weight: 600;
		text-align: center;
	}

	.info {
		margin: 1.5rem 0 0.5rem 0;
		line-height: 1.6;

		b {
			color: var(--color-primary);
			font-weight: 600;
		}
	}

	p:first-of-type {
		margin-top: 1rem;
	}

	.go-back-btn {
		text-decoration: none;
		margin-bottom: 1rem;
		display: inline-block;
		font-size: 0.95rem;
		font-weight: 500;
		transition: color 0.2s;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
	}

	.duration-inputs {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-top: 1rem;

		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
		}
	}

	.save-btn {
		margin-top: 2rem;
		width: 100%;
		font-size: 1.1rem;
		font-weight: 600;
	}
</style>
