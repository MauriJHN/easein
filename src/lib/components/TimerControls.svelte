<script lang="ts">
	let { isRunning, start, pause, stop, autoRestart, toggleNotificationSound, goToNextStage } = $props();
</script>

<div class="timer-controls">
    <div class="toggles">
        <div>
            <input id="auto-start" type="checkbox" data-testid="auto-start-checkbox" bind:checked={autoRestart} />
            <label for="auto-start">Auto Start Next Stage</label>
        </div>
        <div>
            <input id="notification-sound" type="checkbox" data-testid="notification-sound-checkbox" bind:checked={toggleNotificationSound} />
            <label for="notification-sound">Notification Sound</label>
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
        margin-top: 20px;
    }

    .toggles {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .buttons {
        display: flex;
        gap: 10px;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: #555;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #777;
    }
</style>
