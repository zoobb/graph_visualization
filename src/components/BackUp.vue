<template>
	<div class="flex flex-col justify-start items-center">
		<h1 class="mb-10">Матрица смежности</h1>
		<div>
			<span>Введите количество вершин(до 10): </span>
			<input
				v-model="nodesCount"
				type="text"
				name="vertices"
				id="vertices"
				class="text-center w-10 h-7 m-1.5 rounded-md"
			/>
		</div>
		<div v-if="isInvalidCount" class="font-bold text-red-700">
			Ошибка! Количество вершин не должно превышать 10!
		</div>
		<transition name="fade">
			<div v-if="nodesCount">
				<table>
					<tr>
						<th></th>
						<th v-for="j in parseInt(nodesCount)">
							<span>{{ String.fromCharCode(64 + j) }}</span>
						</th>
					</tr>
					<tr v-for="i in parseInt(nodesCount)">
						<th>
							<span>{{ String.fromCharCode(64 + i) }}</span>
						</th>
						<td v-for="j in parseInt(nodesCount)" class="w-20 h-20">
							<button
								v-if="i < j"
								@click="toggleEdge(i, j)"
								:class="{ active: isEdgeActive(i, j) }"
							>
								{{ isEdgeActive(i, j) ? 1 : 0 }}
							</button>
						</td>
					</tr>
				</table>
				<button @click="generateGraph">Подтвердить</button>
			</div>
		</transition>
		<div v-if="submit">
			<span>Введите начальную вершину: </span>
			<input
				v-model="start"
				type="text"
				name="startVertex"
				id="startVertex"
				class="text-center w-10 h-7 m-1.5 rounded-md"
			/>
			<span>Введите конечную вершину: </span>
			<input
				v-model="finish"
				type="text"
				name="finishVertex"
				id="finishVertex"
				class="text-center w-10 h-7 m-1.5 rounded-md"
			/>
		</div>
		<button @click="startBFS">Начать обход</button>
	</div>
	<div class="graph-container">
		<svg :width="graphWidth" :height="graphHeight">
			<line
				v-for="(edge, index) in computedEdges"
				:key="index"
				:x1="getNodeX(edge.node1)"
				:y1="getNodeY(edge.node1)"
				:x2="getNodeX(edge.node2)"
				:y2="getNodeY(edge.node2)"
				:stroke="isEdgeVisited(edge.node1, edge.node2) ? 'red' : 'black'"
			></line>
			<g v-for="(node, nodeId) in list" :key="nodeId">
				<circle
					:cx="getNodeX(nodeId)"
					:cy="getNodeY(nodeId)"
					r="20"
					:fill="nodeId === start ? 'green' : nodeId === finish ? 'blue' : 'gray'"
				></circle>
				<text
					:x="getNodeX(nodeId)"
					:y="getNodeY(nodeId) + 5"
					text-anchor="middle"
					alignment-baseline="middle"
					:fill="nodeId === start || nodeId === finish ? 'white' : 'black'"
				>
					{{ nodeId }}
				</text>
			</g>
		</svg>
	</div>
</template>

<script>
import { ref, computed } from "vue";

