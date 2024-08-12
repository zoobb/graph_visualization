import {createMemoryHistory, createRouter} from "vue-router";
import GraphsPage from "./views/GraphsPage.vue";

const router = createRouter( {
	history: createMemoryHistory(),
	routes: [{
		name: 'Home',
		path: '/',
		component: GraphsPage
	}]
});
export default router;
