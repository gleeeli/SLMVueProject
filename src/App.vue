<template>
  <div id="app" class="tn-body">
	<router-view :key='key'></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  computed:{
	  key(){
		  return this.$router.path + + Math.random();
	  }
  }
}
</script>

<style>
	@import "./css/SLMComm.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
