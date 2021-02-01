import {User} from "@/interfaces/User";
import Vue from "vue";

export default {
	state: {
		user: new User({
			access_token : localStorage.getItem('access_token')
		}),
		permissions: []
	},
	getters: {
		getUser(state) {
			return state.user;
		},
		getPermissions(state) {
			return state.permissions;
		}
	},
	actions: {
		login(state, user) {
			if (user.access_token) {
				localStorage.setItem('access_token', user.access_token);
			}
			state.commit('login', user);
		},
		logout(state) {
			localStorage.removeItem('access_token');
			state.commit('logout');
		},
		setPermissions(state, permissions) {
			state.commit('setPermissions', permissions);
		},
	},
	mutations: {
		login(state, user) {
			state.user = user;
			console.log('%c login', 'color: #3273dc', state.user);
		},
		logout(state) {
			state.user = new User();
			console.log('%c logout', 'color: #3273dc', state.user);
		},
		setPermissions(state, permissions) {
			state.permissions = permissions;
			console.log('%c setPermissions', 'color: #3273dc', state.permissions);
		},
	}
};
