<script lang="ts">
	import { resolve } from '$app/paths';
	import '$lib/styles/nav-buttons.css';
</script>

<a href="/" class="home-button">Home</a>

<div class="container">
	<nav class="nav-buttons">
		<a href={resolve('/demo/lucia')} class="nav-button">Lucia</a>
		<a href={resolve('/demo/paraglide')} class="nav-button">Paraglide</a>
		<a href={resolve('/demo/pomodoro')} class="nav-button">Pomodoro</a>
		<a href={resolve('/demo/interval-timer')} class="nav-button">Interval Timer</a>
		<a href={resolve('/demo/breathing')} class="nav-button">Breathing</a>
	</nav>
</div>
