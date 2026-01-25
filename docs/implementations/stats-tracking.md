# Statistics Tracking

## Notes

- The session information could be tracked through a simple reactive object
- The component should have the logic to continuously update the state of the object and (simultaneously) store the values in cookies ~~or local storage~~

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
