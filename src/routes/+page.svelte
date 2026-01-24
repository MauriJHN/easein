<script lang="ts">
	import { resolve } from '$app/paths';
	import '$lib/styles/nav-buttons.css';
</script>

<div class="container">
	<nav class="nav-buttons">
		<a href={resolve('/demo')} class="nav-button">Demo</a>
		<a href={resolve('/apps')} class="nav-button">Apps</a>
	</nav>
</div>
