import {User} from "@/interfaces/User";

export default {
	state: {
		routerProp: null,
	},
	getters: {
		getRouterProp(state) {
			return state.routerProp;
		},
	},
	actions: {
		setRouterProp(state, routerProp) {
			state.commit('setRouterProp', routerProp);
		},
	},
	mutations: {
		setRouterProp(state, routerProp) {
			state.routerProp = routerProp;
			console.log('%c routerProp', 'color: #3273dc', state.routerProp);
		},
	}
};
