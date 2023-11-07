<script setup>

</script>

<template>
	<router-link to="/graphs">
		<button class="m-5 pt-5 pb-5 pl-10 pr-10 text-3xl">Graphs</button>
	</router-link>
	<router-link to="/prob">
		<button class="m-5 pt-5 pb-5 pl-10 pr-10 text-3xl">Probability theory</button>
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