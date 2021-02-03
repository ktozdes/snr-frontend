import Vue from "vue";
import VueRouter from "vue-router";

import store from '../store'

Vue.use(VueRouter);

// Layouts
import DashboardLayout from "@/modules/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/modules/Authentication/AuthLayout";

// Pages
import Login from "@/modules/Authentication/Login";
import Register from "@/modules/Authentication/Register";


// Dashboard pages
import Dashboard from "@/modules/Dashboard/Dashboard.vue";
import Calendar from "@/modules/Dashboard/Calendar.vue";
import RegularTables from "@/modules/Dashboard/Tables/RegularTables";

import WordList from "@/modules/Word/WordList";
import WordEditor from "@/modules/Word/WordEditor";
import WordSelector from "@/modules/Word/WordSelector";

import RoleList from "@/modules/Role/RoleList";
import RoleEditor from "@/modules/Role/RoleEditor";

let authPages = {
	path: "/",
	component: AuthLayout,
	name: "Authentication",
	redirect: "login",
	children: [
		{
			path: "/login",
			name: "Login",
			component: Login
		},
		{
			path: "/register",
			name: "Register",
			component: Register
		}
	]
};

let dashboardPages = {
	path: "/",
	component: DashboardLayout,
	name: "HomePage",
	meta: {
		middleware: ['auth']
	},
	children: [
		{
			path: "word",
			name: "WordList",
			components: {default: WordList},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "word/edit/:id",
			name: "WordEdit",
			components: {default: WordEditor},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "word/selector",
			name: "WordSelector",
			components: {default: WordSelector},
			meta: {
				middleware: ['auth']
			},
		},

		{
			path: "role",
			name: "RoleList",
			components: {default: RoleList},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "word/create/",
			name: "WordCreate",
			components: {default: WordEditor},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "role/edit/:id",
			name: "RoleEdit",
			components: {default: RoleEditor},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "role/create/",
			name: "RoleCreate",
			components: {default: RoleEditor},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "regular-table",
			name: "regularTable",
			components: {default: RegularTables},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "dashboard",
			name: "Dashboard",
			components: {default: Dashboard},
			meta: {
				middleware: ['auth']
			},
		},
		{
			path: "calendar",
			name: "Calendar",
			components: {default: Calendar}
		},
		// {
		//   path: "charts",
		//   name: "Charts",
		//   components: { default: Charts }
		// },
		// {
		//   path: "widgets",
		//   name: "Widgets",
		//   components: { default: Widgets }
		// }
	]
};


const routes = [
	authPages,
	dashboardPages
];


const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

// Here goes my logic
router.beforeEach((to, from, next) => {
	//no middleware
	if (!to.meta.middleware) {
		return next()
	}

	const user = store.getters.getUser;
	console.log('router', user);
	if (to.meta.middleware.includes("auth") && user.is_authorized !== true) {
		next('/login');
		return false;
	}
	return next();
});

export default router;
