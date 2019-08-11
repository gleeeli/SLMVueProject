<template>
	<div>
		<TopNavSearch />
		<TopNavCategory />
	</div>
</template>

<script>
	import TopNavSearch from './TopNavSearch.vue'
	import TopNavCategory from './TopNavCategory.vue'
	
	export default {
	  components: {
		  TopNavSearch,
		  TopNavCategory
	  }
	}
</script>

<style>
	
</style>
