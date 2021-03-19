import {User} from "@/interfaces/User";
import Vue from "vue";

export default {
	state: {
		routerProp: null,
		organization: [],
		queryFilter: {},
	},
	getters: {
		getRouterProp(state) {
			return state.routerProp;
		},
		getOrganization(state) {
			return state.organization;
		},
		getQueryFilter(state) {
			return state.queryFilter;
		}
	},
	actions: {
		setRouterProp(state, routerProp) {
			state.commit('setRouterProp', routerProp);
		},
		setOrganization(state, organization) {
			state.commit('setOrganization', organization);
		},
		setQueryFilter(state, queryFilter) {
			state.commit('setQueryFilter', queryFilter);
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
		setQueryFilter(state, queryFilter) {
			state.queryFilter ={
				... state.queryFilter,
				... queryFilter
			};
			console.log('%c queryFilter', 'color: #3273dc', state.queryFilter);
		},
		setCurrentOrganization(state, organizationID) {
			console.log('%c setCurrentOrganization', 'color: #3273dc', state.organization);
		},
	}
};
