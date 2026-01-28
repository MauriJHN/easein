<script lang="ts">
	import { TimerDirection, useTimer } from '$lib/components/PomodoroDemo/useTimer.svelte';
	/* requirements:
    - Home button at the top
    - A simple input for the timer duration
    - Start, Pause, and Reset buttons
    - Lap functionality to record intervals
    - Display for elapsed time
    */
	import '$lib/styles/nav-buttons.css';

	let durationInput = $state(60);
	let timer = useTimer(durationInput * 1000, 1, () => {}, TimerDirection.INCREASING);

	$effect(() => {
		timer.setDuration(durationInput * 1000);
	});
</script>

<a href="/apps" class="home-button">Back</a>

<div class="timer-container">
	<h1 class="app-title">Timer App</h1>
	<div class="timer-input">
		<div class="input-group">
			<label for="duration">Set Timer Duration (seconds): </label>
			<input id="duration" type="number" min="1" bind:value={durationInput} />
		</div>
		<div class="input-group">
			<label for="autostart"> Auto Start: </label>
			<input id="autostart" type="checkbox" bind:checked={timer.autoRestart} />
		</div>
	</div>
	<div>
		<button onclick={timer.start}>Start</button>
		<button onclick={timer.pause}>Pause</button>
		<button onclick={timer.stop}>Reset</button>
	</div>
	<div>
		<h2 class="timer-display">{timer.formattedTime}</h2>
	</div>
</div>

<style scoped>
	.timer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80vh;
	}

	.timer-input {
		margin: 20px 0;
	}

	.timer-display {
		font-size: 3em;
		margin: 20px 0;
	}

    .input-group {
        margin: 10px 0;
    }
</style>
