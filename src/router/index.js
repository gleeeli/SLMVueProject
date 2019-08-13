import Vue from 'vue'
import Router from 'vue-router'
import CategoryLookMore from '../components/CategoryLookMore.vue'
import Home from '../components/Home.vue'
import Error404 from '../components/pages/Error404.vue'
import WorkDetail from '../components/WorkDetail.vue'
import LookComic from '../components/LookComic.vue'
import MetaInfo from 'vue-meta-info'

Vue.use(Router)
Vue.use(MetaInfo)

export default new Router({
	mode:'history',
	scrollBehavior: () => ({
    y: 0
  }),
	routes:[
		{
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
		},
		{
			path: '*',
			name: 'default',
			redirect: '/'
		}
	]
})