<template>
  <div >
  	<mt-cell v-for="item in menu"
		  :title="item.title"
		  :to="'/'+item.name"
		  is-link
		  >
		</mt-cell>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data(){
  	return {
  		selected:"pic-num",
  		menu:[
				{
					"title":"看图猜数",
					"name":"picnum"
				},
				{
					"title":"看数猜图",
					"name":"numpic"
				},
				{
					"title":"记忆训练",
					"name":"memory"
				},
				{
					"title":"边角识别",
					"name":"edgeangle"
				}
			]

  	}
  },
  methods:{
  	redirect:function(){
  		
  	}
  }
}
</script>

<style>
</style>
