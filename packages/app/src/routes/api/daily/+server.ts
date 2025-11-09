import { json } from '@sveltejs/kit';
import { getDailyRiddle } from '$lib/server/riddles';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const riddle = getDailyRiddle();
	return json(riddle);
};
