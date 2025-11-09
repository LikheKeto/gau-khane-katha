export interface Village {
	id: number;
	name: string;
	nameNe: string;
	emoji: string;
	rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
	description: string;
	descriptionNe: string;
}

export const villages: Village[] = [
	// Common villages (60%)
	{ id: 1, name: 'Kharibot', nameNe: 'खरिबोट', emoji: '🏡', rarity: 'common', description: 'A small farming village', descriptionNe: 'सानो खेती गाउँ' },
	{ id: 2, name: 'Dhapasi', nameNe: 'धापासी', emoji: '🏘️', rarity: 'common', description: 'A peaceful hamlet', descriptionNe: 'शान्त बस्ती' },
	{ id: 3, name: 'Bhotebahal', nameNe: 'भोटेबहाल', emoji: '🏠', rarity: 'common', description: 'A quiet neighborhood', descriptionNe: 'शान्त टोल' },
	{ id: 4, name: 'Chapagaun', nameNe: 'चापागाउँ', emoji: '🌾', rarity: 'common', description: 'Rice farming village', descriptionNe: 'धान खेती गाउँ' },
	{ id: 5, name: 'Tikathali', nameNe: 'टिकाथली', emoji: '🏡', rarity: 'common', description: 'A hillside settlement', descriptionNe: 'पहाडको बस्ती' },
	{ id: 6, name: 'Lubhu', nameNe: 'लुभु', emoji: '🏘️', rarity: 'common', description: 'Traditional farming village', descriptionNe: 'परम्परागत गाउँ' },
	{ id: 7, name: 'Thecho', nameNe: 'थेचो', emoji: '🏠', rarity: 'common', description: 'Ancient village', descriptionNe: 'पुरानो गाउँ' },
	{ id: 8, name: 'Sunakothi', nameNe: 'सुनकोठी', emoji: '🌾', rarity: 'common', description: 'Golden fields village', descriptionNe: 'सुनौलो खेत गाउँ' },
	{ id: 9, name: 'Nakhipot', nameNe: 'नखिपोट', emoji: '🏡', rarity: 'common', description: 'Village by the stream', descriptionNe: 'खोलाको छेउको गाउँ' },
	{ id: 10, name: 'Bungamati', nameNe: 'बुङ्गमती', emoji: '🏘️', rarity: 'common', description: 'Riverside village', descriptionNe: 'नदी किनारको गाउँ' },
	
	// Uncommon villages (25%)
	{ id: 11, name: 'Khokana', nameNe: 'खोकना', emoji: '🏛️', rarity: 'uncommon', description: 'Historic mustard oil village', descriptionNe: 'ऐतिहासिक तोरीको गाउँ' },
	{ id: 12, name: 'Sankhu', nameNe: 'साँखु', emoji: '🏯', rarity: 'uncommon', description: 'Ancient trade town', descriptionNe: 'पुरातन व्यापार नगर' },
	{ id: 13, name: 'Kirtipur', nameNe: 'कीर्तिपुर', emoji: '🏰', rarity: 'uncommon', description: 'Historic hilltop city', descriptionNe: 'ऐतिहासिक पहाडी शहर' },
	{ id: 14, name: 'Bode', nameNe: 'बोडे', emoji: '🏛️', rarity: 'uncommon', description: 'Festival village', descriptionNe: 'चाडपर्वको गाउँ' },
	{ id: 15, name: 'Thimi', nameNe: 'थिमी', emoji: '🏺', rarity: 'uncommon', description: 'Pottery making town', descriptionNe: 'माटोको भाँडा बनाउने सहर' },
	{ id: 16, name: 'Nagarkot', nameNe: 'नगरकोट', emoji: '⛰️', rarity: 'uncommon', description: 'Mountain view village', descriptionNe: 'हिमाल दृश्य गाउँ' },
	
	// Rare villages (10%)
	{ id: 17, name: 'Patan', nameNe: 'पाटन', emoji: '🏛️', rarity: 'rare', description: 'City of fine arts', descriptionNe: 'ललितकलाको शहर' },
	{ id: 18, name: 'Bhaktapur', nameNe: 'भक्तपुर', emoji: '🏰', rarity: 'rare', description: 'Cultural heritage city', descriptionNe: 'सांस्कृतिक सम्पदा शहर' },
	{ id: 19, name: 'Dhulikhel', nameNe: 'धुलिखेल', emoji: '🌄', rarity: 'rare', description: 'Gateway to mountains', descriptionNe: 'हिमालको ढोका' },
	{ id: 20, name: 'Nuwakot', nameNe: 'नुवाकोट', emoji: '🏯', rarity: 'rare', description: 'Ancient fortress village', descriptionNe: 'पुरातन किल्ला गाउँ' },
	
	// Epic villages (4%)
	{ id: 21, name: 'Kathmandu', nameNe: 'काठमाडौं', emoji: '🏙️', rarity: 'epic', description: 'Valley capital city', descriptionNe: 'उपत्यकाको राजधानी' },
	{ id: 22, name: 'Pokhara', nameNe: 'पोखरा', emoji: '🏞️', rarity: 'epic', description: 'City of lakes', descriptionNe: 'तालहरूको शहर' },
	
	// Legendary villages (1%)
	{ id: 23, name: 'Lumbini', nameNe: 'लुम्बिनी', emoji: '🕉️', rarity: 'legendary', description: 'Birthplace of Buddha', descriptionNe: 'बुद्धको जन्मस्थल' },
	{ id: 24, name: 'Swayambhu', nameNe: 'स्वयम्भू', emoji: '🙏', rarity: 'legendary', description: 'Sacred monkey temple', descriptionNe: 'पवित्र बाँदर मन्दिर' },
];

export const rarityColors = {
	common: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-300 dark:border-slate-600' },
	uncommon: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-400 dark:border-green-600' },
	rare: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-400 dark:border-blue-600' },
	epic: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-400 dark:border-purple-600' },
	legendary: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-400 dark:border-amber-600' },
};

export function getRandomVillage(ownedVillageIds: number[]): Village {
	// Filter out already owned villages
	const availableVillages = villages.filter(v => !ownedVillageIds.includes(v.id));
	
	if (availableVillages.length === 0) {
		// If all villages owned, return a random one anyway
		return villages[Math.floor(Math.random() * villages.length)];
	}
	
	// Weighted random selection based on rarity
	const random = Math.random() * 100;
	let targetRarity: Village['rarity'];
	
	if (random < 60) targetRarity = 'common';
	else if (random < 85) targetRarity = 'uncommon';
	else if (random < 95) targetRarity = 'rare';
	else if (random < 99) targetRarity = 'epic';
	else targetRarity = 'legendary';
	
	// Get villages of target rarity
	const rarityVillages = availableVillages.filter(v => v.rarity === targetRarity);
	
	if (rarityVillages.length > 0) {
		return rarityVillages[Math.floor(Math.random() * rarityVillages.length)];
	}
	
	// Fallback to any available village
	return availableVillages[Math.floor(Math.random() * availableVillages.length)];
}
