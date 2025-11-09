<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores';
	import { translations } from '$lib/i18n';
	
	let { 
		id = 'ad-slot', 
		size = '300x250',
		adSlot = '' // AdSense ad slot ID (data-ad-slot)
	}: { 
		id?: string; 
		size?: string;
		adSlot?: string;
	} = $props();
	
	const t = $derived(translations[$language]);
	
	// Parse dimensions
	const [width, height] = size.split('x').map(Number);
	
	// Determine ad format based on size
	const adFormat = $derived(() => {
		if (size === '728x90' || size === '970x90') return 'horizontal';
		if (size === '300x600' || size === '160x600') return 'vertical';
		return 'rectangle';
	});
	
	// Map common sizes to AdSense formats
	const getAdFormat = () => {
		if (size === '728x90') return 'auto'; // Leaderboard
		if (size === '300x250') return 'auto'; // Medium Rectangle
		if (size === '336x280') return 'auto'; // Large Rectangle
		if (size === '300x600') return 'auto'; // Half Page
		if (size === '970x90') return 'auto'; // Large Leaderboard
		if (size === '160x600') return 'auto'; // Wide Skyscraper
		return 'auto';
	};
	
	onMount(() => {
		// Initialize AdSense ads
		if (typeof window !== 'undefined' && adSlot) {
			try {
				// @ts-ignore
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			} catch (e) {
				console.error('AdSense error:', e);
			}
		}
	});
</script>

<div class="flex justify-center my-4" data-ad-id={id}>
	{#if adSlot}
		<!-- Real Google AdSense Ad -->
		<ins 
			class="adsbygoogle block"
			style="display:inline-block;width:{width}px;height:{height}px"
			data-ad-client="ca-pub-1164106867271009"
			data-ad-slot={adSlot}
			data-ad-format={getAdFormat()}
			data-full-width-responsive="false"
		></ins>
	{:else}
		<!-- Placeholder when no ad slot is provided -->
		<div class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center relative overflow-hidden" style="width: {width}px; height: {height}px;">
			<div class="absolute top-2 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
				{t.advertisement}
			</div>
			<div class="w-full h-full flex items-center justify-center p-4">
				<div class="flex flex-col items-center gap-4 text-center text-slate-600 dark:text-slate-400">
					<div class="text-5xl opacity-60">📢</div>
					<div>
						<strong class="block text-lg text-slate-800 dark:text-slate-200 mb-2">Ad Space</strong>
						<p class="text-sm m-0 opacity-80">Add adSlot prop to show real ads</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
