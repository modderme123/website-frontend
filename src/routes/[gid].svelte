<script lang="ts">
	import MainPage from './index.svelte';
	import { page } from '$app/stores';
	import { TMDecisionStatus } from '$lib/tm';

	// Machine ID or machine b64
	let generalisedIDAndParams = $page.params.gid;

	const generalisedID = generalisedIDAndParams.split('&')[0];

	let machineID = null;
	let machineB64 = null;

	let nbIter = null;
	let tapeWidth = null;
	let origin_x = null;

	if (generalisedID[0] == 'm') {
		machineB64 = generalisedID;
	} else {
		machineID = generalisedID;
	}

	const urlParams = new URLSearchParams(generalisedIDAndParams);
	if (urlParams.get('s') != null) {
		nbIter = Number(urlParams.get('s'));
	}
	if (urlParams.get('w') != null) {
		tapeWidth = Number(urlParams.get('w'));
	}
	if (urlParams.get('ox') != null) {
		origin_x = Number(urlParams.get('ox'));
	}

	let machineStatus = null;
	if (urlParams.get('status') != null) {
		if (urlParams.get('status') == 'halt') {
			machineStatus = TMDecisionStatus.DECIDED_HALT;
		}
	}
</script>

{#if machineID != null}
	<MainPage preSeed={true} {machineID} {nbIter} {tapeWidth} {origin_x} {machineStatus} />
{:else}
	<MainPage preSeed={true} {machineB64} {nbIter} {tapeWidth} {origin_x} {machineStatus} />
{/if}
