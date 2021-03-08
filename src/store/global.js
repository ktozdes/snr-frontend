import {User} from "@/interfaces/User";
import Vue from "vue";

export default {
	state: {
		routerProp: null,
		organization: []
	},
	getters: {
		getRouterProp(state) {
			return state.routerProp;
		},
		getOrganization(state) {
			return state.organization;
		}
	},
	actions: {
		setRouterProp(state, routerProp) {
			state.commit('setRouterProp', routerProp);
		},
		setOrganization(state, organization) {
			state.commit('setOrganization', organization);
		},
		setCurrentOrganization(state, organizationID) {
			Vue.axios.get(process.env.VUE_APP_API_URL + '/organization/show/' + organizationID)
				.then(response => {
					if (response.data?.organization) {
						state.commit('setOrganization', response.data?.organization);
					}
				})
				.catch(error => {
					console.log(error);
				});

		},
	},
	mutations: {
		setRouterProp(state, routerProp) {
			state.routerProp = routerProp;
			console.log('%c routerProp', 'color: #3273dc', state.routerProp);
		},
		setOrganization(state, organization) {
			state.organization = organization;
			console.log('%c organization', 'color: #3273dc', state.organization);
		},
		setCurrentOrganization(state, organizationID) {
			console.log('%c setCurrentOrganization', 'color: #3273dc', state.organization);
		},
	}
};
