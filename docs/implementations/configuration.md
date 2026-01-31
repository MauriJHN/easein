# Configuration Implementation

## Requirements

1. Have a separate page in the app where configuration values can be modified by user
2. Have input components in order to build sections of the configuration page
   1. Components should be general and accept various input types: number, text, etc
3. Configuration design should follow theme of the app

## Steps

1. Create basic functionality in `src/routes/configuration/+page.svelte` using plain html elements
2. Push fully functional app with new configuration controls
3. Create custom components to replace content of `configuration/+page.svelte`
4. Create unittests for basic functionality of configuration

## Notes

- I think using `localStorage` would provide a better user experience since they are persisted for more time, values stored for previous easeout project are still in place in localStorage
- There is no point in creating a fancy layered configuration for the alpha version of this app

## Issues