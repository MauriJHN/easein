export const DEFAULT_WORK_DURATION_MS = 25 * 60 * 1000;
export const DEFAULT_REST_DURATION_MS = 5 * 60 * 1000;
export const DEFAULT_LONG_REST_DURATION_MS = 15 * 60 * 1000;

export const PomodoroStage = {
    WORK: 'WORK',
    SHORT_REST: 'SHORT_REST',
    LONG_REST: 'LONG_REST',
} as const;

export type PomodoroStage = typeof PomodoroStage[keyof typeof PomodoroStage];

export const POMODORO_STATS_COOKIE = 'pomodoroStats';