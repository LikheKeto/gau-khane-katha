<script lang="ts">
	import { onMount } from 'svelte';
	import RiddleCard from '$lib/components/RiddleCard.svelte';
	import AdSlot from '$lib/components/AdSlot.svelte';
	import { language } from '$lib/stores';
	import { translations } from '$lib/i18n';
	import type { Riddle } from '$lib/types';

	let riddle = $state<Riddle | null>(null);
	let seenRiddles: number[] = $state([]);
	let loading = $state(false);

	const t = $derived(translations[$language]);

	async function loadNewRiddle() {
		loading = true;
		riddle = null; // Clear current riddle
		try {
			const excludeQuery = seenRiddles.length > 0 ? `?exclude=${seenRiddles.join(',')}` : '';
			const response = await fetch(`/api/random${excludeQuery}`);
			const data = await response.json();
			// Small delay to prevent flicker
			await new Promise((resolve) => setTimeout(resolve, 100));
			riddle = data;
			seenRiddles = [...seenRiddles, data.id];
		} catch (error) {
			console.error('Failed to load riddle:', error);
		} finally {
			loading = false;
		}
	}

	function handleNext() {
		loadNewRiddle();
	}

	function handleReset() {
		seenRiddles = [];
		loadNewRiddle();
	}

	onMount(() => {
		loadNewRiddle();
	});
</script>

<div class="pb-8">
	<div class="text-center mb-8">
		<h2 class="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 mb-2">{t.randomRiddleTitle}</h2>
		<p class="text-slate-600 dark:text-slate-400 text-base md:text-lg">{t.playUnlimited}</p>
	</div>

	<div class="flex justify-center gap-4 mb-8">
		<div class="bg-white dark:bg-slate-800 px-8 md:px-12 py-6 rounded-xl shadow-md text-center border border-slate-200 dark:border-slate-700">
			<div class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">{seenRiddles.length}</div>
			<div class="text-slate-600 dark:text-slate-400 text-base">{t.riddlesSeen}</div>
		</div>
	</div>

	{#if loading && !riddle}
		<div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 min-h-[300px] md:min-h-[350px] flex items-center justify-center">
			<div class="text-center p-12 text-slate-600 dark:text-slate-400">
				<div class="w-[50px] h-[50px] border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
				<p>{t.loading}</p>
			</div>
		</div>
	{:else if riddle}
		{#key riddle.id}
			<div class="animate-fade-in">
				<RiddleCard {riddle} />

				<div class="flex gap-4 justify-center my-8 flex-wrap">
					<button 
						class="px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold border-none rounded-lg cursor-pointer transition-all bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full md:w-auto" 
						onclick={handleNext} 
						disabled={loading}
					>
						{loading ? t.loading : t.nextRiddle}
					</button>
					<button 
						class="px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold border-none rounded-lg cursor-pointer transition-all bg-slate-500 text-white hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full md:w-auto" 
						onclick={handleReset} 
						disabled={loading}
					>
						{t.reset}
					</button>
				</div>
			</div>
		{/key}
	{/if}
	<!-- Mid-content Ad -->
	<div class="my-12 hidden md:flex justify-center">
		<AdSlot id="random-mid" size="728x90" />
	</div>
</div>
