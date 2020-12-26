import Vue from 'vue'
import Router from 'vue-router'
import CategoryLookMore from '../components/CategoryLookMore.vue'
import Home from '../components/Home.vue'
import Error404 from '../components/pages/Error404.vue'
import WorkDetail from '../components/WorkDetail.vue'
import ChapterList from '../components/pages/ChapterList.vue'
import Comment from '../components/pages/Comment.vue'

import LookComic from '../components/LookComic.vue'
import MetaInfo from 'vue-meta-info'

import ALogin from '../admin/ALogin.vue'
import AHome from '../admin/AHome.vue'
import AHProductList from '../admin/product/AList.vue'
import AHUserList from '../admin/user/userList.vue'
import DreamChat from '../admin/chat/DreamChat.vue'

Vue.use(Router)
Vue.use(MetaInfo)

//解决点击路由跳转相同地址 会报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
};
//end

export default new Router({
	mode: 'hash',
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
			component: WorkDetail,
			redirect: '/WorkDetail/list',//默认加载的子路由
			children: [
				{
					path: '/WorkDetail/list',
					component: ChapterList
				},
				{
					path: '/WorkDetail/comment',
					component: Comment
				}
			]
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
			path: '/home/dreamChat',
			name: '/home/dreamChat',
			component: DreamChat
		},
		{
			path: '/admin/home',
			name: '/admin/home',
			component: AHome,
			redirect: '/admin/home/product/list',
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
