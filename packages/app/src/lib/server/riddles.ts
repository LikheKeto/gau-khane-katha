import riddlesData from '$lib/data/riddles.json';
import type { Riddle } from '$lib/types';

const riddles: Riddle[] = riddlesData as Riddle[];

/**
 * Get a deterministic riddle based on the current date
 * Same riddle for everyone on the same day
 */
export function getDailyRiddle(): Riddle {
	const today = new Date();
	// Create a seed from the date (YYYYMMDD format)
	const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
	
	// Use seed to select a riddle deterministically
	const index = seed % riddles.length;
	return riddles[index];
}

/**
 * Get a random riddle
 */
export function getRandomRiddle(excludeIds: number[] = []): Riddle {
	const availableRiddles = riddles.filter(r => !excludeIds.includes(r.id));
	
	if (availableRiddles.length === 0) {
		// If all riddles have been seen, reset and pick from all
		const randomIndex = Math.floor(Math.random() * riddles.length);
		return riddles[randomIndex];
	}
	
	const randomIndex = Math.floor(Math.random() * availableRiddles.length);
	return availableRiddles[randomIndex];
}

/**
 * Get riddle by ID
 */
export function getRiddleById(id: number): Riddle | undefined {
	return riddles.find(r => r.id === id);
}

/**
 * Get total count of riddles
 */
export function getTotalRiddles(): number {
	return riddles.length;
}
