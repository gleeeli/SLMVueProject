import Vue from 'vue'
import Router from 'vue-router'
import CategoryLookMore from '../components/CategoryLookMore.vue'
import Home from '../components/Home.vue'
import Error404 from '../components/pages/Error404.vue'
import WorkDetail from '../components/WorkDetail.vue'
import ALogin from '../admin/ALogin.vue'
import AHome from '../admin/AHome.vue'
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
			path: '/admin/login',
			name: '/admin/login',
			component: ALogin
		},
		{
			path: '/admin/home',
			name: '/admin/home',
			component: AHome
		},
		{
			path: '*',
			name: 'default',
			redirect: '/'
		}
	]
})