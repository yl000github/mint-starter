<template>
	<div >
		<img :src="src" class="pic" />
		<mt-button :type="btn.type" size="large" v-for="btn in btnList" @click="btnClick(btn.num)">{{btn.num}}</mt-button>
	</div>
</template>

<script>
	import PicNum from '../obj/PicNum'
	import { MessageBox } from 'mint-ui';
	export default{
		name:'picnum',
		data(){
			return {
				winCount:0,
				src:"",
				btnList:[],
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
				this.src=rs.pic;
				this.btnList=rs.choices;
				console.log(this)
				let btnStyle=['default', 'primary', 'danger'];
				this.btnList=rs.choices.map(num=>{
					return {
						num:num,
						type:'default'
/*						type:btnStyle[Number.parseInt(Math.random()*btnStyle.length)]*/
					}
				})
				/*this.$set(this.$data,'btnList',this.btnList)*/
			},
			btnClick:function(num){
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
		width:200px;
		height:200px;
	}
</style>