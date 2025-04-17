import { writable } from 'svelte/store';

function createExpandedFoldersStore() {
    const saved = localStorage.getItem('expandedFolders');
    const initial = saved ? JSON.parse(saved) : {};
    const { subscribe, set, update } = writable(initial);

    return {
        subscribe,
        toggle: (tag) => update(state => {
            const newState = { ...state, [tag]: !state[tag] };
            localStorage.setItem('expandedFolders', JSON.stringify(newState));
            return newState;
        })
    };
}

export const expandedFolders = createExpandedFoldersStore();