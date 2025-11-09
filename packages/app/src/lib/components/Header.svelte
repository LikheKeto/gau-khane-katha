<script lang="ts">
	import { page } from '$app/stores';
	import { language, theme, villageCollection } from '$lib/stores';
	import { translations } from '$lib/i18n';
	
	$: t = translations[$language];
	
	function toggleTheme() {
		theme.update(current => current === 'light' ? 'dark' : 'light');
	}
	
	function toggleLanguage() {
		language.update(current => current === 'en' ? 'ne' : 'en');
	}
</script>

<header class="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
	<div class="max-w-[1400px] mx-auto px-4 sm:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
		<div class="logo">
			<a href="/" class="no-underline">
				<h1 class="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-500 m-0">{t.siteName}</h1>
				<p class="text-sm opacity-80 mt-1 text-slate-600 dark:text-slate-400 m-0">{t.tagline}</p>
			</a>
		</div>
		
		<nav class="flex gap-2 md:gap-4 items-center flex-wrap justify-center">
			<a 
				href="/" 
				class="text-slate-800 dark:text-slate-200 no-underline font-medium px-3 md:px-4 py-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 {$page.url.pathname === '/' ? 'bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-600' : ''}"
			>
				{t.dailyRiddle}
			</a>
			<a 
				href="/random" 
				class="text-slate-800 dark:text-slate-200 no-underline font-medium px-3 md:px-4 py-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 {$page.url.pathname === '/random' ? 'bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-600' : ''}"
			>
				{t.randomRiddle}
			</a>
			<a 
				href="/villages" 
				class="text-slate-800 dark:text-slate-200 no-underline font-medium px-3 md:px-4 py-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 {$page.url.pathname === '/villages' ? 'bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-600' : ''} relative"
			>
				🏘️ {t.myVillages}
				{#if $villageCollection.villages.length > 0}
					<span class="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
						{$villageCollection.villages.length}
					</span>
				{/if}
			</a>
			<a 
				href="/about" 
				class="text-slate-800 dark:text-slate-200 no-underline font-medium px-3 md:px-4 py-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 {$page.url.pathname === '/about' ? 'bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-600' : ''}"
			>
				{t.about}
			</a>
			
			<button 
				class="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 px-2 md:px-3 py-2 rounded-md cursor-pointer text-base transition-colors hover:bg-slate-100 dark:hover:bg-slate-700" 
				onclick={toggleTheme} 
				title="Toggle theme"
			>
				{#if $theme === 'light'}
					🌙
				{:else}
					☀️
				{/if}
			</button>
			
			<button 
				class="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 px-2 md:px-3 py-2 rounded-md cursor-pointer text-base transition-colors hover:bg-slate-100 dark:hover:bg-slate-700" 
				onclick={toggleLanguage} 
				title="Toggle language"
			>
				{$language === 'en' ? 'ने' : 'EN'}
			</button>
		</nav>
	</div>
</header>
