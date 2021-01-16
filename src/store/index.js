import Vue from "vue";
import Vuex from "vuex";

import authorization from './authorization';
import global from './global';

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		authorization,
		global
	}
})
