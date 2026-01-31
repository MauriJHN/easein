import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import DurationInput from './DurationInput.svelte';

describe('DurationInput', () => {
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

    it('renders correctly with default props', () => {
        mount(DurationInput, { target, props: { value: 60000 } });

        const decrementButton = target.querySelector('button.decrement');
        expect(decrementButton).toBeInTheDocument();
        expect(decrementButton).toHaveTextContent('-');

        const incrementButton = target.querySelector('button.increment');
        expect(incrementButton).toBeInTheDocument();
        expect(incrementButton).toHaveTextContent('+');
        
        const timeDisplay = target.querySelector('.time-display p');
        expect(timeDisplay).toBeInTheDocument();
        expect(timeDisplay).toHaveTextContent('01:00');
    });
});