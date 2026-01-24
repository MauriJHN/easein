# Reusable Timer Logic

This document contains notes on how to make a reusable timer logic to be implemented in Svelte component.

## How should the `.svelte.ts` file be used?

- There should be a `useTimer` exported function that offers methods and properties to set up a *simple timer* component
- The base use case would be a simple timer with a preset duration (duration will have a default value)
  - There should be functions to `start`, `pause`, `stop`, and `reset` the timer
  - There should be a flag that allows for the timer to run like a countdown or a stopwatch
  - There should be a method to change the duration of the timer

### Interval Timer Use Case

- Interval timers would essentially be a basic timer that changes the duration per each completion of a timer
- I believe that the duration could be changed mid timer completion, I could have a `currentDuration` variable that tracks the currently set duration (set by the user)
- The logic should also have a flag to allow the timer to restart right after completion

### Seconds Passing

- There could also be an option to slow down or hasten the passing of seconds in the timer
