<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import AdSlot from '$lib/components/AdSlot.svelte';
	import { language } from '$lib/stores';
	import { translations } from '$lib/i18n';

	let { children } = $props();
	
	const t = $derived(translations[$language]);
</script>

<svelte:head>
	<title>{t.siteName}</title>
	<meta name="description" content={t.testYourKnowledge} />
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1164106867271009"
     crossorigin="anonymous"></script>
</svelte:head>

<div class="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
	<Header />
	
	<!-- Top Banner Ad -->
	<div class="flex justify-center bg-white dark:bg-slate-800 py-4 border-b border-slate-200 dark:border-slate-700">
		<AdSlot id="top-banner" size="728x90" adSlot="4216938024" />
	</div>
	
	<div class="grid grid-cols-1 xl:grid-cols-[300px_1fr_300px] gap-8 max-w-[1400px] w-full mx-auto px-4 md:px-8 py-8 flex-1">
		<aside class="hidden xl:block sticky top-8 h-fit">
			<AdSlot id="sidebar-top" size="300x250" adSlot="2362475462" />
		</aside>
		
		<main class="max-w-[800px] min-h-[500px] mx-auto xl:mx-0 w-full">
			{@render children()}
		</main>
		
		<aside class="hidden xl:block sticky top-8 h-fit">
			<AdSlot id="sidebar-right" size="300x600" adSlot="7944715457" />
		</aside>
	</div>
	
	<!-- Sidebar ad for tablet/mobile -->
	<div class="xl:hidden max-w-[300px] mx-auto px-4 pb-8">
		<AdSlot id="sidebar-mobile" size="300x250" adSlot="2362475462" />
	</div>
	
	<footer class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-center py-8 mt-16 border-t border-slate-200 dark:border-slate-700">
		<p class="my-2">&copy; 2025 {t.siteName}. {t.allRightsReserved}</p>
		<p class="text-sm text-slate-600 dark:text-slate-400 my-2">{t.testYourKnowledge}</p>
	</footer>
</div>
