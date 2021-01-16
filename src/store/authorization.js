import {User} from "@/interfaces/User";
import Vue from "vue";

export default {
	state: {
		user: new User({
			access_token : localStorage.getItem('access_token')
		}),
	},
	getters: {
		getUser(state) {
			return state.user;
		}
	},
	actions: {
		login(state, user) {
			if (user.access_token) {
				localStorage.setItem('access_token', user.access_token);
			}
			state.commit('login', user);
		},
		logout(state, user) {
			localStorage.removeItem('access_token');
			state.commit('logout', user);
		}
	},
	mutations: {
		login(state, user) {
			state.user = user;
			console.log('%c login', 'color: #3273dc', state.user);
		},
		logout(state, user) {
			state.user = new User();
			console.log('%c logout', 'color: #3273dc', state.user);
		}
	}
};