export default {
	setup() {
		const graphWidth = 400;
		const graphHeight = 400;

		const nodesCount = ref("");
		const start = ref(""); // Начальная вершина
		const finish = ref(""); // Конечная вершина
		const isInvalidCount = ref(false);
		const isInvalidStart = ref(false);
		const isInvalidFinish = ref(false);
		const list = ref({});
		const submit = ref(false);
		const visitedNodes = ref([]);

		const isEdgeVisited = (node1, node2) => {
			return visitedNodes.value.some(
				(visitedEdge) =>
					(visitedEdge.node1 === node1 && visitedEdge.node2 === node2) ||
					(visitedEdge.node1 === node2 && visitedEdge.node2 === node1)
			);
		};

		const getNodeX = (nodeId) => {
			const index = Object.keys(list.value).indexOf(nodeId);
			const angle = (2 * Math.PI * index) / Object.keys(list.value).length;
			return graphWidth / 2 + 150 * Math.cos(angle);
		};

		const getNodeY = (nodeId) => {
			const index = Object.keys(list.value).indexOf(nodeId);
			const angle = (2 * Math.PI * index) / Object.keys(list.value).length;
			return graphHeight / 2 + 150 * Math.sin(angle);
		};

		const isEdgeActive = (row, col) => {
			const nodeOne = String.fromCharCode(64 + row);
			const nodeTwo = String.fromCharCode(64 + col);
			if (list.value[nodeOne] && list.value[nodeOne].includes(nodeTwo)) {
				return true;
			}
			return false;
		};

		const toggleEdge = (row, col) => {
			const nodeOne = String.fromCharCode(64 + row);
			const nodeTwo = String.fromCharCode(64 + col);

			if (!list.value[nodeOne]) {
				list.value[nodeOne] = [];
			}

			if (!list.value[nodeTwo]) {
				list.value[nodeTwo] = [];
			}

			if (!list.value[nodeOne].includes(nodeTwo)) {
				list.value[nodeOne].push(nodeTwo);
				list.value[nodeTwo].push(nodeOne);
			}
		};

		const computedEdges = computed(() => {
			const edges = [];
			for (const node in list.value) {
				for (const neighbor of list.value[node]) {
					edges.push({ node1: node, node2: neighbor });
				}
			}
			return edges;
		});

		const generateGraph = () => {
			submit.value = true;
		};

		const startBFS = async () => {
			visitedNodes.value = [];
			visitedNodes.value.push({ node1: start, node2: start });

			const queue = [start];
			const visited = { [start]: true };

			while (queue.length > 0) {
				const v = queue.shift();
				for (const neighbor of list.value[v]) {
					if (!visited[neighbor]) {
						queue.push(neighbor);
						visited[neighbor] = true;
						visitedNodes.value.push({ node1: v, node2: neighbor });

						// Добавляем задержку здесь
						await new Promise((resolve) => setTimeout(resolve, 1000)); // Задержка 1 секунда
					}
				}
			}
		};

		return {
			list,
			graphWidth,
			graphHeight,
			getNodeX,
			getNodeY,
			nodesCount,
			start,
			finish,
			isInvalidCount,
			isInvalidStart,
			isInvalidFinish,
			toggleEdge,
			isEdgeActive,
			computedEdges,
			submit,
			generateGraph,
			startBFS,
			visitedNodes,
			isEdgeVisited,
		};
	},
};
</script>

<style scoped>
.graph-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

#app {
	display: flex;
	flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.active {
	background-color: indigo;
}
</style>


<!--
	<script setup>
import * as d3 from "d3";
import {onMounted, ref, watch} from "vue";

const canvasWidth = 600;
	const canvasHeight = 600;
	const posX = canvasWidth / 2;
	const posY = canvasHeight / 2;

	const nodesCount = ref('');
	const nodesCountError = ref(false);
	const adjacencyList = ref({
		nodes: [],
		edges: []
	});

	let graph;

	const nodesFill = watch(nodesCount, (nodesCount) => {
		if (nodesCount >= 1 && nodesCount <= 10 ) {
			adjacencyList.value = {
				nodes: [],
				edges: []
			};
			let nodeNames
			for (let node = 1; node <= nodesCount; node++) {
				nodeNames = String.fromCharCode(node + 64);
				// adjacencyList.value[nodeNames] = [];
				adjacencyList.value.nodes.push({
					id: node,
					name: nodeNames
				});
			}
			nodesCountError.value = false;
		}
		else if (nodesCount === '') {
			nodesCountError.value = false;
		}
		else {
			adjacencyList.value = {
				nodes: [],
				edges: []
			};
			nodesCountError.value = true;
		}
		renderGraph();
	});

	const renderGraph = () => {

		/*const svg = d3.select("#canvas");
		const selection = svg
			.selectAll("circle")
			.data(Object.keys(adjacencyList.value));

		selection.exit().remove();
		selection.enter().append("circle").merge(selection);

		selection
			.attr("cx", posX)
			.attr("cy", posY)
			.attr("r", 20)
			.attr("fill", "blue");*/
		const svg = d3.select("#canvas")
			.selectAll("circle")
			.remove()
			.data(adjacencyList.value.nodes)
			.enter()
			.append("circle")
			.attr("r", 20)
			.attr("cx", (d, i) => {console.log(d, i); return d.id * 100})
			.attr("cy", posY)
			.style("fill", "red")

	}

	onMounted(() => {
		graph = d3.select("#canvas");
		renderGraph();
	});

</script>

<template>
	<div class="flex flex-col justify-start items-center">
		<h1 class="mb-10">Матрица смежности</h1>
		<div>
			<span>Введите количество вершин(от 1 до 10): </span>
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
				Ошибка! Неккоректное число вершин!
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

-->