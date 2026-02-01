<script lang="ts">
    import '$lib/styles/buttons.css';
    import { statsStore } from "$lib/stores/useStats.svelte";
    import { formatTimeForStats } from "$lib/utils/format";
</script>

<div class="statistics-container">
    <a class="go-back-btn nav-btn" data-testid="go-back-btn" href="/">Go Back</a>

    <h1>Today's Statistics</h1>
    {#if statsStore.getTodayStats() }
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">{statsStore.getTodayStats()!.stats.totalSessions}</div>
                <div class="stat-label">Sessions</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{formatTimeForStats(statsStore.getTodayStats()!.stats.totalWorkDurationMs)}</div>
                <div class="stat-label">Work Time</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{formatTimeForStats(statsStore.getTodayStats()!.stats.totalRestDurationMs)}</div>
                <div class="stat-label">Rest Time</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{formatTimeForStats(statsStore.getTodayStats()!.stats.averageWorkDurationMs!)}</div>
                <div class="stat-label">Average Work Time</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{formatTimeForStats(statsStore.getTodayStats()!.stats.averageRestDurationMs!)}</div>
                <div class="stat-label">Average Rest Time</div>
            </div>
        </div>
    {:else}
        <div class="empty-state">
            <p>No statistics available for today.</p>
            <p class="text-secondary">Start a session to see your stats!</p>
        </div>
    {/if}
</div>

<style scoped>
    .statistics-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
    }

    h1 {
        font-size: 2.5rem;
        margin: 0 0 2.5rem 0;
        font-weight: 600;
        text-align: center;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 1rem;
        padding: 2rem 1.5rem;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }

    .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: #6366f1;
        margin-bottom: 0.5rem;
        line-height: 1;
    }

    .stat-label {
        font-size: 0.95rem;
        color: #6b7280;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .empty-state {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 1rem;
        padding: 3rem 2rem;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .empty-state p {
        margin: 0;
        font-size: 1.1rem;
        color: #1f2937;
    }

    .text-secondary {
        color: #6b7280;
        font-size: 0.95rem !important;
        margin-top: 0.5rem !important;
    }
</style>