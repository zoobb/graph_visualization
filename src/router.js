import {createMemoryHistory, createRouter} from "vue-router";
import HomePage from "./views/HomePage.vue";
import GraphsPage from "./views/GraphsPage.vue";
import PTPage from "./views/PTPage.vue";
import PlayGround from "./views/PlayGround.vue";
import BronKerbosch from "./views/BronKerbosch.vue";
import PrimAlgorithm from "./views/PrimAlgorithm.vue";

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
	},{
		name: 'BK',
		path: '/bron_kerbosch',
		component: BronKerbosch
	},{
		name: 'Playground',
		path: '/playground',
		component: PlayGround
	},{
		name: 'Prims',
		path: '/prims',
		component: PrimAlgorithm
	}]
});
export default router;