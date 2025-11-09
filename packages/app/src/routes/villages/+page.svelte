<script lang="ts">
	import { villageCollection, language } from '$lib/stores';
	import { translations } from '$lib/i18n';
	import { villages, rarityColors } from '$lib/data/villages';
	
	const t = $derived(translations[$language]);
	
	const winRate = $derived(
		$villageCollection.totalAttempted > 0 
			? Math.round(($villageCollection.totalCorrect / $villageCollection.totalAttempted) * 100) 
			: 0
	);
	
	// Group villages by rarity
	const groupedVillages = $derived(() => {
		const owned = $villageCollection.villages.map(v => v.id);
		return {
			legendary: villages.filter(v => v.rarity === 'legendary'),
			epic: villages.filter(v => v.rarity === 'epic'),
			rare: villages.filter(v => v.rarity === 'rare'),
			uncommon: villages.filter(v => v.rarity === 'uncommon'),
			common: villages.filter(v => v.rarity === 'common'),
		};
	});
</script>

<svelte:head>
	<title>{t.myVillages} - {t.siteName}</title>
	<meta name="description" content={t.metaDescriptionVillages} />
	<meta property="og:title" content="{t.myVillages} - {t.siteName}" />
	<meta property="og:description" content={t.metaDescriptionVillages} />
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content="{t.myVillages} - {t.siteName}" />
	<meta name="twitter:description" content={t.metaDescriptionVillages} />
	
	<!-- Villages collection structured data -->
	{@html `<script type="application/ld+json">
		${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			'name': t.myVillages,
			'description': t.metaDescriptionVillages,
			'about': {
				'@type': 'Thing',
				'name': 'Nepali Villages Collection',
				'description': 'Collect 24 Nepali villages by solving riddles correctly'
			}
		})}
	</script>`}
</svelte:head>

<div class="pb-8">
	<div class="text-center mb-8">
		<h2 class="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 mb-4">{t.myVillages}</h2>
		
		<!-- Stats -->
		<div class="flex flex-wrap gap-4 justify-center mb-6">
			<div class="bg-white dark:bg-slate-800 px-6 py-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
				<div class="text-2xl font-bold text-blue-600 dark:text-blue-500">{$villageCollection.villages.length}</div>
				<div class="text-sm text-slate-600 dark:text-slate-400">{t.villagesCollected}</div>
			</div>
			<div class="bg-white dark:bg-slate-800 px-6 py-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
				<div class="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{$villageCollection.totalCorrect}</div>
				<div class="text-sm text-slate-600 dark:text-slate-400">{t.congratulations.split('!')[0]}</div>
			</div>
			<div class="bg-white dark:bg-slate-800 px-6 py-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
				<div class="text-2xl font-bold text-purple-600 dark:text-purple-500">{winRate}%</div>
				<div class="text-sm text-slate-600 dark:text-slate-400">{t.winRate}</div>
			</div>
		</div>
	</div>

	{#if $villageCollection.villages.length === 0}
		<div class="bg-white dark:bg-slate-800 rounded-xl p-12 shadow-md text-center border border-slate-200 dark:border-slate-700">
			<div class="text-6xl mb-4">🏘️</div>
			<h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.noVillages}</h3>
			<p class="text-slate-600 dark:text-slate-400 mb-6">{t.startPlaying}</p>
			<a 
				href="/" 
				class="inline-block bg-blue-600 text-white no-underline px-6 py-3 rounded-lg font-semibold transition-all hover:bg-blue-700 hover:-translate-y-0.5"
			>
				{t.dailyRiddle}
			</a>
		</div>
	{:else}
		<!-- Village Collection by Rarity -->
		{#each Object.entries(groupedVillages()) as [rarity, villageList]}
			{@const ownedCount = villageList.filter(v => $villageCollection.villages.find(owned => owned.id === v.id)).length}
			{@const rarityKey = rarity as keyof typeof rarityColors}
			{#if villageList.length > 0}
				<div class="mb-8">
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-xl md:text-2xl font-bold {rarityColors[rarityKey].text} flex items-center gap-2">
							<span>{t[rarityKey]}</span>
							<span class="text-base font-normal text-slate-600 dark:text-slate-400">
								({ownedCount}/{villageList.length})
							</span>
						</h3>
					</div>
					
					<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{#each villageList as village}
							{@const isOwned = $villageCollection.villages.find(v => v.id === village.id)}
							<div class="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all {isOwned ? `${rarityColors[rarityKey].border} ${rarityColors[rarityKey].bg}` : 'border-slate-200 dark:border-slate-700 opacity-40 grayscale'}">
								<div class="text-center">
									<div class="text-4xl mb-2">{village.emoji}</div>
									<div class="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
										{$language === 'ne' ? village.nameNe : village.name}
									</div>
									<div class="text-xs text-slate-600 dark:text-slate-400">
										{$language === 'ne' ? village.descriptionNe : village.description}
									</div>
									{#if !isOwned}
										<div class="mt-2 text-xs text-slate-500 dark:text-slate-500">🔒</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>
