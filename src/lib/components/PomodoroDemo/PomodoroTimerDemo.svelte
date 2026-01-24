<script>
	import { playNotificationSound } from './notificationSound';
	import { useTimer } from './useTimer.svelte';

	let {
		workDuration = 25 * 60,
		restDuration = 5 * 60,
		longRestDuration = 15 * 60,
		sessionsUntilLongRest = 4
	} = $props();
	let time = $state(workDuration);
	let isWorkStage = $state(true);
	let completedSessions = $state(0);
	let autoStartNextStage = $state(true);
	let timer = useTimer(workDuration, true, 1, () => { console.log('Attempting to play notification sound'); playNotificationSound(); } );

	// Syncs autostart setting with timer hook
	$effect(() => {
		timer.setAutoRestart(autoStartNextStage);
	});

	const isLongRest = $derived(
		!isWorkStage && completedSessions % sessionsUntilLongRest === 0 && completedSessions > 0
	);

	const getCurrentDuration = () => {
		if (isWorkStage) return workDuration;
		return isLongRest ? longRestDuration : restDuration;
	};

	const handleTimerComplete = () => {
		playNotificationSound();
		if (isWorkStage) {
			completedSessions++;
		}
		switchStage();
	};

	const switchStage = () => {
		isWorkStage = !isWorkStage;
		time = getCurrentDuration();
	};

	const manualSwitchStage = () => {
		isWorkStage = !isWorkStage;
		time = getCurrentDuration();
	};
</script>

<div class="pomodoro-timer">
	<div class="stage-indicator" class:work={isWorkStage} class:rest={!isWorkStage}>
		{#if isWorkStage}
			Work Session
		{:else if isLongRest}
			Long Rest
		{:else}
			Rest
		{/if}
	</div>
	<div class="session-counter">
		{completedSessions} / {sessionsUntilLongRest}
	</div>
	<div class="timer-display">
		{timer.formattedTime}
	</div>
	<div class="controls">
		<button onclick={timer.isRunning ? timer.pause : timer.start}>{timer.isRunning ? 'Pause' : 'Start'}</button>
		<button onclick={timer.stop}>Reset</button>
		<button onclick={manualSwitchStage} title="Switch to {isWorkStage ? 'rest' : 'work'}">
			Switch Stage
		</button>
	</div>
	<div class="settings">
		<label>
			<input type="checkbox" bind:checked={autoStartNextStage} />
			Auto-start next stage
		</label>
	</div>
</div>

<style>
	.pomodoro-timer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.stage-indicator {
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: background-color 0.3s;
	}

	.stage-indicator.work {
		background-color: #ef4444;
		color: white;
	}

	.stage-indicator.rest {
		background-color: #10b981;
		color: white;
	}

	.session-counter {
		font-size: 0.9rem;
		color: #666;
	}

	.timer-display {
		font-size: 3rem;
		font-weight: bold;
		font-variant-numeric: tabular-nums;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
	}

	.settings {
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}

	.settings label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	button {
		padding: 0.5rem 1rem;
		cursor: pointer;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		background-color: white;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #f5f5f5;
	}
</style>
