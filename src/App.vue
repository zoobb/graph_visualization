<script setup>
import * as d3 from "d3";
import {onMounted, ref, watch} from "vue";

const canvasWidth = 600;
const canvasHeight = 600;
const midX = canvasWidth / 2;
const midY = canvasHeight / 2;

const nodesCount = ref('');
const nodesCountError = ref(false);
const adjacencyList = ref([]);

let graph;

const nodesFill = watch(nodesCount, (nodesCount) => {
	if (nodesCount >= 1 && nodesCount <= 10 ) {
		adjacencyList.value = [];
		let nodeNames
		for (let node = 1; node <= nodesCount; node++) {
			nodeNames = String.fromCharCode(node + 64);
			// adjacencyList.value[nodeNames] = [];
			// adjacencyList.value.nodes.push({
			// 	id: node,
			// 	name: nodeNames
			// });
		}
		nodesCountError.value = false;
	}
	else if (nodesCount === '') {
		nodesCountError.value = false;
	}
	else {
		adjacencyList.value = [];
		nodesCountError.value = true;
	}
	renderGraph(nodesCount);
});

const nodePosition = (nodesCount, id, distance) => {
	let val = parseInt(nodesCount)
	// if (typeof nodesCount.value !== 'number' || !nodesCount.value) {
	// 	return {x: midX, y: midY}
	// }
	let theta = (2 * Math.PI)/val;

	let x = midX + distance * Math.cos((theta * id));
	let y = midY + distance * Math.sin((theta * id));
	console.log(id, theta, val,)
	return { x , y }
}

const renderGraph = (nodesCount) => {
	const svg = d3.select("#canvas")
		.selectAll("circle")
		.remove()
		.data(adjacencyList.value.nodes.map((node, id) => nodePosition(nodesCount, id, 100)))
		.enter()
		.append("circle")
		.attr("r", 20)
		.attr("cx", (d) => d.x)
		.attr("cy", (d) => d.y)
		.style("fill", "red")

}

onMounted(() => {
	graph = d3.select("#canvas");
	renderGraph();
});

</script>

<template>
	<div class="flex flex-col justify-start items-center">
		<h1 class="mb-10">Graph input</h1>
		<div>
			<span>Enter nodes count(from 1 to 10): </span>
			<input
				v-model="nodesCount"
				type="text"
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
			{{adjacencyList}}
		</div>
		<svg
			:width="canvasWidth"
			:height="canvasHeight"
			id="canvas"
		></svg>
	</div>
</template>

<style>
#app {
	display: flex;
	flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 220ms ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>