# Incremental Durations

## Requirements

1. Have incremental updates per completed stage each session
2. Have configuration values reflect changes done by incremental feature
3. Have a toggle to hide and bind its value to a flag to enable or disable duration increments

## Steps

1. Create new store to track duration increments and test with work duration using hard-coded config values
2. Add fields for incremental durations in configuration page
3. Write untittests for new incremental duration feature
4. Implement feature for both stages and execute end-to-end tests

## Notes

- Currently, the only files that should be modified are:
  - `Pomodoro.svelte`
  - `incrementStore.svelte`
  - `configuration/+page.svelte`
