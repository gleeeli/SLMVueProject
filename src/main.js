import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')


// const app = new Vue({
//   el: '#app',
//   router,
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       const matchingView = routes[this.currentRoute]
// 	  console.log('匹配：'+matchingView)
// 	  return require('./components/pages/error.vue')
//       // return matchingView
//       //   ? require('./components'+matchingView + '.vue')
//       //   : require('./components/pages/error.vue')
//     }
//   },
//   render (h) {
//     return h(this.ViewComponent)
//   }
// })
// 
// window.addEventListener('popstate', () => {
//   app.currentRoute = window.location.pathname
// })
