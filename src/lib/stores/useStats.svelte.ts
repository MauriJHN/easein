import { POMODORO_STATS_COOKIE } from "$lib/constants";

interface dailyStats {
    totalSessions: number;
    totalWorkDurationMs: number;
    totalRestDurationMs: number;
    averageWorkDurationMs?: number;
    averageRestDurationMs?: number;
}

interface weekDayStats {
    day: number;
    stats: dailyStats;
}

interface StatData {
    weeklySessionCount: number;
    weeklyWorkDurationMs: number;
    weeklyRestDurationMs: number;
    weekdayStats: weekDayStats[];
}

const INITIAL_WEEKDAY_STATS: weekDayStats[] = [
    { day: 0, stats: { totalSessions: 0, totalWorkDurationMs: 0, totalRestDurationMs: 0 } },
    { day: 1, stats: { totalSessions: 0, totalWorkDurationMs: 0, totalRestDurationMs: 0 } },
    { day: 2, stats: { totalSessions: 0, totalWorkDurationMs: 0, totalRestDurationMs: 0 } },
    { day: 3, stats: { totalSessions: 0, totalWorkDurationMs: 0, totalRestDurationMs: 0 } },
    { day: 4, stats: { totalSessions: 0, totalWorkDurationMs: 0, totalRestDurationMs: 0 } },
    { day: 5, stats: { totalSessions: 0, totalWorkDurationMs: 0, totalRestDurationMs: 0 } },
    { day: 6, stats: { totalSessions: 0, totalWorkDurationMs: 0, totalRestDurationMs: 0 } },
];


const INITIAL_STATS: StatData = {
    weeklySessionCount: 0,
    weeklyWorkDurationMs: 0,
    weeklyRestDurationMs: 0,
    weekdayStats: [...INITIAL_WEEKDAY_STATS],
};

class StatsStore {

    constructor() {
        this.loadFromCookies();
    }

    private _stats: StatData = $state<StatData>({ ...INITIAL_STATS });

    get stats(): Readonly<StatData> {
        return this._stats;
    }

    private _recordCurrentDayStats(workDurationMs: number = 0, restDurationMs: number = 0): weekDayStats | undefined {
        const todayStats: weekDayStats = this._stats.weekdayStats.find(ds => ds.day === new Date().getDay())!;
        todayStats.stats.totalWorkDurationMs += workDurationMs;
        todayStats.stats.totalRestDurationMs += restDurationMs;

        return todayStats
    }

    recordWorkSession(durationMs: number): void {
        this._stats.weeklyWorkDurationMs += durationMs;
        this._recordCurrentDayStats(durationMs, 0);
        this.persist();
    }

    recordRestSession(durationMs: number): void {
        // NOTE: only record session count on rest session completion
        this._stats.weeklyRestDurationMs += durationMs;
        this._stats.weeklySessionCount += 1;
        const todayStats = this._recordCurrentDayStats(0, durationMs)!;
        todayStats.stats.totalSessions += 1;
        this.persist();
    }

    getWeeklyStats(): StatData {
        let statData = this._stats;

        const averageWorkDurationMs = statData.weeklySessionCount > 0
            ? statData.weeklyWorkDurationMs / statData.weeklySessionCount
            : 0;

        const averageRestDurationMs = statData.weeklySessionCount > 0
            ? statData.weeklyRestDurationMs / statData.weeklySessionCount
            : 0;

        statData = Object.assign({}, statData, { averageWorkDurationMs, averageRestDurationMs });
        return statData;
    }

    getTodayStats(): weekDayStats | undefined {
        let statData = this._stats.weekdayStats.find(ds => ds.day === new Date().getDay())!;

        const averageWorkDurationMs = statData.stats.totalSessions > 0
            ? statData.stats.totalWorkDurationMs / statData.stats.totalSessions
            : 0;

        const averageRestDurationMs = statData.stats.totalSessions > 0
            ? statData.stats.totalRestDurationMs / statData.stats.totalSessions
            : 0;

        statData = Object.assign({}, statData, { stats: { ...statData.stats, averageWorkDurationMs, averageRestDurationMs, } });

        return statData;
    }

    async loadFromCookies(): Promise<void> {
        try {
            const cookie = await cookieStore.get('pomodoroStats');
            if (cookie?.value) {
                const saved = JSON.parse(cookie.value);
                Object.assign(this._stats, saved);
            } else {
                this._stats = { ...INITIAL_STATS };
                this.persist();
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

    __TEST_ONLY_getState(): StatData {
        if (import.meta.env.MODE !== 'test') {
            throw new Error('This method is only available in test mode');
        }
        return this._stats;
    }
}

export const statsStore = new StatsStore();