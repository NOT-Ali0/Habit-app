import { writable } from 'svelte/store';

const getToday = () => new Date().toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD local

const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toLocaleDateString('en-CA');
};

const safeGetStorage = (key, successCallback) => {
    if (typeof my !== 'undefined' && my.getStorage) {
        my.getStorage({
            key: key,
            success: (res) => {
                if (successCallback) successCallback(res.data);
            },
            fail: (res) => {
                console.warn(`Failed to get storage for ${key}`, res);
                if (successCallback) successCallback(null);
            }
        });
    } else {
        console.warn('QiNEO "my" API not found. Storage disabled.');
        if (successCallback) successCallback(null);
    }
};

const safeSetStorage = (key, data) => {
    if (typeof my !== 'undefined' && my.setStorage) {
        my.setStorage({
            key: key,
            data: data,
            success: () => {
                // optional success log
            },
            fail: (res) => {
                console.error(`Failed to set storage for ${key}`, res);
            }
        });
    }
};

export const habits = writable([]);

let isLoaded = false;

// Load from storage on app start
safeGetStorage('habits', (data) => {
    if (data) {
        let parsedDate = data;
        if (typeof data === 'string') {
            try {
                parsedDate = JSON.parse(data);
            } catch (e) {
                // Keep as is
            }
        }

        habits.set(Array.isArray(parsedDate) ? parsedDate : []);
    }
    isLoaded = true;
});

habits.subscribe((value) => {
    if (isLoaded) {
        safeSetStorage('habits', value);
    }
});

export const addHabit = (title, weeklyGoal) => {
    habits.update((items) => [
        ...items,
        {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2),
            title,
            completedToday: false,
            streak: 0,
            weeklyGoal: parseInt(weeklyGoal) || 3,
            lastCompletedDate: null,
        },
    ]);
};

export const deleteHabit = (id) => {
    habits.update((items) => items.filter((h) => h.id !== id));
};

export const toggleHabit = (id) => {
    const today = getToday();
    const yesterday = getYesterday();

    habits.update((items) => {
        return items.map((h) => {
            if (h.id !== id) return h;

            const isCompleting = !h.completedToday;

            if (isCompleting) {
                let newStreak = h.streak;
                if (h.lastCompletedDate === yesterday) {
                    newStreak += 1;
                } else if (h.lastCompletedDate === today) {
                    newStreak = h.streak;
                } else {
                    newStreak = 1;
                }

                return {
                    ...h,
                    completedToday: true,
                    streak: newStreak,
                    lastCompletedDate: today
                };
            } else {
                let newStreak = h.streak > 0 ? h.streak - 1 : 0;


                let newDate = newStreak > 0 ? yesterday : null;

                return {
                    ...h,
                    completedToday: false,
                    streak: newStreak,
                    lastCompletedDate: newDate
                };
            }
        });
    });
};

export const checkDailyReset = () => {
    const today = getToday();
    const yesterday = getYesterday();

    habits.update((items) => {
        return items.map((h) => {
            if (h.lastCompletedDate !== today && h.completedToday) {
                return {
                    ...h,
                    completedToday: false,
                    streak: (h.lastCompletedDate === yesterday || h.lastCompletedDate === today) ? h.streak : 0
                };
            }

            if (!h.completedToday && h.lastCompletedDate && h.lastCompletedDate < yesterday) {
                return { ...h, streak: 0 };
            }

            return h;
        });
    });
};
