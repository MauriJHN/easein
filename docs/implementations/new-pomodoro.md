# Pomodoro Timer App

## Goal

Get a minimal, but functional app going in the new app page.

## Steps

## Basic Steps

1. Cleanup project leaving only components relevant for new version of app
2. Create basic app with hard-coded configuration values
3. Create configuration components and create new configuration page
4. Implement gradual increment or decrement functionality for work and rest stages
5. Create statistics components and create basic statistics visualization page
6. Add complex graphs to visualize app use in different scenarios

### 1. Cleanup Project

- I want to only leave the basic components (in their basic version) in the project
- Everything that is for a future step to be stored inside an `archive` folder
- Anything that is not relevant to the project discarded
- Push changes once everything is cleaned up

### 2. Basic App

- Literally have just a pomodoro timer app that is usable upon landing
- Write extensive unit tests for the basic components of the app
- Have hard-coded configuration values

#### File Structure

For this first stage, ideally, only the following components and pages will be used:

- `lib/components/Pomodoro.svelte`
- `lib/components/TimerControls.svelte`
- `lib/components/TimeDisplay.svelte`
- `lib/hooks/useTimer.svelte.ts`
- `lib/utils/notificationSound.ts`
- `lib/constants/pomodoro.ts`
- `lib/constants/timer.ts`
- `lib/constants/index.ts`

#### `TimerControls.svelte`

- What should this component use from `Pomodoro.svelte`?
  - This component could take in the `elapsedTime` and `currentDuration` values from Pomodoro and format it based on whether the use wants to countdown or count up for the timer

### 3. Configuration

- Create configuration component using the layered approach generated on claude.ai
- Have a navigatable configuration page to change basic configuration values:
  1. Work duration
  2. Rest duration
  3. Long rest duration
  4. Sessions until long rest
- Configuration component should allow for future enhancements if data mangement is implemented

### 4. Incremental Stages

- Modify existing components to include functionality to do the following:
  - Set a "goal" work or rest duration (or both)
  - Set an initial duration for either work or rest (or both)
  - Let the user select how the duration should be incremented per session:
    - In percentage
    - In a set amount of time (minutes, seconds)
    - Let app determine increments depending on desired sessions before hitting the goal
- Have this be a separate section in configuration (advanced configuration)

### 5. Statistics

- Literally just create a basic component to track statistical data (this may already be covered in archived components)
- Create a basic page to let the user check how their stats per weekday (and highlight stats for current day)
- Create unittests for expected behaviour

### 6. Stats Graphs

- Investigate best approaches to add graphs to app inside `svelte-grounds`
- Implement graphs as an extra option to visualize app use inside stats page

### 7. (Optional) Vector Backgrounds

- Add ability of user to modify background to svg backgrounds
- Keep this responsive

## Notes on Implementation

- Always push changes to the remote branch
- Always create at least basic unittesting for every new component and new features

## Tracking Work and Rest Durations

- Would it make sense to use context functionality to store the values?
- Could I include the tracking logic inside the component responsible of tracking statistics, or would the data be transferred among components to display statistical data
