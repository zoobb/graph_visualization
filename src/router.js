import {createMemoryHistory, createRouter} from "vue-router";
import HomePage from "./views/HomePage.vue";
import GraphsPage from "./views/GraphsPage.vue";
import PTPage from "./views/PTPage.vue";

const router = createRouter( {
	history: createMemoryHistory(),
	routes: [{
		name: 'Home',
		path: '/',
		component: HomePage
	},{
		name: 'Graphs',
		path: '/graphs',
		component: GraphsPage
	},{
		name: 'PT',
		path: '/prob',
		component: PTPage
	}]
});
export default router;