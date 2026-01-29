import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import TimerDisplay from './TimerDisplay.svelte';

describe('Pomodoro', () => {
    let target: HTMLElement;

    beforeEach(() => {
        vi.useFakeTimers();
        target = document.createElement('div');
        document.body.appendChild(target);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        unmount(target);
        document.body.removeChild(target);
    });

    it('renders correctly', () => {
        mount(TimerDisplay, { target, props: { elapsedTime: 0, currentDuration: 5000 } });
        expect(target.textContent).toContain('00:05');
    });

    it('renders formatted time properly', () => {
        mount(TimerDisplay, { target, props: { elapsedTime: 1000, currentDuration: 25000 } });
        expect(target.textContent).toContain('00:24');
    });

    it('renders formatted time properly in ascending order', () => {
        mount(TimerDisplay, { target, props: { elapsedTime: 1000, currentDuration: 25000, ascending: true } });
        expect(target.textContent).toContain('00:01');
    });
});