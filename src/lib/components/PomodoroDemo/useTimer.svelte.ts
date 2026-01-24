export const TimerDirection = {
    INCREASING: 'increasing',
    DECREASING: 'decreasing',
}

export const useTimer = (initialDurationMs: number = 60, speedCoefficient: number = 1, onComplete: () => void = () => {}, direction: string = TimerDirection.DECREASING) => {
    const tick = 100; // Update every 100ms

    let autoRestart = $state(false);
    let durationMs = $state(initialDurationMs);
    let elapsedTime = $state(0);
    let startTime = $state(0);
    let intervalId: number | null | NodeJS.Timeout = $state(null);
    let isRunning = $state(false);
    let currentDuration = $derived(durationMs);

    const formattedTime = $derived(
        `${String(Math.floor((currentDuration - elapsedTime) / 1000 / 60)).padStart(2, '0')}:${String(
            Math.floor((currentDuration - elapsedTime) / 1000) % 60
        ).padStart(2, '0')}`
    );

    const setDuration = (newDurationMs: number) => {
        durationMs = newDurationMs;
    }

    const setSpeedCoefficient = (newSpeedCoefficient: number) => {
        speedCoefficient = newSpeedCoefficient;
    }

    const resetInterval = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    const handleTimerComplete = () => {
        stop();
        onComplete();
        if (autoRestart) start();
    };

    const start = () => {
        currentDuration = durationMs;

        if (!isRunning) {
            isRunning = true;

            if (!intervalId) {
                if (!startTime) startTime = Date.now();

                intervalId = setInterval(() => {
                    elapsedTime = (Date.now() - startTime) * speedCoefficient;

                    if (direction == TimerDirection.INCREASING) {
                        elapsedTime = currentDuration - elapsedTime;
                    }

                    if (direction == TimerDirection.INCREASING) {
                        if (elapsedTime < 0) handleTimerComplete();
                    } else if (elapsedTime >= currentDuration) {
                        handleTimerComplete();
                    }
                }, tick);
            }
        }
    };

    const pause = () => {
        if (isRunning) isRunning = false;
        resetInterval();
    };

    const stop = () => {
        isRunning = false;
        elapsedTime = 0;
        startTime = 0;
        resetInterval();
    };

    return {
        get autoRestart() { return autoRestart; },
        set autoRestart(value: boolean) { autoRestart = value; },
        get formattedTime() { return formattedTime; },
        get isRunning() { return isRunning; },
        get speedCoefficient() { return speedCoefficient; },
        set onComplete(callback: () => void) { onComplete = callback; },
        start,
        pause,
        stop,
        setDuration,
        setSpeedCoefficient,
    };
};