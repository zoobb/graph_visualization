<script setup>

</script>

<template>
	<router-link to="/graphs">
		<button class="m-5 pt-5 pb-5 pl-10 pr-10 text-3xl">BFS</button>
	</router-link>
	<router-link to="/bron_kerbosch">
		<button class="m-5 pt-5 pb-5 pl-10 pr-10 text-3xl">Bron-Kerbosch</button>
	</router-link>
	<router-link to="/prims">
		<button class="m-5 pt-5 pb-5 pl-10 pr-10 text-3xl">Prim's Algorithm</button>
	</router-link>
	<router-link to="/playground">
		<button class="m-5 pt-5 pb-5 pl-10 pr-10 text-3xl">Coloring</button>
	</router-link>
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
</style>