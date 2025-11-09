<script lang="ts">
	import type { Village } from '$lib/data/villages';
	import { rarityColors } from '$lib/data/villages';
	import { language } from '$lib/stores';
	import { translations } from '$lib/i18n';

	let { village, won = false, alreadyOwned = false }: { village: Village; won?: boolean; alreadyOwned?: boolean } = $props();
	
	const t = $derived(translations[$language]);
	const colors = $derived(rarityColors[village.rarity]);
</script>

{#if won}
	<div class="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 {colors.border} {colors.bg} animate-slide-down shadow-lg">
		<div class="text-center">
			<div class="text-5xl mb-3">{village.emoji}</div>
			<div class="font-bold text-lg {colors.text} mb-2">
				{alreadyOwned ? t.alreadyOwned : t.villageWon}
			</div>
			<div class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
				{$language === 'ne' ? village.nameNe : village.name}
			</div>
			<div class="text-sm text-slate-600 dark:text-slate-400 mb-3">
				{$language === 'ne' ? village.descriptionNe : village.description}
			</div>
			<div class="inline-block px-3 py-1 rounded-full text-xs font-semibold {colors.bg} {colors.text} border {colors.border}">
				{t[village.rarity]}
			</div>
		</div>
	</div>
{:else}
	<div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border-2 border-dashed border-slate-300 dark:border-slate-600">
		<div class="text-center">
			<div class="text-3xl mb-2">{village.emoji}</div>
			<div class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
				{t.villageReward}
			</div>
			<div class="text-base font-bold text-slate-800 dark:text-slate-100">
				{$language === 'ne' ? village.nameNe : village.name}
			</div>
		</div>
	</div>
{/if}
