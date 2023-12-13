<script setup>
import { ref, onMounted } from 'vue';

const canvasWidth = 600;
const canvasHeight = 600;
const midX = canvasWidth / 2;
const midY = canvasHeight / 2;

const adjacencyList = ref({
	"A": ["I", "E", "F", "D"],
	"B": ["J", "G", "C"],
	"C": ["H", "I", "F", "D", "B"],
	"D": ["G", "C", "A"],
	"E": ["A", "H"],
	"F": ["A", "C"],
	"G": ["D", "B"],
	"H": ["C", "E"],
	"I": ["J", "A", "C"],
	"J": ["B", "I"]
});

const colors = ref({});

const nodePosition = (id) => {
	const theta = (2 * Math.PI) / Object.keys(adjacencyList.value).length;
	const angle = Object.keys(adjacencyList.value).indexOf(id) * theta;
	const radius = 150;

	const x = midX + radius * Math.cos(angle);
	const y = midY + radius * Math.sin(angle);

	return { x, y };
};

const getColor = (color) => {
	const colorPalette = ['#FFC759', '#646cff', '#00895F', '#FF5733'];
	return colorPalette[color % colorPalette.length];
};

const greedyColoring = () => {
	const vertices = Object.keys(adjacencyList.value);

	for (const vertex of vertices) {
		const adjacentColors = new Set();

		for (const neighbor of adjacencyList.value[vertex]) {
			if (colors.value[neighbor]) {
				adjacentColors.add(colors.value[neighbor]);
			}
		}

		let color = 1;
		while (adjacentColors.has(color)) {
			color++;
		}

		colors.value[vertex] = color;
	}
};

onMounted(() => {
	greedyColoring();
});

const drawEdges = () => {
	const vertices = Object.keys(adjacencyList.value);
	const edges = [];

	for (const vertex of vertices) {
		for (const neighbor of adjacencyList.value[vertex]) {
			edges.push({
				start: nodePosition(vertex),
				end: nodePosition(neighbor)
			});
		}
	}

	return edges;
};

</script>

<template>
	<div class="flex flex-col justify-start items-center">
		<h1 class="mb-10">Graph Coloring</h1>
		<div>
			{{adjacencyList}}
		</div>
		<svg :width="canvasWidth" :height="canvasHeight" id="canvas">
			<g v-for="edge in drawEdges()" :key="`${edge.start.x}-${edge.start.y}-${edge.end.x}-${edge.end.y}`">
				<line
					:x1="edge.start.x"
					:y1="edge.start.y"
					:x2="edge.end.x"
					:y2="edge.end.y"
					stroke="#00895F"
					stroke-width="2"
				/>
			</g>
			<g v-for="vertex in Object.keys(adjacencyList)" :key="vertex">
				<circle
					:cx="nodePosition(vertex).x"
					:cy="nodePosition(vertex).y"
					r="28"
					:fill="getColor(colors[vertex])"
					stroke="#646cff"
					stroke-width="2"
				/>
				<text
					:x="nodePosition(vertex).x"
					:y="nodePosition(vertex).y + 1"
					fill="#FFFFFFDE"
					text-anchor="middle"
					alignment-baseline="middle"
				>
					{{ vertex }}
				</text>
			</g>
		</svg>
	</div>
</template>

<style scoped>
/* Add your styles here */
</style>
