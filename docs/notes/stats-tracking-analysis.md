# Statistics Tracking

## Notes

- The session information could be tracked through a simple reactive object
- The component should have the logic to continuously update the state of the object and (simultaneously) store the values in cookies ~~or local storage~~

## When to Track

The following are notes on when the values for total time of work and rest sessions should be upated.

Stats should be updated when

- The user manually goes to the next stage, regardless whether they stopped the timer before
- When the timer completes a stage
- When the session is resetted
- When the stage is resetted

## Extracting Stats Logic

### Current use inside `Pomodoro.svelte`

- I am storing the statistical data as an object in a state called `stats`
- This data is being stored in the browser as a cookie
- The functions used to store and update the cookies are being called inside the callbacks for timer stages inside `useTimer`

### Evaluating use of Context

- Context would let the communication between what?
  - The parent component: `Pomodoro.svelte`
  - The child component: `useStats.svelte.ts`
- This could work as the parent could set the context and the child could just execute the functions to handle the data storage

## Basic Steps

1. Create a rune to track session data with the following info:
   1. Total work duration
   2. Average work duration per session
   3. Total rest duration
   4. Average rest duration
   5. Average long rest duration
2. Create functions to easily update the data using the `elapsedTime` state inside `Pomodoro.svelte`
3. Expose those functions inside the Pomodoro component
4. Test new functionality in demo page
