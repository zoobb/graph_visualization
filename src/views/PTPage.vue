<script setup>
import { ref } from 'vue';
import HomeButton from "../components/HomeButton.vue";

const throwsCount = ref(0);
const throwResults = ref([]);
const probabilityA = ref(0);
const probabilityB = ref(0);

const simulateThrow = () => {
	const results = [];
	let ones = 0;
	let twos = 0;
	let threes = 0;

	while (ones < 3 || twos < 3 || threes < 3) {
		const result = Math.floor(Math.random() * 6) + 1;
		results.push(result);

		if (result === 1) ones++;
		else if (result === 2) twos++;
		else if (result === 3) threes++;
	}

	throwsCount.value = results.length;
	throwResults.value = results;

	// Вычисление вероятности A (X <= 5)
	probabilityA.value = throwsCount.value <= 5 ? 1 : 0;

	// Вычисление вероятности B (появление всех чисел кости)
	const uniqueResults = [...new Set(results)];
	probabilityB.value = uniqueResults.length === 6 ? 1 : 0;
};
</script>

<template>
	<div class="flex flex-col justify-start items-center">
		<h1>Lab 1</h1>
		<button @click="simulateThrow">Throw a dice</button>
		<span>Throws count: {{ throwsCount }}</span>
		<span>Throw results: {{ throwResults }}</span>
		<span>Probability A: {{ probabilityA }}</span>
		<span>Probability B (появление всех чисел кости): {{ probabilityB }}</span>
	</div>
	<home-button/>
</template>

<style>

</style>