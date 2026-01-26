<script lang="ts">
	import { playNotificationSound } from './notificationSound';
	import { useTimer } from './useTimer.svelte';
	import { PomodoroStage } from '$lib/constants';
	import { pomodoroStats } from '$lib/stores/useStats.svelte';

	let { workDurationMs = 25 * 1000, restDurationMs = 5 * 1000 } = $props();
	let currentStage = $state(PomodoroStage.WORK);
	let currentDuration = $derived(currentStage === PomodoroStage.WORK ? workDurationMs : restDurationMs);

	// configuration values
	let toggleNotificationSound = $state(false);

	let timer = useTimer(currentDuration, 1);

	timer.onTimerReset = () => {
		const elapsed = timer.getCurrentElapsedTime();

		if (elapsed > 1000) {
			if (currentStage === PomodoroStage.WORK) {
				pomodoroStats.recordWorkSession(elapsed);
			} else {
				pomodoroStats.recordRestSession(elapsed);
			}
		}
	};
	
	timer.onComplete = () => {
		playNotificationSound();
		timer.setDuration(currentStage === PomodoroStage.WORK ? restDurationMs : workDurationMs);

		if (currentStage === PomodoroStage.WORK) {
			currentStage = PomodoroStage.SHORT_REST;
		} else {
			currentStage = PomodoroStage.WORK;
		}

	};
</script>

<div class="timer-container">
	<p data-testid="time-display">{timer.formattedTime}</p>
	<input type="checkbox" data-testid="auto-start-checkbox" bind:checked={timer.autoRestart} />
	<input
		type="checkbox"
		data-testid="notification-sound-checkbox"
		bind:checked={toggleNotificationSound}
	/>

	<button data-testid="start-pause-btn" onclick={timer.isRunning ? timer.pause : timer.start}
		>{timer.isRunning ? 'Pause' : 'Start'}</button
	>
	<button data-testid="stop-btn" onclick={timer.stop}>Stop</button>
</div>

<style>
	.timer-container {
		width: 300px;
		height: 250px;
		margin: 50px auto 0;
		padding: 10px;
		text-align: center;
		background: #333;
		color: #fff;
		border-radius: 20px;

		p {
			font-size: 48px;
		}
	}
</style>
