<script lang="ts">
    import { pomodoroStats } from "$lib/stores/useStats.svelte";

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 1000 / 60);
        const seconds = Math.floor(ms / 1000 % 60);
        return `${minutes}m ${seconds}s`
    }

    const resetStats = () => {
        if (confirm('Are you sure you want to reset all statistics?')) {
            pomodoroStats.reset();
        }
    }
</script>

<div class="stats-page">
    <h1>Pomodoro Statistics</h1>

    <section class="stats-grid">
        <div class="stat-card">
            <h2>Work Sessions</h2>
            <p class="big-number">
                {pomodoroStats.stats.totalWorkSessions}
            </p>
            <p class="detail">
                Total Time: {formatTime(pomodoroStats.stats.totalWorkTimeMs)}
            </p>
            <p class="detail">
                Average: {formatTime(pomodoroStats.stats.averageWorkSessionMs)}
            </p>
        </div>

        <div class="stat-card">
            <h2>Rest Sessions</h2>
            <p class="big-number">
                {pomodoroStats.stats.totalRestSessions}
            </p>
            <p class="detail">
                Total Time: {formatTime(pomodoroStats.stats.totalRestTimeMs)}
            </p>
            <p class="detail">
                Average: {formatTime(pomodoroStats.stats.averageRestSessionMs)}
            </p>
        </div>
    </section>

    <button class="danger" onclick={resetStats}>Reset All Statistics</button>
</div>

<style>
    .stats-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
    }

    .stat-card {
        background: #f5f5f5;
        padding: 2rem;
        border-radius: 8px;
    }

    .big-number {
        font-size: 3rem;
        font-weight: bold;
        margin: 1rem 0;
    }

    .detail {
        color: #666;
        margin: 0.5rem 0;
    }

    .danger {
        background: #dc3545;
        color: #fff;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
    }
</style>