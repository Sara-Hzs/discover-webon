import {writable} from 'svelte/store';


export const filters = writable({
        tag: null,
        sortBy: 'newest',
        search: ''
    }
);

