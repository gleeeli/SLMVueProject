<template>
	<div class="tn-wrap" id="topNavigationId">
		<div class="tn-title"></div>
		<div class="tn-input">
			<div class="mod-search-input-wr ui-left">
				<label for="top-search-input" class="mod-search-label" style="display: block;" v-if="searchKeyWord.length ==0 && isblur">请输入作品名称</label>
				<input class="mod-search-input ac_input" type="text" id="top-search-input" value="" autocomplete="off" v-model="searchKeyWord"
				 @focus="inputEvent('focus')" @blur="inputEvent('blur')">
				<div class="ac_results" v-if="searchResults.length>0 &&(isblur == 0 ||isFocuseInResults)" @mouseenter="mouseEnter"  @mouseleave="mouseLeave">
					<ul>
						<li v-for="item in searchResults">
							<router-link :to="{ path: '/WorkDetail', query: { productId: item.id }}">{{item.name}}</router-link>
						</li>
					</ul>
				</div>
			</div>
			<button class="mod-search-submit ui-left ui-text-hide" type="submit" v-on:click="clickToSearch()">搜索</button>
		</div>
	</div>
</template>

<script>
	import HTTPUtil from '../js/HttpUtil.js'
	export default {
		data() {
			return {
				searchResults: [],
				searchKeyWord: '',
				isblur: 1,
				isFocuseInResults:0
			}
		},
		methods: {
			mouseEnter:function(event) {
				console.log('鼠标进入x:'+event.offsetX)
				this.isFocuseInResults = 1;
			},
			mouseLeave:function(event) {
				console.log('鼠标移出x:'+event.offsetX)
				this.isFocuseInResults = 0;
			},
			clickToSearch: function() {
				this.$router.push({
					path: '/CategoryLookMore',
					query: {
						pageNumber: 1,
						searchKeyWord: this.searchKeyWord
					}
				})
			},
			inputEvent: function(type) {
				if (type == 'focus') {
					this.isblur = 0;
					console.log('获得焦点');
				} else {
					this.isblur = 1;
					console.log('失去焦点');
				}
			},
			searchForKeyWord: function(keyWork) {
				var params = new URLSearchParams();
				params.append('name', keyWork);
				params.append('pageNumber', '1');
				params.append('pageSize', '10');

				HTTPUtil.post('product/serch.do', params)
					.then(response => {
						console.log(response.data);
						if (response.data.code == 0) {
							let data = response.data.data;
							this.searchResults = data.list;

						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			// 键盘事件
			handleKeyup(event) {
				const e = event || window.event || arguments.callee.caller.arguments[0]
				if (!e) return
				const {
					key,
					keyCode
				} = e
				console.log(keyCode)
				console.log(key)
			}
		},
		watch: {
			'searchKeyWord': function(newvalue) {
				this.searchKeyWord = newvalue;
				console.log('输入：' + newvalue)
				if (newvalue.length > 0) {
					this.searchForKeyWord(newvalue)
				} else {
					this.searchResults = []
				}

			}
		},
		mounted() {
			let searchKeyWord = this.$route.query.searchKeyWord;
			if (searchKeyWord) {
				this.searchKeyWord = searchKeyWord;
			}
			window.addEventListener('keyup', this.handleKeyup)
		}
	}
</script>

<style>
	@import "../css/TopNavigation.css";
</style>
