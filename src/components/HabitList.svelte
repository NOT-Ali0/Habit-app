<script>
    import { habits } from "../stores/habits.js";
    import HabitItem from "./HabitItem.svelte";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";
</script>

<div class="habit-list">
    {#if $habits.length === 0}
        <div class="empty-state" in:fade>
            <div class="empty-icon">🌱</div>
            <p>No habits yet. Start small today!</p>
        </div>
    {:else}
        {#each $habits as habit (habit.id)}
            <div animate:flip={{ duration: 300 }} transition:fade>
                <HabitItem {habit} />
            </div>
        {/each}
    {/if}
</div>

<style>
    .habit-list {
        flex: 1;
        padding-bottom: 2rem;
    }

    .empty-state {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-secondary);
    }

    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        margin: 0;
        font-size: 1rem;
    }
</style>
