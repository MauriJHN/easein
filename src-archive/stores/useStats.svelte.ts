import { POMODORO_STATS_COOKIE } from "$lib/constants";

interface PomodoroStats {
    totalWorkSessions: number;
    totalWorkTimeMs: number;
    averageWorkSessionMs: number;
    totalRestSessions: number;
    totalRestTimeMs: number;
    averageRestSessionMs: number;
}

const INITIAL_STATS: PomodoroStats = {
    totalWorkSessions: 0,
    totalWorkTimeMs: 0,
    averageWorkSessionMs: 0,
    totalRestSessions: 0,
    totalRestTimeMs: 0,
    averageRestSessionMs: 0,
};

class PomodoroStatsStore {

    constructor() {
        this.loadFromCookies();
    }
    
    private _stats: PomodoroStats = $state<PomodoroStats>({ ...INITIAL_STATS });

    get stats(): Readonly<PomodoroStats> {
        return this._stats;
    }
    
    recordWorkSession(durationMs: number): void {
        this._stats.totalWorkSessions += 1;
        this._stats.totalWorkTimeMs += durationMs;
        this._stats.averageWorkSessionMs = Math.floor(this._stats.totalWorkTimeMs / this._stats.totalWorkSessions);
        this.persist();
    }

    recordRestSession(durationMs: number): void {
        this._stats.totalRestSessions += 1;
        this._stats.totalRestTimeMs += durationMs;
        this._stats.averageRestSessionMs = Math.floor(this._stats.totalRestTimeMs / this._stats.totalRestSessions);
        this.persist();
    }

    async loadFromCookies(): Promise<void> {
        try {
            const cookie = await cookieStore.get('pomodoroStats');
            if (cookie?.value) {
                const saved = JSON.parse(cookie.value);
                Object.assign(this._stats, saved);
            }
        } catch (error) {
            console.error('Failed to load stats from cookies', error);
        }
    }

    private persist(): void {
        try {
            cookieStore.set({
                name: POMODORO_STATS_COOKIE,
                value: JSON.stringify(this._stats),
                expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
                path: '/',
            });
        } catch (error) {
            console.error('Failed to persist stats to cookies: ', error);
        }
    }

    reset(): void {
        this._stats = { ...INITIAL_STATS };
        this.persist();
    }

    __TEST_ONLY_getState(): PomodoroStats {
        if (import.meta.env.MODE !== 'test') {
            throw new Error('This method is only available in test mode');
        }
        return this._stats;
    }
}

export const pomodoroStats = new PomodoroStatsStore();