// =========================================================
// * Vue Material Dashboard PRO - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";

import DashboardPlugin from "./material-dashboard";

// Plugins
import App from './App.vue';
import Chartist from "chartist";

// router setup
import router from "./router";

// store
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

require('./vue.filter');
require('./vue.mixin');

window.BASE_URL = process.env.VUE_APP_API_URL;

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

// global library setup
Vue.prototype.$Chartist = Chartist;


const startVue = () => {
	new Vue({
		el: "#app",
		render: h => h(App),
		router,
		store
	});
}

import {User} from "@/interfaces/User";
const user = store.getters.getUser;

if (user.access_token) {
	axios.get(process.env.VUE_APP_API_URL + '/user/get',
	{
		headers: {
			Authorization: 'Bearer ' + user.access_token,
		}
	})
	.then(response => {
		let tempUser = new User(response.data.user);
		tempUser.access_token = user.access_token;
		tempUser.is_authorized = true;
		store.dispatch('login', tempUser);
		store.dispatch('setOrganization', response.data.organization);
		store.dispatch('setPermissions', response.data.permissions);
		startVue();
	})
	.catch(error => {
		console.log(error);
		store.dispatch('logout');
		startVue();
	});
}
else {
	startVue();
}


/* eslint-disable no-new */

