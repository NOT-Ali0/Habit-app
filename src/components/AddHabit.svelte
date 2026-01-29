<script>
    import { addHabit } from "../stores/habits.js";

    let title = "";
    let weeklyGoal = 7;
    let isOpen = false;

    const handleSubmit = () => {
        if (!title.trim()) return;
        addHabit(title, weeklyGoal);
        title = "";
        weeklyGoal = 7;
        isOpen = false;
    };
</script>

<div class="add-habit-container">
    {#if !isOpen}
        <button class="add-btn-floating" on:click={() => (isOpen = true)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><line x1="12" y1="5" x2="12" y2="19"></line><line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                ></line></svg
            >
            New Habit
        </button>
    {:else}
        <form class="add-form" on:submit|preventDefault={handleSubmit}>
            <div class="form-header">
                <h3>Create Habit</h3>
                <button
                    type="button"
                    class="close-btn"
                    on:click={() => (isOpen = false)}>Cancel</button
                >
            </div>

            <div class="input-group">
                <label for="title">Habit Name</label>
                <input
                    id="title"
                    type="text"
                    placeholder="e.g. Read 30 mins"
                    bind:value={title}
                    autoFocus
                />
            </div>

            <div class="input-group">
                <label for="goal">Weekly Goal: {weeklyGoal} days</label>
                <div class="range-wrapper">
                    <span>3</span>
                    <input
                        id="goal"
                        type="range"
                        min="3"
                        max="7"
                        bind:value={weeklyGoal}
                    />
                    <span>7</span>
                </div>
            </div>

            <button type="submit" class="submit-btn" disabled={!title.trim()}>
                Start Habit
            </button>
        </form>
    {/if}
</div>

<style>
    .add-habit-container {
        margin-bottom: 2rem;
    }

    /* Floating trigger button style */
    .add-btn-floating {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        padding: 1rem;
        border-radius: var(--radius);
        font-weight: 600;
        transition:
            transform 0.2s,
            background-color 0.2s;
        border: 2px dashed var(--border);
    }

    .add-btn-floating:active {
        transform: scale(0.98);
    }

    /* Form Styles */
    .add-form {
        background: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: var(--radius);
        animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
    }

    .close-btn {
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .input-group {
        margin-bottom: 1.25rem;
    }

    label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
    }

    input[type="text"] {
        width: 100%;
        padding: 0.75rem;
        border-radius: 8px;
        border: 1px solid var(--border);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        outline: none;
        transition: border-color 0.2s;
    }

    input[type="text"]:focus {
        border-color: var(--accent);
    }

    .range-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    input[type="range"] {
        flex: 1;
        accent-color: var(--accent);
    }

    .submit-btn {
        width: 100%;
        padding: 0.875rem;
        background-color: var(--accent);
        color: white;
        border-radius: 8px;
        font-weight: 600;
        transition: background-color 0.2s;
    }

    .submit-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
