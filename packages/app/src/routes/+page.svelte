<script lang="ts">
	import { onMount } from 'svelte';
	import RiddleCard from "$lib/components/RiddleCard.svelte";
	import AdSlot from "$lib/components/AdSlot.svelte";
	import { language } from "$lib/stores";
	import { translations } from "$lib/i18n";
	import type { PageData } from "./$types";
	
	let { data }: { data: PageData } = $props();
	
	const t = $derived(translations[$language]);
	
	// Track completion state
	let hasCompleted = $state(false);
	let userKnew = $state<boolean | null>(null);
	
	// Get today's date as a key
	function getTodayKey() {
		const today = new Date();
		return `riddle-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	}
	
	// Check if user has completed today's riddle
	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			const todayKey = getTodayKey();
			const stored = localStorage.getItem(todayKey);
			if (stored) {
				const state = JSON.parse(stored);
				hasCompleted = true;
				userKnew = state.userKnew;
			}
		}
	});
	
	// Handle when user completes the riddle
	function handleRiddleComplete(knew: boolean) {
		hasCompleted = true;
		userKnew = knew;
		
		if (typeof localStorage !== 'undefined') {
			const todayKey = getTodayKey();
			localStorage.setItem(todayKey, JSON.stringify({
				userKnew: knew,
				riddleId: data.riddle.id,
				completedAt: new Date().toISOString()
			}));
		}
	}
</script>

<svelte:head>
	<title>{t.todaysRiddle} - {t.siteName}</title>
	<meta name="description" content={t.metaDescriptionDaily} />
	<meta property="og:title" content="{t.todaysRiddle} - {t.siteName}" />
	<meta property="og:description" content={t.metaDescriptionDaily} />
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content="{t.todaysRiddle} - {t.siteName}" />
	<meta name="twitter:description" content={t.metaDescriptionDaily} />
	
	<!-- Riddle-specific structured data -->
	{@html `<script type="application/ld+json">
		${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			'name': t.todaysRiddle,
			'description': t.metaDescriptionDaily,
			'mainEntity': {
				'@type': 'Quiz',
				'name': t.todaysRiddle,
				'description': data.riddle.riddle,
				'about': {
					'@type': 'Thing',
					'name': 'Nepali Culture'
				}
			}
		})}
	</script>`}
</svelte:head>

<div class="pb-8">
	<div class="text-center mb-8">
		<h2 class="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 mb-2">{t.todaysRiddle}</h2>
		<p class="text-blue-600 dark:text-blue-500 text-lg font-semibold">{new Date().toLocaleDateString("ne-NP", { year: "numeric", month: "long", day: "numeric" })}</p>
	</div>

	<div class="bg-slate-50 dark:bg-slate-800 border-l-4 border-blue-600 dark:border-blue-500 p-6 rounded-lg mb-8">
		<p class="my-2 text-base md:text-lg text-slate-600 dark:text-slate-400">{t.dailyIntro}</p>
		<p class="my-2 text-base md:text-lg text-slate-600 dark:text-slate-400">{t.comeBackTomorrow}</p>
	</div>

	{#if hasCompleted}
		<div class="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 mb-8 shadow-md border-2 flex flex-col md:flex-row gap-6 items-center md:items-start animate-slide-down {userKnew ? 'border-emerald-500 bg-linear-to-br from-emerald-500/5 to-white dark:from-emerald-500/5 dark:to-slate-800' : 'border-blue-600 bg-linear-to-br from-blue-600/5 to-white dark:from-blue-600/5 dark:to-slate-800'}">
			<div class="text-4xl md:text-5xl leading-none">{userKnew ? '🎉' : '💪'}</div>
			<div class="flex-1 text-center md:text-left">
				{#if userKnew}
					<h3 class="m-0 mb-2 text-slate-800 dark:text-slate-100 text-xl md:text-2xl">
						{#if $language === 'ne'}
							आजको कथा पूरा भयो!
						{:else}
							Today's Riddle Completed!
						{/if}
					</h3>
					<p class="m-0 text-slate-600 dark:text-slate-400 leading-relaxed">
						{#if $language === 'ne'}
							बधाई छ! तपाईंले आजको पहेली सही जवाफ दिनुभयो। भोलि फर्केर नयाँ चुनौतीको लागि तयार हुनुहोस्!
						{:else}
							Congratulations! You got today's riddle right. Come back tomorrow for a new challenge!
						{/if}
					</p>
				{:else}
					<h3 class="m-0 mb-2 text-slate-800 dark:text-slate-100 text-xl md:text-2xl">
						{#if $language === 'ne'}
							आजको कथा हेरिसक्नुभयो!
						{:else}
							Today's Riddle Viewed!
						{/if}
					</h3>
					<p class="m-0 text-slate-600 dark:text-slate-400 leading-relaxed">
						{#if $language === 'ne'}
							धन्यवाद! भोलि नयाँ पहेलीको साथ फर्कनुहोस्। अभ्यासले नै सिद्धि हुन्छ!
						{:else}
							Thanks for trying! Come back tomorrow for a new riddle. Practice makes perfect!
						{/if}
					</p>
				{/if}
			</div>
		</div>
	{/if}

	<RiddleCard riddle={data.riddle} onComplete={handleRiddleComplete} disabled={hasCompleted} />

	<!-- Mid-content Ad -->
	<div class="my-12 flex justify-center">
		<AdSlot id="mid-content" size="728x90" adSlot="4216938024" />
	</div>

	<div class="text-center mt-12 p-6 md:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
		<h3 class="text-xl md:text-2xl text-slate-800 dark:text-slate-100 mb-6">{t.wantMoreRiddles}</h3>
		<a 
			href="/random" 
			class="inline-block bg-blue-600 text-white no-underline px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md"
		>
			{t.playRandomRiddles}
		</a>
	</div>
</div>