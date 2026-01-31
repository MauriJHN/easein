<script lang="ts">
	import { playNotificationSound } from '../utils/notificationSound';
	import { useTimer } from '$lib/hooks/useTimer.svelte';
	import { PomodoroStage } from '$lib/constants';
	import TimerDisplay from './TimerDisplay.svelte';
	import TimerControls from './TimerControls.svelte';
	import { configurationStore } from '$lib/stores/useConfig.svelte';

	let config = configurationStore.config;
	let { workDurationMs = config.workDurationMs, restDurationMs = config.restDurationMs } = $props();
	let currentStage: string = $state(PomodoroStage.WORK);
	let currentDuration = $derived(
		currentStage === PomodoroStage.WORK ? workDurationMs : restDurationMs
	);
	let timer = useTimer(currentDuration, 1);

	const goToNextStage = () => {
		if (currentStage === PomodoroStage.WORK) {
			currentStage = PomodoroStage.SHORT_REST;
			timer.setDuration(restDurationMs);
		} else {
			currentStage = PomodoroStage.WORK;
			timer.setDuration(workDurationMs);
		}
	};

	timer.onComplete = () => {
		if (config.toggleNotificationSound) playNotificationSound();
		goToNextStage();
	};

	let ascending = $state(false);
</script>

<div class="timer-container">
	<TimerDisplay elapsedTime={timer.elapsedTime} {currentDuration} {ascending} />
	<TimerControls isRunning={timer.isRunning} start={timer.start} pause={timer.pause} stop={timer.stop} bind:autoRestart={timer.autoRestart} bind:toggleNotificationSound={config.toggleNotificationSound} goToNextStage={goToNextStage} />
</div>

<style scoped>
	.timer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
</style>
