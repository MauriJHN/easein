<script lang="ts">
	import BellIcon from './icons/BellIcon.svelte';
	import CycleIcon from './icons/CycleIcon.svelte';
	import ToggleControl from './ToggleControl.svelte';

	interface Props {
		isRunning: boolean;
		start: () => void;
		pause: () => void;
		stop: () => void;
		autoRestart: boolean;
		toggleNotificationSound: boolean;
		goToNextStage: () => void;
	}
	
	let {
		isRunning,
		start,
		pause,
		stop,
		autoRestart = $bindable(false),
		toggleNotificationSound = $bindable(false),
		goToNextStage
	}: Props = $props();
</script>

<div class="timer-controls">
	<div class="toggles">
		<div>
			<ToggleControl bind:toggleFlag={autoRestart}>
				{#snippet icon()}
					<CycleIcon />
				{/snippet}
			</ToggleControl>
		</div>
		<div>
			<ToggleControl bind:toggleFlag={toggleNotificationSound}>
				{#snippet icon()}
					<BellIcon />
				{/snippet}
			</ToggleControl>
		</div>
	</div>

	<div class="buttons">
		<button data-testid="start-pause-btn" onclick={isRunning ? pause : start}
			>{isRunning ? 'Pause' : 'Start'}</button
		>
		<button data-testid="reset-btn" onclick={stop}>Reset</button>
		<button data-testid="next-stage-btn" onclick={goToNextStage}>Next Stage</button>
	</div>
</div>

<style scoped>
	.timer-controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
	}

	.toggles {
		display: flex;
		gap: 10px;
	}

	.buttons {
		display: flex;
		gap: 5px;

		button {
			min-width: 110px;
			padding: 10px 20px;
			font-size: 1.1rem;
			border: 2px solid var(--color-text);
			border-radius: 20px;
			background-color: transparent;
			color: var(--color-text);
			cursor: pointer;
			transition: background-color 0.3s;

			&:hover {
				background-color: var(--color-primary);
			}
		}
	}


</style>
