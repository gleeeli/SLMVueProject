import Vue from 'vue'
import Router from 'vue-router'
import CategoryLookMore from '../components/CategoryLookMore.vue'
import Home from '../components/Home.vue'
import Error404 from '../components/pages/Error404.vue'
import WorkDetail from '../components/WorkDetail.vue'

import LookComic from '../components/LookComic.vue'
import MetaInfo from 'vue-meta-info'

import ALogin from '../admin/ALogin.vue'
import AHome from '../admin/AHome.vue'
import AHProductList from '../admin/product/AList.vue'
import AHUserList from '../admin/user/userList.vue'
Vue.use(Router)
Vue.use(MetaInfo)

export default new Router({
	mode: 'history',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: [{
			path: '/',
			name: 'HomeDefault',
			component: Home
		},
		{
			path: '/Home',
			name: 'Home',
			component: Home
			// redirect: '/'
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

			path: '/LookComic',
			name: 'LookComic',
			component: LookComic
		}, {
			path: '/admin/login',
			name: '/admin/login',
			component: ALogin
		},
		{
			path: '/admin/home',
			name: '/admin/home',
			component: AHome,
			redirect:'/admin/home/product/list',
			children: [{
					path: '/admin/home/product/list',
					component: AHProductList
				},
				{
						path: '/admin/home/user/userList',
						component: AHUserList
					}
			]
		},
		{
			path: '*',
			name: 'default',
			redirect: '/'
		}
	]
})
