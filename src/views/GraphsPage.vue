<script setup>
import {computed, onMounted, ref, watch} from "vue";
import HomeButton from "../components/HomeButton.vue";

const canvasWidth = 600;
const canvasHeight = 600;
const midX = canvasWidth / 2;
const midY = canvasHeight / 2;

const edges = ref([]);
const adjacencyList = ref({

});

const nodesCount = ref('');
const nodesCountError = ref(false);
const toggleState = ref(1);
const start = ref('');
const finish = ref('');
const firstNodeContainer = ref(null);

const circleID = ref();


const nodesCountErrorCheck = watch(nodesCount, (nodesCount) => {
	if (nodesCount >= 1 && nodesCount <= 10 ) {
		edges.value = [];
		nodesCountError.value = false;
	}
	else if (nodesCount === '') {
		nodesCountError.value = false;
	}
	else {
		edges.value = [];
		nodesCountError.value = true;
	}
});

const lettersGen = (int) => {
	return String.fromCharCode(parseInt(int + 64));
}

const writeEdge = (id) => {
	switch (toggleState.value) {
		case 1:
			firstNodeContainer.value = id;
			toggleState.value = 2;
			break;
		case 2:
			let edge = {};
			if (firstNodeContainer.value !== id) {
				edge[firstNodeContainer.value] = id;
				edges.value.push(edge);

				adjacencyList.value[lettersGen(firstNodeContainer.value)].push(lettersGen(id));
				adjacencyList.value[lettersGen(id)].push(lettersGen(firstNodeContainer.value));

				toggleState.value = 1;
				firstNodeContainer.value = null;
			}
			break;
	}
};

const changeColor = () => {
	return '#FFC759'
}

const nodePosition = (nodesCount, id, distance) => {
	let val = parseInt(nodesCount);
	if (nodesCount === 1) {
		return {x: midX, y: midY}
	}
	else {
		let theta = (2 * Math.PI)/val;

		let x = midX + distance * Math.cos((theta * id));
		let y = midY + distance * Math.sin((theta * id));

		return { x , y }
	}
}

const bfs = () => {
	const queue = [start.value];
	const visited = new Set();
	const result = [];

	while (queue.length) {
		const node = queue.shift();

		if (!visited.has(node)) {
			visited.add(node);
			result.push(node);

			for (const neighbor of adjacencyList.value[node]) {
				queue.push(neighbor);
			}
		}
	}
};

const getCircleColor = (id) => {
	return parseInt(circleID.value) === parseInt(id) ? '#FFC759' : '#242424';
};

const listSetup = watch(nodesCount, () => {
	adjacencyList.value = {};
	for (let node = 1; node <= nodesCount.value; node++) {
		adjacencyList.value[lettersGen(node)] = [];
	}
});

const isStartCorrect = computed(() => {
	return start.value in adjacencyList.value && adjacencyList.value[start.value].length > 0;
});

const isFinishCorrect = computed(() => {
	return finish.value in adjacencyList.value && adjacencyList.value[finish.value].length > 0;
});

</script>

<template>
	<div class="flex flex-col justify-start items-center">
		<h1 class="mb-10">Graph input</h1>
		<div>
			<span>Enter nodes count(from 1 to 10): </span>
			<input
				v-model="nodesCount"
				type="number"
				name="vertices"
				id="vertices"
				autocomplete="off"
				class="text-center w-10 h-7 m-1.5 rounded-md"
			/>
		</div>
		<transition name="fade">
			<span v-if="nodesCountError">
				<strong class="text-pink-600">
					Error! Nodes count is incorrect!
				</strong>
			</span>
		</transition>
		<div>
			{{ adjacencyList }}
		</div>
		<svg
			:width="canvasWidth"
			:height="canvasHeight"
			id="canvas"
			v-if="nodesCount && !nodesCountError"
		>
			<g v-for="edge in edges" :key="edge">
				<line
					:x1="nodePosition(nodesCount, parseInt(Object.keys(edge)[0]), 220).x"
					:y1="nodePosition(nodesCount, parseInt(Object.keys(edge)[0]), 220).y"
					:x2="nodePosition(nodesCount, edge[Object.keys(edge)[0]], 220).x"
					:y2="nodePosition(nodesCount, edge[Object.keys(edge)[0]], 220).y"
					stroke="#00895F"
					stroke-width="2"
					:style="{
						opacity: '0',
						animation: `fadeInAndMove 1s ease-out 0.01s forwards`
					}"
				/>
			</g>
			<g v-for="id in nodesCount" :key="id">
				<circle
					:cx="nodePosition(nodesCount, id, 220).x"
					:cy="nodePosition(nodesCount, id, 220).y"
					r="28"
					:fill="getCircleColor(id)"
					stroke="#646cff"
					stroke-width="2"
					@click="writeEdge(id)"
					:style="{
						opacity: '0',
						animation: `fadeInAndMove 1s ease-out ${0.075 * (id - 1)}s forwards`
					}"
					:ref="id"
					:id="id"
				/>
				<text
					:x="nodePosition(nodesCount, id, 220).x"
					:y="nodePosition(nodesCount, id, 220).y + 1"
					fill="#FFFFFFDE"
					text-anchor="middle"
					alignment-baseline="middle"
					pointer-events="none"
					:style="{
						opacity: '0',
						animation: `fadeInAndMove 1s ease-out ${0.075 * (id - 1)}s forwards`
					}"
				>
					{{lettersGen(id)}}
				</text>
			</g>
		</svg>
		<div>
			<span>Enter start node: </span>
			<input
				v-model="start"
				type="text"
				autocomplete="off"
				class="text-center w-10 h-7 m-1.5 rounded-md"
			>
			<span>Enter finish node: </span>
			<input
				v-model="finish"
				type="text"
				autocomplete="off"
				class="text-center w-10 h-7 m-1.5 rounded-md"
			>
		</div>
		<div v-if="!isStartCorrect">
			Error! There's no such start point!
		</div>
		<div v-if="!isFinishCorrect">
			Error! There's no such finish point!
		</div>
		<input
			v-model="circleID"
			type="text"
			autocomplete="off"
			class="text-center w-10 h-7 m-1.5 rounded-md"
		>
	</div>
	<home-button/>
</template>

<style>

.fade-enter-active,
.fade-leave-active {
	transition: opacity 220ms ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.animated-circle {
	opacity: 0;
	animation: fadeIn 1s ease-out;
	animation-fill-mode: forwards;
	animation-delay: 0.3s;
}

@keyframes fadeInAndMove {
	to {
		opacity: 1;
	}
}
</style>