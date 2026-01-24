import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import PomodoroTimer from '$lib/components/PomodoroTimer.svelte';

describe('PomodoroTimer', () => {
    let target: HTMLElement;

    beforeEach(() => {
        vi.useFakeTimers();
        target = document.createElement('div');
        document.body.appendChild(target);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        // unmount(target);
        document.body.removeChild(target);
    });

    it('renders with default work duration (25 minutes)', () => {
        mount(PomodoroTimer, { target });
        expect(target.textContent).toContain('25:00');
    });

    it('renders with custom work duration', () => {
        mount(PomodoroTimer, { target, props: { workDuration: 10 * 60 } });
        expect(target.textContent).toContain('10:00');
    });

    it('starts timer when Start button is clicked', async () => {
        mount(PomodoroTimer, { target });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        await vi.waitFor(() => expect(target.textContent).toContain('Pause'));
    });

    it('counts down when timer is running', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 5 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:04'));
        
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:03'));
    });

    it('pauses timer when Pause button is clicked', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 10 } });
        const buttons = target.querySelectorAll('button');
        
        buttons[0].click();
        vi.advanceTimersByTime(3000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:07'));
        
        buttons[0].click();
        expect(target.textContent).toContain('Start');
        
        vi.advanceTimersByTime(2000);
        expect(target.textContent).toContain('00:07');
    });

    it('resets timer to work duration', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 10 } });
        const buttons = target.querySelectorAll('button');
        
        buttons[0].click();
        vi.advanceTimersByTime(5000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:05'));
        
        buttons[1].click();
        
        expect(target.textContent).toContain('00:10');
        expect(target.textContent).toContain('Start');
    });

    it('stops timer when reaching zero', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 3 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        
        vi.advanceTimersByTime(3000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:00'));
        expect(target.textContent).toContain('Start');
    });

    it('formats time correctly with leading zeros', () => {
        mount(PomodoroTimer, { target, props: { workDuration: 65 } });
        expect(target.textContent).toContain('01:05');
    });

    it('displays work stage indicator', () => {
        mount(PomodoroTimer, { target });
        expect(target.textContent).toContain('Work Session');
    });

    it('switches to rest stage when work completes with auto-start enabled', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 2, restDuration: 3 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        vi.advanceTimersByTime(2000);
        
        await vi.waitFor(() => expect(target.textContent).toContain('Rest'));
        expect(target.textContent).toContain('00:03');
    });

    it('switches to work stage when rest completes', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 2, restDuration: 2 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        vi.advanceTimersByTime(2000);
        await vi.waitFor(() => expect(target.textContent).toContain('Rest'));
        
        vi.advanceTimersByTime(2000);
        await vi.waitFor(() => expect(target.textContent).toContain('Work Session'));
        expect(target.textContent).toContain('00:02');
    });

    it('increments completed sessions counter after each work session', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 2, restDuration: 2, sessionsUntilLongRest: 4 } });
        
        expect(target.textContent).toContain('0 / 4');
        
        const startButton = target.querySelector('button');
        startButton?.click();
        vi.advanceTimersByTime(2000);
        await vi.waitFor(() => expect(target.textContent).toContain('1 / 4'));
    });

    it('shows long rest after completing sessions until long rest', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 1, restDuration: 1, longRestDuration: 5, sessionsUntilLongRest: 2 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('Rest'));
        
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('Work Session'));
        
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('Long Rest'));
        expect(target.textContent).toContain('00:05');
    });

    it('manually switches stage with Switch Stage button', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 10, restDuration: 5 } });
        
        expect(target.textContent).toContain('Work Session');
        
        const buttons = target.querySelectorAll('button');
        buttons[2].click();
        
        await vi.waitFor(() => expect(target.textContent).toContain('Rest'));
        expect(target.textContent).toContain('00:05');
    });

    it('stops timer when manually switching stage', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 10 } });
        const buttons = target.querySelectorAll('button');
        
        buttons[0].click();
        vi.advanceTimersByTime(3000);
        
        buttons[2].click();
        
        await vi.waitFor(() => expect(target.textContent).toContain('Start'));
    });

    it('does not auto-start next stage when auto-start is disabled', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 2, restDuration: 3 } });
        
        const checkbox = target.querySelector('input[type="checkbox"]') as HTMLInputElement;
        checkbox?.click();
        
        const startButton = target.querySelector('button');
        startButton?.click();
        vi.advanceTimersByTime(2000);
        
        await vi.waitFor(() => expect(target.textContent).toContain('Rest'));
        expect(target.textContent).toContain('Start');
    });

    it('resets completed sessions when reset button is clicked', async () => {
        mount(PomodoroTimer, { target, props: { workDuration: 1, restDuration: 1 } });
        const buttons = target.querySelectorAll('button');
        
        buttons[0].click();
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('1 / 4'));
        
        buttons[1].click();
        
        expect(target.textContent).toContain('0 / 4');
        expect(target.textContent).toContain('Work Session');
    });
});