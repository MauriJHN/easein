# `Timer.svelte`

## Purpose and Scope

Will be the main component to display the timer. Handles controls for timer. Does not include anything to do with statistics, that should be handled through a sibling component that passes the data to another statistics component.

## API Specification

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| initialTime | number | 0 | No | Starting time in seconds |
| mode | 'countdown' \| 'stopwatch' | 'stopwatch' | No | Timer behavior mode |
| autoStart | boolean | false | No | Whether timer starts automatically on mount |
| format | string | 'MM:SS' | No | Display format (future: support HH:MM:SS) |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| tick | { elapsed: number } | Emitted every second with current time |
| complete | { finalTime: number } | Emitted when countdown reaches zero |
| start | { time: number } | Emitted when timer starts |
| pause | { time: number } | Emitted when timer pauses |
| reset | { time: number } | Emitted when timer resets |