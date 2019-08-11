import Vue from 'vue'
import Router from 'vue-router'
import CategoryLookMore from '../components/CategoryLookMore.vue'
import Home from '../components/Home.vue'
import Error404 from '../components/pages/Error404.vue'
import WorkDetail from '../components/WorkDetail.vue'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes:[
		{
			path: '/',
			name: 'HomeDefault',
			component: Home
		},
		{
			path: '/Home',
			name: 'Home',
			redirect: '/'
		},
		{
			path: '/CategoryLookMore',
			name: 'CategoryLookMore',
			component: CategoryLookMore
		},
		{
			path: '/WorkDetail',
			name: 'WorkDetail',
			component: WorkDetail
		},
		{
			path: '*',
			name: 'default',
			redirect: '/'
		}
	]
})