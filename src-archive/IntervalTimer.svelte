<script lang="ts">
	import { useTimer } from "./PomodoroDemo/useTimer.svelte";
	const timer = useTimer(5000, true, 1);
</script>

<div class="interval-timer">
	<p class="timer-display">{timer.formattedTime}</p>
	<p>Timer is running: {timer.isRunning}</p>
	<button onclick={timer.isRunning ? timer.pause : timer.start}>{timer.isRunning ? 'Pause' : 'Start'}</button>
	<button onclick={timer.start}>Empezar</button>
	<button onclick={timer.stop}>Reset</button>
</div>

<style>
	.interval-timer {
		width: 200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		color: #fff;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	.timer-display {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
	}
</style>
