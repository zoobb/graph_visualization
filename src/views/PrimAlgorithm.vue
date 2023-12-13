<script setup>
import { ref, onMounted } from 'vue';

const adjacencyList = ref({
	'A': [{ node: 'B', weight: 2 }, { node: 'D', weight: 1 }],
	'B': [{ node: 'A', weight: 2 }, { node: 'D', weight: 3 }, { node: 'C', weight: 4 }],
	'C': [{ node: 'B', weight: 4 }, { node: 'D', weight: 5 }],
	'D': [{ node: 'A', weight: 1 }, { node: 'B', weight: 3 }, { node: 'C', weight: 5 }]
});

const selectedEdges = ref([]);
const visitedNodes = ref([]);
const totalWeight = ref(0);

const primAlgorithm = () => {
	const nodes = Object.keys(adjacencyList.value);
	visitedNodes.value.push(nodes[0]);

	while (visitedNodes.value.length < nodes.length) {
		let minWeight = Infinity;
		let minEdge = null;

		for (const node of visitedNodes.value) {
			const edges = adjacencyList.value[node];

			for (const edge of edges) {
				if (!visitedNodes.value.includes(edge.node) && edge.weight < minWeight) {
					minWeight = edge.weight;
					minEdge = { from: node, to: edge.node, weight: edge.weight };
				}
			}
		}

		if (minEdge) {
			visitedNodes.value.push(minEdge.to);
			selectedEdges.value.push(minEdge);
			totalWeight.value += minEdge.weight;
		}
	}
};

onMounted(() => {
	primAlgorithm();
});
</script>

<template>
	<div>
		<h1>Prim's Algorithm</h1>
		<div>
			<p>Selected Edges: {{ selectedEdges }}</p>
			<p>Total Weight: {{ totalWeight }}</p>
		</div>
	</div>
</template>
