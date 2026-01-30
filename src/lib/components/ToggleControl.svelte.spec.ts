import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import ToggleControl from './ToggleControl.svelte';

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
        mount(ToggleControl, { target, props: { toggleFlag: false }});

        const toggleControlButton = target.querySelector('button[data-testid="toggle-control-btn"]');
        expect(toggleControlButton).toBeInTheDocument();
        
        const toggleOffPath = target.querySelector('path[data-testid="toggle-off-path"]');
        expect(toggleOffPath).toBeInTheDocument();
    });

    it('removes toggle off path when clicked', async () => {
        mount(ToggleControl, { target, props: { toggleFlag: false }});

        const toggleControlButton = target.querySelector('button[data-testid="toggle-control-btn"]') as HTMLButtonElement;
        expect(toggleControlButton).toBeInTheDocument();

        await toggleControlButton.click();

        const toggleOffPath = target.querySelector('path[data-testid="toggle-off-path"]');
        expect(toggleOffPath).not.toBeInTheDocument();
    });
});