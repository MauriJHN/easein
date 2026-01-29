<script lang="ts">
	import { playNotificationSound } from '../utils/notificationSound';
	import { useTimer } from '$lib/hooks/useTimer.svelte';
	import { PomodoroStage } from '$lib/constants';
	import TimerDisplay from './TimerDisplay.svelte';
	import TimerControls from './TimerControls.svelte';

	let { workDurationMs = 25 * 60 * 1000, restDurationMs = 5 * 60 * 1000 } = $props();
	let currentStage: string = $state(PomodoroStage.WORK);
	let currentDuration = $derived(
		currentStage === PomodoroStage.WORK ? workDurationMs : restDurationMs
	);

	// configuration values
	let toggleNotificationSound = $state(false);

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
		playNotificationSound();
		goToNextStage();
	};

	let ascending = $state(false);
</script>

<div class="timer-container">
	<TimerDisplay elapsedTime={timer.elapsedTime} {currentDuration} {ascending} />
	<TimerControls isRunning={timer.isRunning} start={timer.start} pause={timer.pause} stop={timer.stop} autoRestart={timer.autoRestart} toggleNotificationSound={toggleNotificationSound} goToNextStage={goToNextStage} />
</div>

<style scoped>
	.timer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		/* background-color: #282c34; */
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}
</style>
