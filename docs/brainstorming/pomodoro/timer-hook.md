# How to use new `useTimer.svelte.ts` Hook

## Changing Stages

- This will need to be tracked within the Pomodoro component
- When the timer completes, there should be 2 changes:
  - The stage (tracked through state) should change
  - The `timer` hook should set the duration for the new stage
- The duration for the new stage might be changed right after the new stage starts
- There could be an additional option for the timer hook to include a rotating duration
- The pomodoro logic could be extracted to its own hook
