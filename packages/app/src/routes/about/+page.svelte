<script lang="ts">
	import { language } from '$lib/stores';
	import { translations } from '$lib/i18n';
	
	const t = $derived(translations[$language]);
</script>

<div class="max-w-[800px] pb-8">
	<h2 class="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 text-center mb-8">{t.aboutTitle}</h2>

	<section class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md mb-8 border border-slate-200 dark:border-slate-700">
		<p class="text-base md:text-lg text-center text-slate-600 dark:text-slate-400 leading-relaxed">{t.aboutIntro}</p>
	</section>

	<section class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md mb-8 border border-slate-200 dark:border-slate-700">
		<h3 class="text-2xl md:text-3xl text-blue-600 dark:text-blue-500 mt-0 mb-6">{t.whatIsHere}</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
			<div class="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg text-center border border-slate-200 dark:border-slate-600 transition-transform hover:-translate-y-1 hover:shadow-lg">
				<div class="text-5xl mb-4">📅</div>
				<h4 class="text-lg md:text-xl text-slate-800 dark:text-slate-100 my-2">{t.dailyRiddle}</h4>
				<p class="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{t.dailyRiddleDesc}</p>
			</div>
			<div class="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg text-center border border-slate-200 dark:border-slate-600 transition-transform hover:-translate-y-1 hover:shadow-lg">
				<div class="text-5xl mb-4">🎲</div>
				<h4 class="text-lg md:text-xl text-slate-800 dark:text-slate-100 my-2">{t.randomRiddle}</h4>
				<p class="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{t.randomRiddleDesc}</p>
			</div>
			<div class="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg text-center border border-slate-200 dark:border-slate-600 transition-transform hover:-translate-y-1 hover:shadow-lg">
				<div class="text-5xl mb-4">🧠</div>
				<h4 class="text-lg md:text-xl text-slate-800 dark:text-slate-100 my-2">{t.knowledgeTest}</h4>
				<p class="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{t.knowledgeTestDesc}</p>
			</div>
		</div>
	</section>

	<section class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md mb-8 border border-slate-200 dark:border-slate-700">
		<h3 class="text-2xl md:text-3xl text-blue-600 dark:text-blue-500 mt-0 mb-4">{t.collection}</h3>
		<p class="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{t.collectionDesc}</p>
	</section>

	<section class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md mb-8 border border-slate-200 dark:border-slate-700">
		<h3 class="text-2xl md:text-3xl text-blue-600 dark:text-blue-500 mt-0 mb-4">{t.purpose}</h3>
		<ul class="list-none p-0">
			{#each t.purposeList as purpose}
				<li class="py-3 pl-8 relative text-slate-600 dark:text-slate-400 leading-relaxed before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold before:text-xl">{purpose}</li>
			{/each}
		</ul>
	</section>

	<section class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md mb-8 border border-slate-200 dark:border-slate-700">
		<h3 class="text-2xl md:text-3xl text-blue-600 dark:text-blue-500 mt-0 mb-4">{t.feedback}</h3>
		<p class="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{t.feedbackDesc}</p>
	</section>
</div>
