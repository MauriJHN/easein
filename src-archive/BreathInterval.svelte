<script lang="ts">
    import { useTimer } from "./PomodoroDemo/useTimer.svelte";
    let speedCoefficientInput: HTMLInputElement;

    const timer = useTimer(10 * 1000, true, 0.5);
    const timer2 = useTimer(10 * 1000, true, 1);

    const starTimers = () => {
        timer.start();
        timer2.start();
    }

    const pauseTimers = () => {
        timer.pause();
        timer2.pause();
    }

    const timersRunning = () => {
        return timer.isRunning || timer2.isRunning;
    }
</script>

<div class="breathing-demo">
    <input bind:this={speedCoefficientInput} type="range" min="0.1" max="5" step="0.1" />
    <button onclick={() => timer.setSpeedCoefficient(parseFloat(speedCoefficientInput.value))}>Set Speed Coefficient</button>
    <p>Speed coefficient: {timer.speedCoefficient}</p>
    <p>Timer A: {timer.formattedTime}</p>
    <p>Timer B: {timer2.formattedTime}</p>
    <button onclick={timersRunning() ? pauseTimers : starTimers}>{timersRunning() ? 'Pause' : 'Start'}</button>
    <button onclick={() => { timer.stop(); timer2.stop(); }}>Reset</button>
</div>