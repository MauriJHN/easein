<script lang="ts">
    import { playNotificationSound } from "./notificationSound";
	import { useTimer } from "./useTimer.svelte";

    // configuration values
    let toggleNotificationSound = $state(false);

	const Stages = {
		WORK: 'WORK',
		REST: 'REST'
	};
	let { workDurationMs = 25 * 1000, restDurationMs = 5 * 1000 } = $props();
	let currentStage = $state(Stages.WORK);
	let currentDuration = $derived(currentStage === Stages.WORK ? workDurationMs : restDurationMs);

	let timer = useTimer(currentDuration, 1);

	timer.onComplete = () => {
        playNotificationSound();
		timer.setDuration(
			currentStage === Stages.WORK ? restDurationMs : workDurationMs
		);

		if (currentStage === Stages.WORK) {
			currentStage = Stages.REST;
		} else {
			currentStage = Stages.WORK;
		}
	};

</script>

<div class="timer-container">
	<p data-testid="time-display">{timer.formattedTime}</p>
    <input type="checkbox" data-testid="auto-start-checkbox" bind:checked={timer.autoRestart} />
    <input type="checkbox" data-testid="notification-sound-checkbox" bind:checked={toggleNotificationSound} />

	<button data-testid="start-pause-btn" onclick={timer.isRunning ? timer.pause : timer.start}>{timer.isRunning ? 'Pause' : 'Start'}</button>
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
