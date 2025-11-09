<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import AdSlot from '$lib/components/AdSlot.svelte';
	import { language } from '$lib/stores';
	import { translations } from '$lib/i18n';
	import { page } from '$app/stores';

	let { children } = $props();
	
	const t = $derived(translations[$language]);
	
	// Get current URL for canonical and Open Graph
	const currentUrl = $derived($page.url.href);
	const baseUrl = $page.url.origin;
	
	// Structured data for the website
	const websiteSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'name': 'Gau Khane Katha',
		'alternateName': 'गाउँखाने कथा',
		'url': baseUrl,
		'description': 'Traditional Nepali riddles game with 2070+ riddles. Play daily riddles, collect villages, and test your knowledge.',
		'inLanguage': ['en', 'ne'],
		'potentialAction': {
			'@type': 'SearchAction',
			'target': {
				'@type': 'EntryPoint',
				'urlTemplate': `${baseUrl}/?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	});
	
	const organizationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'name': 'Gau Khane Katha',
		'url': baseUrl,
		'logo': `${baseUrl}/logo.png`,
		'sameAs': [],
		'description': 'Preserving and promoting traditional Nepali riddles (Gau Khane Katha) through digital media.'
	});
</script>

<svelte:head>
	<title>{t.siteName}</title>
	<meta name="description" content={t.metaDescription} />
	
	<!-- Canonical URL -->
	<link rel="canonical" href={currentUrl} />
	
	<!-- Alternate language versions -->
	<link rel="alternate" hreflang="en" href={currentUrl} />
	<link rel="alternate" hreflang="ne" href={currentUrl} />
	<link rel="alternate" hreflang="x-default" href={currentUrl} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={t.ogTitle} />
	<meta property="og:description" content={t.ogDescription} />
	<meta property="og:image" content="{baseUrl}/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Gau Khane Katha" />
	<meta property="og:locale" content={$language === 'ne' ? 'ne_NP' : 'en_US'} />
	<meta property="og:locale:alternate" content={$language === 'ne' ? 'en_US' : 'ne_NP'} />
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={currentUrl} />
	<meta name="twitter:title" content={t.ogTitle} />
	<meta name="twitter:description" content={t.ogDescription} />
	<meta name="twitter:image" content="{baseUrl}/og-image.png" />
	
	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`}
	
	<!-- Google AdSense -->
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
