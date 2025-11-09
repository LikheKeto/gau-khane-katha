<script lang="ts">
	import type { Riddle } from '$lib/types';
	import { language, villageCollection } from '$lib/stores';
	import { translations } from '$lib/i18n';
	import { getRandomVillage, type Village } from '$lib/data/villages';
	import VillageReward from './VillageReward.svelte';
	import { onMount } from 'svelte';

	let { riddle, onComplete, disabled = false }: { riddle: Riddle; onComplete?: (knew: boolean) => void; disabled?: boolean } = $props();

	let showAnswer = $state(false);
	let userKnows = $state<boolean | null>(null);
	let currentVillage = $state<Village | null>(null);
	let wonVillage = $state(false);
	let alreadyOwned = $state(false);
	
	const t = $derived(translations[$language]);

	// Generate a village reward when component mounts - only once
	onMount(() => {
		if (!disabled) {
			const ownedIds = $villageCollection.villages.map(v => v.id);
			currentVillage = getRandomVillage(ownedIds);
		}
	});

	function revealAnswer() {
		if (disabled) return;
		showAnswer = true;
	}

	function handleUserResponse(knows: boolean) {
		if (disabled) return;
		
		userKnows = knows;
		
		if (knows && currentVillage) {
			// Check if already owned
			const isOwned = $villageCollection.villages.find(v => v.id === currentVillage!.id);
			alreadyOwned = !!isOwned;
			
			// Add village to collection
			villageCollection.addVillage(currentVillage);
			wonVillage = true;
		} else if (!knows) {
			villageCollection.incrementAttempted();
		}
		
		// Call the completion callback if provided
		if (onComplete) {
			onComplete(knows);
		}
	}
</script>

<div class="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-10 shadow-md text-center border border-slate-200 dark:border-slate-700 {disabled ? 'opacity-60 pointer-events-none' : ''}">
	<div class="text-sm text-slate-600 dark:text-slate-400 mb-4 font-medium">कथा #{riddle.id}</div>
	
	<!-- Village Reward Display -->
	{#if currentVillage && !wonVillage && !disabled}
		<div class="mb-6">
			<VillageReward village={currentVillage} won={false} />
		</div>
	{/if}
	
	<div class="mb-8">
		<h2 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 leading-relaxed m-0 font-semibold">{riddle.riddle}</h2>
	</div>

	{#if !showAnswer && !disabled}
		<button 
			class="px-8 py-3.5 text-lg font-semibold border-none rounded-lg cursor-pointer transition-all bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md" 
			onclick={revealAnswer}
		>
			{t.revealAnswer}
		</button>
	{:else if disabled}
		<div class="text-slate-500 dark:text-slate-400 text-base mb-6">
			{t.answer}: <span class="font-bold text-slate-700 dark:text-slate-300">{riddle.answer}</span>
		</div>
	{:else}
		<div class="animate-slide-in">
			<div class="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4 font-semibold">{t.answer}:</div>
			<div class="text-xl md:text-2xl text-blue-600 dark:text-blue-500 font-bold my-4 p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border-2 border-blue-600 dark:border-blue-500">{riddle.answer}</div>
			
			{#if userKnows === null}
				<div class="mt-8 pt-8 border-t-2 border-slate-200 dark:border-slate-700">
					<p class="text-lg md:text-xl text-slate-800 dark:text-slate-100 mb-6 font-medium">{t.didYouKnow}</p>
					<div class="flex gap-4 justify-center flex-wrap">
						<button 
							class="px-6 md:px-8 py-3 md:py-3.5 text-base md:text-lg font-semibold border-none rounded-lg cursor-pointer transition-all bg-emerald-500 text-white hover:opacity-90 hover:-translate-y-0.5 w-full md:w-auto" 
							onclick={() => handleUserResponse(true)}
						>
							{t.yesIKnew}
						</button>
						<button 
							class="px-6 md:px-8 py-3 md:py-3.5 text-base md:text-lg font-semibold border-none rounded-lg cursor-pointer transition-all bg-slate-500 text-white hover:opacity-90 hover:-translate-y-0.5 w-full md:w-auto" 
							onclick={() => handleUserResponse(false)}
						>
							{t.noDidntKnow}
						</button>
					</div>
				</div>
			{:else}
				<!-- Show village won or result -->
				{#if wonVillage && currentVillage}
					<div class="mt-6">
						<VillageReward village={currentVillage} won={true} {alreadyOwned} />
					</div>
				{:else}
					<div class="mt-6 p-6 rounded-lg text-lg md:text-xl font-semibold animate-slide-in {userKnows ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500' : 'bg-slate-500/10 text-slate-800 dark:text-slate-100 border-2 border-slate-500'}">
						{#if userKnows}
							{t.congratulations}
						{:else}
							{t.tryAgain}
						{/if}
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>
