import { json } from '@sveltejs/kit';
import { getRandomRiddle } from '$lib/server/riddles';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const excludeParam = url.searchParams.get('exclude');
	const excludeIds = excludeParam ? excludeParam.split(',').map(Number) : [];
	
	const riddle = getRandomRiddle(excludeIds);
	return json(riddle);
};
