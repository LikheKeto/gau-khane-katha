import { writable } from 'svelte/store';
import type { Language } from './i18n';
import type { Village } from './data/villages';

export const language = writable<Language>('ne');
export const theme = writable<'light' | 'dark'>('light');

// Village collection store
export interface VillageCollection {
	villages: Village[];
	totalCorrect: number;
	totalAttempted: number;
}

function createVillageStore() {
	const { subscribe, set, update } = writable<VillageCollection>({
		villages: [],
		totalCorrect: 0,
		totalAttempted: 0
	});

	// Load from localStorage
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('villageCollection');
		if (saved) {
			try {
				const data = JSON.parse(saved);
				set(data);
			} catch (e) {
				console.error('Failed to load village collection:', e);
			}
		}
	}

	return {
		subscribe,
		addVillage: (village: Village) => {
			update(state => {
				// Check if village already exists
				if (!state.villages.find(v => v.id === village.id)) {
					const newState = {
						...state,
						villages: [...state.villages, village],
						totalCorrect: state.totalCorrect + 1,
						totalAttempted: state.totalAttempted + 1
					};
					if (typeof window !== 'undefined') {
						localStorage.setItem('villageCollection', JSON.stringify(newState));
					}
					return newState;
				}
				// Village already owned, just increment correct count
				const newState = {
					...state,
					totalCorrect: state.totalCorrect + 1,
					totalAttempted: state.totalAttempted + 1
				};
				if (typeof window !== 'undefined') {
					localStorage.setItem('villageCollection', JSON.stringify(newState));
				}
				return newState;
			});
		},
		incrementAttempted: () => {
			update(state => {
				const newState = {
					...state,
					totalAttempted: state.totalAttempted + 1
				};
				if (typeof window !== 'undefined') {
					localStorage.setItem('villageCollection', JSON.stringify(newState));
				}
				return newState;
			});
		},
		reset: () => {
			const newState = {
				villages: [],
				totalCorrect: 0,
				totalAttempted: 0
			};
			set(newState);
			if (typeof window !== 'undefined') {
				localStorage.setItem('villageCollection', JSON.stringify(newState));
			}
		}
	};
}

export const villageCollection = createVillageStore();

// Load from localStorage if available
if (typeof window !== 'undefined') {
	const savedLang = localStorage.getItem('language') as Language;
	const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
	
	if (savedLang) {
		language.set(savedLang);
	}
	
	if (savedTheme) {
		theme.set(savedTheme);
		// Apply dark mode class to html element
		if (savedTheme === 'dark') {
			document.documentElement.classList.add('dark');
		}
	}
}

language.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('language', value);
	}
});

theme.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('theme', value);
		// Toggle dark mode class on html element
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
});
