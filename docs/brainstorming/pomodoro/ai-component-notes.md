# Notes on `PomodoroTimer.svelte` AI Generated Component

- The component seems to be just a regular timer with a preset duration of 25min
- I need to add a way to set the duration for the work and rest stages of a pomodoro session
- I also want to add audio so that it plays when the stages are done, similar to easeout

## Stages

- Need to separate the stages duration into their own property
- I also need to track the state of the timer, whether the work or rest stages are done and if the session is completed

## Statistics

- I need to track the elapsed time of each stage and record it so that it can be presented to the user afterwards

## Notes on Upgrades

- I asked AI to add enhancements for a more complete version of the pomodoro timer
- I need to see how the states can be tracked modularly

### Modularity

What can I take out of the component
