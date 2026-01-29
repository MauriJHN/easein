import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import TimerControls from './TimerControls.svelte';

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
        mount(TimerControls, { target, props: { isRunning: false, start: () => {}, pause: () => {}, stop: () => {}, autoRestart: false, toggleNotificationSound: false, goToNextStage: () => {} } });

        const autoStartCheckbox = target.querySelector('input[data-testid="auto-start-checkbox"]');
        expect(autoStartCheckbox).toBeInTheDocument();
        expect(autoStartCheckbox).not.toBeChecked();

        const notificationSoundCheckbox = target.querySelector('input[data-testid="notification-sound-checkbox"]');
        expect(notificationSoundCheckbox).toBeInTheDocument();
        expect(notificationSoundCheckbox).not.toBeChecked();
        
        const startPauseButton = target.querySelector('button[data-testid="start-pause-btn"]');
        expect(startPauseButton).toBeInTheDocument();
        expect(startPauseButton).toHaveTextContent('Start');

        const resetButton = target.querySelector('button[data-testid="reset-btn"]');
        expect(resetButton).toBeInTheDocument();

        const nextStageButton = target.querySelector('button[data-testid="next-stage-btn"]');
        expect(nextStageButton).toBeInTheDocument();
    });

    it('start/pause button shows "Pause" when running', () => {
        mount(TimerControls, { target, props: { isRunning: true, start: () => {}, pause: () => {}, stop: () => {}, autoRestart: false, toggleNotificationSound: false, goToNextStage: () => {} } });

        const startPauseButton = target.querySelector('button[data-testid="start-pause-btn"]');
        expect(startPauseButton).toBeInTheDocument();
        expect(startPauseButton).toHaveTextContent('Pause');
    });

    it('auto-start checkbox reflects prop', () => {
        mount(TimerControls, { target, props: { isRunning: false, start: () => {}, pause: () => {}, stop: () => {}, autoRestart: true, toggleNotificationSound: false, goToNextStage: () => {} } });

        const autoStartCheckbox = target.querySelector('input[data-testid="auto-start-checkbox"]');
        expect(autoStartCheckbox).toBeInTheDocument();
        expect(autoStartCheckbox).toBeChecked();
    });
    
    it('notification sound checkbox reflects prop', () => {
        mount(TimerControls, { target, props: { isRunning: false, start: () => {}, pause: () => {}, stop: () => {}, autoRestart: false, toggleNotificationSound: true, goToNextStage: () => {} } });
        const notificationSoundCheckbox = target.querySelector('input[data-testid="notification-sound-checkbox"]');
        expect(notificationSoundCheckbox).toBeInTheDocument();
        expect(notificationSoundCheckbox).toBeChecked();
    });
});