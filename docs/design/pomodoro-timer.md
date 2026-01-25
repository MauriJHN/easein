# Pomodoro Timer Design

Just an outline describing what I want the new Pomodoro app to look like and the features that it should include.

## Requirements

- Has to have a configuration button that displays a modal so that the user can change the state of the timer
- Needs to have statistical information about the user displayed in a graph (might need third-party library)
- Has to have buttons to
  - Reset the current segment
  - Pause and start timer
  - Reset full session
  - Go to the next segment of the session
- Has to have a toggle to set whether to autostart next segment
- Needs to have a display with the information about the session
  - The content of this element should be hidden and when the user interacts with it it may show the full information of the current session:
    - Total work duration
    - Total rest duration
    - Total sessions
    - Average work duration per session?: this is something I think I have not thought about before

## Configuration

### Values

- Work duration
- Rest duration
- Long rest duration
- Display of current work and rest loads (information purposes, lets users evaluate how much time they are dedicating to each segment)
- Incremental duration?: have a value in the form of percent or static value to increment in each
  - Incremental goal?: the target desired work and rest segment durations (this is literally what I have been thinking about doing the entire time)
- Auto start next segment?: This could be a secondary option in the configuration

## Colors

- I want it to be minimalist but also offer vector backgrounds (svg specifically)
