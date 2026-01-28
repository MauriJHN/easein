import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import Pomodoro from './Pomodoro.svelte';

describe('Pomodoro', () => {
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

    it('renders with default work duration (25 seconds)', () => {
        mount(Pomodoro, { target });
        expect(target.textContent).toContain('00:25');
    });

    it('renders with custom work duration in milliseconds', () => {
        mount(Pomodoro, { target, props: { workDurationMs: 10 * 1000 } });
        expect(target.textContent).toContain('00:10');
    });

    it('starts timer when Start button is clicked', async () => {
        mount(Pomodoro, { target });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        await vi.waitFor(() => expect(target.textContent).toContain('Pause'));
    });

    it('counts down when timer is running', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 5000 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:04'));
        
        vi.advanceTimersByTime(1000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:03'));
    });

    it('pauses timer when Pause button is clicked', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 10000 } });
        const startPauseButton: HTMLButtonElement = target.querySelector('button[data-testid="start-pause-btn"]')!;
        const timeDisplay:HTMLParagraphElement = target.querySelector('p[data-testid="time-display"]')!;

        expect(timeDisplay.textContent).toContain('00:10');
        expect(startPauseButton.textContent).toContain('Start');

        startPauseButton.click();
        await vi.waitFor(() => expect(startPauseButton.textContent).toContain('Pause'));
        
        vi.advanceTimersByTime(2800);
        await vi.waitFor(() => expect(timeDisplay.textContent).toContain('00:07'));
        
        startPauseButton.click();
        await vi.waitFor(() => expect(startPauseButton.textContent).toContain('Start'));
        
        vi.advanceTimersByTime(2000);
        await vi.waitFor(() => expect(timeDisplay.textContent).toContain('00:07'));
    });

    it('resets timer to work duration when Stop is clicked', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 10000 } });
        const startPauseButton: HTMLButtonElement = target.querySelector('button[data-testid="start-pause-btn"]')!;
        const timeDisplay:HTMLParagraphElement = target.querySelector('p[data-testid="time-display"]')!;

        expect(timeDisplay.textContent).toContain('00:10');
        expect(startPauseButton.textContent).toContain('Start');
        
        startPauseButton.click();
        vi.advanceTimersByTime(4800);
        await vi.waitFor(() => expect(timeDisplay.textContent).toContain('00:05'));
        
        const stopButton: HTMLButtonElement = target.querySelector('button[data-testid="stop-btn"]')!;
        stopButton.click();
        
        await vi.waitFor(() => expect(timeDisplay.textContent).toContain('00:10'));
        await vi.waitFor(() => expect(startPauseButton.textContent).toContain('Start'));
    });

    it('switches to rest stage and resets when work timer completes', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 3000, restDurationMs: 5000 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        
        vi.advanceTimersByTime(3000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:05'));
        expect(target.textContent).toContain('Start');
    });

    it('formats time correctly with leading zeros', () => {
        mount(Pomodoro, { target, props: { workDurationMs: 65000 } });
        expect(target.textContent).toContain('01:05');
    });

    it('switches to rest stage duration after work completes', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 2000, restDurationMs: 3000 } });
        const startButton = target.querySelector('button');
        
        startButton?.click();
        vi.advanceTimersByTime(2000);
        
        await vi.waitFor(() => expect(target.textContent).toContain('00:03'));
    });

    it('switches back to work stage after rest completes', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 2000, restDurationMs: 2000 } });
        const checkboxes = target.querySelectorAll('input[type="checkbox"]');
        (checkboxes[0] as HTMLInputElement).click(); // Enable auto-start
        
        const startButton = target.querySelector('button');
        startButton?.click();
        
        vi.advanceTimersByTime(2000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:02'));
        
        vi.advanceTimersByTime(2000);
        await vi.waitFor(() => expect(target.textContent).toContain('00:02'));
    });

    it('does not auto-start next stage when auto-start is disabled (default)', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 2000, restDurationMs: 3000 } });
        
        const startButton = target.querySelector('button');
        startButton?.click();
        vi.advanceTimersByTime(2000);
        
        await vi.waitFor(() => expect(target.textContent).toContain('00:03'));
        expect(target.textContent).toContain('Start');
    });

    it('auto-starts next stage when auto-start is enabled', async () => {
        mount(Pomodoro, { target, props: { workDurationMs: 2000, restDurationMs: 3000 } });
        
        const checkboxes = target.querySelectorAll('input[type="checkbox"]');
        (checkboxes[0] as HTMLInputElement).click(); // Enable auto-start
        
        const startButton = target.querySelector('button');
        startButton?.click();
        vi.advanceTimersByTime(2000);
        
        await vi.waitFor(() => expect(target.textContent).toContain('Pause'));
        await vi.waitFor(() => expect(target.textContent).toContain('00:02'));
    });

    it('has two checkboxes for auto-start and notification sound', () => {
        mount(Pomodoro, { target });
        const checkboxes = target.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes.length).toBe(2);
    });

    it('has Start/Pause and Stop buttons', () => {
        mount(Pomodoro, { target });
        const buttons = target.querySelectorAll('button');
        expect(buttons.length).toBe(2);
        expect(buttons[0].textContent).toContain('Start');
        expect(buttons[1].textContent).toContain('Stop');
    });
});