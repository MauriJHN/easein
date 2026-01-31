# Incremental Timer Durations

Just brainstorming how the feature to increment either work or rest stages by a set percentage per session will work.

## What should be modified?

- Off the top of my head, the majority of this implementation should be done inside `Pomodoro.svelte`
- I think there will need to be a new store to track how time is being incremented per session
  - The store should keep track of the configuration value for the current duration of work and rest times and modify them accordingly
- Configuration values are accessible and modifiable through the config store

## Behaviour

- The duration should only be incremented if the session is completed organically, resetting or going to the next stage should not trigger an increment
  - This makes sense because if a user cuts the time short, it can be considered as an indicator that they are not ready to increment the time for either stage
- The durations should be tracked individually
  - If a user completes a work duration an increment should be triggered
  - If the user then skips the rest stage (set up with an increment), the rest stage should not increment in the next session
- I should provide a help page explaining the functionality of the app
- I think it would be cleaner to hide the settings to set increments (or decrements) so that users who are not interested in the incremental feature are not confused in the config page

## Technicals

### `Pomodoro.svelte`

- I could have an `increment` function provided by the new store that is executed inside the `onComplete` callback for the timer hook
- Independent of the increment percentage set by the user, the duration should be incremented until the "goal duration" is reached
  - eg: if the user is incrementing by 10% but incrementing the time by 10% exceeds the goal duration, the goal duration should be set and a flag should be set to skip the execution of the incremental logic
- Tracking this stuff makes sense to do through cookies, this is more of an additional feature to the basic functionality of the app
