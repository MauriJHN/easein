export const TIMER_TICK_MS = 100;

export const TimerDirection = {
    INCREASING: 'increasing',
    DECREASING: 'decreasing',
} as const;

export type TimerDirection = typeof TimerDirection[keyof typeof TimerDirection];