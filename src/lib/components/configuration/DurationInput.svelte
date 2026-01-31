<script lang="ts">
    import { formatTime } from "$lib/utils/format";

	interface Props {
		value: number; // in milliseconds
		step?: number; // in milliseconds, defaults to 1 minute
		min?: number; // in milliseconds
		max?: number; // in milliseconds
	}

	let { value = $bindable(0), step = 60000, min = 0, max = 60 * 60 * 1000 }: Props = $props();

	function increment() {
		const newValue = value + step;
		value = Math.min(newValue, max);
	}

	function decrement() {
		const newValue = value - step;
		value = Math.max(newValue, min);
	}

	const displayTime = $derived(formatTime(value));
</script>

<div class="duration-input" data-testid="duration-input">
	<button class="decrement" onclick={decrement} aria-label="Decrease duration">-</button>
	<span class="time-display"><p>{displayTime}</p></span>
	<button class="increment" onclick={increment} aria-label="Increase duration">+</button>
</div>

<style scoped>
    button {
        width: 40px;
        height: 40px;
        background: none;
        border: solid 1px var(--color-primary);

        &.decrement {
            border-right: none;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        &.increment {
            border-left: none;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }

    .duration-input {
        display: inline-flex;
        align-items: center;
        justify-content: center;;
        color: var(--color-primary);
        border-radius: 10px;
        overflow: hidden;
    }

	.time-display {
        display: flex;
        align-items: center;
        height: 40px;
        border: solid 1px var(--color-primary);
        border-left: none;
        border-right: none;
	}
</style>
