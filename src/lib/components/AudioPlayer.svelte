<script lang="ts">
    import { onMount } from 'svelte';
    let audioElement: HTMLAudioElement;
    export let src: string;
    let isPlaying = false;
    let progress = 0;
    let interval: number;

    function togglePlay() {
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        isPlaying = !isPlaying;
    }

    function handleEnded() {
        isPlaying = false;
        progress = 0;
        clearInterval(interval);
    }

    function seek(event: MouseEvent) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const newTime = (clickX / rect.width) * audioElement.duration;
        audioElement.currentTime = newTime;
        updateProgress();
    }

    function updateProgress() {
        progress = (audioElement.currentTime / audioElement.duration) * 100;
    }

    onMount(() => {
        audioElement.addEventListener('timeupdate', updateProgress);
        return () => {
            audioElement.removeEventListener('timeupdate', updateProgress);
        };
    });
</script>

<div class="audio-player">
    <button on:click={togglePlay}>
        {#if isPlaying}
            Pause
        {:else}
            Play
        {/if}
    </button>
    
    <audio bind:this={audioElement} src={src} on:ended={handleEnded}></audio>

    <div class="progress-bar" on:click={seek}>
        <div class="progress" style="width: {progress}%"></div>
    </div>
</div>

