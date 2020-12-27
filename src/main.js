import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AdminDefined from './js/AdminDefined.js'
import dsbridge from './js/dsbridge.js'

Vue.prototype.$AdminDefined = AdminDefined;
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
	//SEO 添加mounted，不然不会执行预编译
	// mounted() {
 //    document.dispatchEvent(new Event('render-event'));
 //  }
}).$mount('#app')
