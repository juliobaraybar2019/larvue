import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes:[
		{
			path: '/',
			name: 'home',
			component: require('./components/App.vue')


		},
		{
			path: '/productos',
			name: 'productos',
			component: require('./views/ExampleComponent.vue')
		},
		{
			path: '/clientes',
			name: 'clientes',
			component: require('./views/ClienteComponent.vue')
		}

	],
	mode: 'history'
})