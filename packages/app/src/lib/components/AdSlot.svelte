<script lang="ts">
	import { language } from '$lib/stores';
	import { translations } from '$lib/i18n';
	
	let { id = 'ad-slot', size = '300x250' }: { id?: string; size?: string } = $props();
	
	const t = $derived(translations[$language]);
	
	// Parse dimensions
	const [width, height] = size.split('x').map(Number);
</script>

<div class="flex justify-center my-4" data-ad-id={id}>
	<div class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center relative overflow-hidden" style="width: {width}px; height: {height}px;">
		<div class="absolute top-2 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
			{t.advertisement}
		</div>
		<!-- Sample Ad Content -->
		<div class="w-full h-full flex items-center justify-center p-4">
			<div class="flex flex-col items-center gap-4 text-center text-slate-600 dark:text-slate-400">
				<div class="text-5xl opacity-60">📢</div>
				<div>
					<strong class="block text-lg text-slate-800 dark:text-slate-200 mb-2">Your Ad Here</strong>
					<p class="text-sm m-0 opacity-80">This space is available for advertisements</p>
				</div>
			</div>
		</div>
	</div>
</div>
