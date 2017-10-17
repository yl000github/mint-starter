<template>
	<div >
		<div id="">
			
			<mt-button type="danger" size="normal" >{{num}}</mt-button>
		</div>
<!--		<mt-button type="default" size="small" v-for="item in imgList" @click="btnClick(btn.num)">
			<img :src="item.src"  slot="icon">
		</mt-button>-->
		<img v-for="item in imgList" :src="item.src" @click="imgClick(item.num)" class="pic" />
	</div>
</template>

<script>
	import PicNum from '../obj/PicNum'
	import { MessageBox } from 'mint-ui';
	export default{
		name:'numpic',
		data(){
			return {
				winCount:0,
				num:1,
				imgList:[],
			}
		},
		created:function(){
			this.picNum=new PicNum();
			this.render();
		},
		methods:{
			render:function(){
				let rs=this.picNum.refresh();
				console.log('render')
				this.num=rs.num;
				this.src=rs.pic;
				this.btnList=rs.choices;
				rs.pics;
				this.imgList=rs.choices.map((item,index)=>{
					return {
						src:rs.pics[index],
						num:item
					}
				})
				console.log(this.imgList)
			},
			imgClick:function(num){
				console.log(num)
				/*this.picNum.handleChoice(num)*/
				if(this.picNum.checkWin(num)){
					if(this.winCount++>20){
						this.winCount=0;
						let page='<iframe scrolling="no" frameborder=0 width="260px" height="300px"  src="http://winder-tech.top/sites/bonus/index.html"></iframe>';
						MessageBox({
							title:"提示",
							message:page,
							closeOnClickModal:false,
						}).then(action=>{
							this.render();
						})
					}else{
						this.render();
					}
				}else{
					MessageBox({
						title:"提示",
						message:"回答错误",
						closeOnClickModal:false,
					});
				}
			}
		}
	}
</script>

<style scoped>
	button{
		margin:5px auto
	}
	.pic{
		width:150px;
		height:150px;
		margin:9px;
	}
</style>