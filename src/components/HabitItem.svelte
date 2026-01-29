<script>
    import { toggleHabit, deleteHabit } from "../stores/habits.js";

    export let habit;

    const handleToggle = () => {
        toggleHabit(habit.id);
    };

    const handleDelete = () => {
        deleteHabit(habit.id);
    };
</script>

<div class="habit-item" class:completed={habit.completedToday}>
    <div class="habit-content">
        <div class="habit-header">
            <h4>{habit.title}</h4>
            <div class="streak-badge" title="Current streaks">
                <span class="fire-icon">🔥</span>
                {habit.streak}
            </div>
        </div>

        <div class="progress-info">
            <span class="goal-text">Goal: {habit.weeklyGoal} days/week</span>
        </div>
    </div>

    <div class="actions">
        <button
            class="check-btn"
            class:checked={habit.completedToday}
            on:click={handleToggle}
            aria-label={habit.completedToday
                ? "Mark as incomplete"
                : "Mark as complete"}
        >
            {#if habit.completedToday}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><polyline points="20 6 9 17 4 12"></polyline></svg
                >
            {/if}
        </button>

        <button
            class="delete-btn"
            on:click={handleDelete}
            aria-label="Delete habit"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><polyline points="3 6 5 6 21 6"></polyline><path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path></svg
            >
        </button>
    </div>
</div>

<style>
    .habit-item {
        background-color: var(--bg-secondary);
        border-radius: var(--radius);
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
        transition: all 0.3s ease;
        border: 1px solid transparent;
    }

    .habit-item.completed {
        background-color: var(--bg-primary);
        border-color: var(--accent);
        /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); */
    }


    .habit-content {
        flex: 1;
    }

    .habit-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
    }

    h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
    }

    .streak-badge {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 0.75rem;
        background: #ffedd5;
        color: #c2410c;
        padding: 2px 6px;
        border-radius: 99px;
        font-weight: 700;
    }

    /* Dark mode streaks */
    :global([data-theme="dark"]) .streak-badge {
        background: #431407;
        color: #fdba74;
    }

    .goal-text {
        font-size: 0.75rem;
        color: var(--text-secondary);
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .check-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 2px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .check-btn.checked {
        background-color: var(--accent);
        border-color: var(--accent);
        transform: scale(1.1);
    }

    .delete-btn {
        color: var(--text-secondary);
        opacity: 0.6;
        padding: 0.5rem;
        transition: opacity 0.2s;
    }

    .delete-btn:hover {
        opacity: 1;
        color: var(--danger);
    }
</style>
