<script setup>
	import router from "./router.js";
</script>

<template>
	<router-view v-slot="{Component}">
		<component :is="Component"/>
	</router-view>
</template>

<style>
#app {
	display: flex;
	flex-direction: column;
  height: 100%;
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
