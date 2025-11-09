import { getDailyRiddle } from '$lib/server/riddles';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const riddle = getDailyRiddle();
	return {
		riddle
	};
};
