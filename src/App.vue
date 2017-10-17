<template>
  <div id="app">
<!--  	<mt-header  title="app"></mt-header>-->
<mt-header title="magic">
  <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
  </router-link>
 <!-- <mt-button icon="more" slot="right"></mt-button>-->
</mt-header>
  	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return {
  	}
  },
  created:function(){
  	console.log("app loaded")
  },
  methods:{
  	redirect:function(){
  		
  	}
  }
}
</script>

<style>
 .mint-header{
 	background-color: black !important;
 }
 body{
 	margin: 0px;
 }
</style>
