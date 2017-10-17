<template>
	<div id="">
		<mt-button type="primary" size="large" @click="refresh">刷新</mt-button>
		<cube v-for="item in cubeList" ref="cubeComponent" v-bind:type="item.type"></cube>
	</div>
</template>

<script>
	import cube from '../components/cube'
	export default{
		name:'edgeangle',
		components:{cube},
		data(){
			let arr=[]
			for(let i=0;i<20;i++){
				let type=i>=12?2:1
				arr.push({
					type:type,
				})
			}
			return {
				cubeList:arr
			}
		},
		methods:{
			refresh:function(){
				this.$refs.cubeComponent.forEach(function(item){
					item.refresh();
				})
			},
			init:function(){
				
			},
		}
	}
</script>

<style scoped>
	button{
		margin:5px auto
	}
</style>