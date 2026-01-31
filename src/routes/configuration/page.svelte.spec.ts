import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('configuration/+page.svelte', () => {
	it('renders all elements and components', async () => {
		render(Page);

        const backButton = document.querySelector('a[data-testid="go-back-btn"]');
        const sessionInfo = document.querySelector('p[data-testid="session-info"]');
        const workSplitInfo = document.querySelector('p[data-testid="work-split-info"]');
        const durationInputs = document.querySelectorAll('div[data-testid="duration-input"]');
        const saveButton = document.querySelector('button[data-testid="save-btn"]');

        expect(backButton).toBeInTheDocument();
        expect(sessionInfo).toBeInTheDocument();
        expect(workSplitInfo).toBeInTheDocument();
        expect(durationInputs.length).toBe(2);
        expect(saveButton).toBeInTheDocument();
	});
});
