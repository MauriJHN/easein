<script lang="ts">
    let { elapsedTime, currentDuration, ascending = $bindable(false) } = $props();
    
    let passingTime = $derived( ascending ? elapsedTime : (currentDuration - elapsedTime));
    let formattedTime = $derived(
        `${String(Math.floor((passingTime) / 1000 / 60)).padStart(2, '0')}:${String(
            Math.floor((passingTime) / 1000) % 60
        ).padStart(2, '0')}`
    );
</script>

<div class="timer-display mono-font">
    <p data-testid="time-display">{formattedTime}</p>
</div>

<style scoped>
    .timer-display {
        font-size: 7rem;
        font-weight: bold;
    }
</style>