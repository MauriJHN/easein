# Component Brainstorming

Just putting in words what I want the app to look like and a general idea of the components that I'm going to use.

## Component List

- **Main components**
  - `Timer.svelte`: Contains UI and facade logic for a timer.
  - `TimerConfig.svelte`: Interface to adjust and set configuration for timer.
  - `Stats.svelte`: Interface to visualize statistical data on app usage
- **Secondary components**
  - `TimerButton.svelte`: special button used inside `Timer.svelte` that controls the state of the timer.
  - `ResetButton.svelte`: resets the statistical data from the user.
  - `StatsCsvButton.svelte`: downloads the statistical data of the user in CSV format.
  - `ConfigButton.svelte`: displays configuration to the user.
  - `SessionDisplay.svelte`: small container with session data
