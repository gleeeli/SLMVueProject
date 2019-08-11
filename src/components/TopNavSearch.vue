<template>
	<div class="tn-wrap" id="topNavigationId">
		<div class="tn-title"></div>
		<div class="tn-input">
			<div class="mod-search-input-wr ui-left">
		                <label for="top-search-input" class="mod-search-label" style="display: block;">请输入作品名称</label>
		                <input class="mod-search-input ac_input" type="text" id="top-search-input" value="" autocomplete="off">
						<div class="ac_results" >
							<ul>
								<li v-for="item in searchResults">
									<a href="">{{item.name}}</a>
								</li>
							</ul>
						</div>
		            </div>
			<button class="mod-search-submit ui-left ui-text-hide" type="submit">搜索</button>
			</div>
	</div>
</template>

<script>
	export default {
	  name: 'Header',
	  data () {
	    return {
	  		  pictures:["https://manhua.qpic.cn/manhua_detail/0/30_19_18_76faf582bb6e0090b92fe4f129249733_16919.jpg/800",
	  			  "https://manhua.qpic.cn/manhua_detail/0/30_11_27_8d6c234fcdddde443d0631bdf32cb90a_16893.jpg/800",
	  		  "https://manhua.qpic.cn/manhua_detail/0/30_11_29_ebc6a599e69abc05329a0d1070ff03d5_16894.jpg/800"],
	  			searchResults:[{name:'gleeeli'},{name:'gleeeli'}]
	    }
	  }
	}
</script>

<style>
	@import "../css/TopNavigation.css";
</style>
