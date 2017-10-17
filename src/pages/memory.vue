<template>
	<div >
		<mt-button type="primary" size="large" v-for="btn in btnList" @click="btnClick(btn.num)">随机{{btn.num}}</mt-button>
		<mt-button type="primary" size="normal"  @click="showTip">{{!isTipShow?'打开':'关闭'}}提示</mt-button>
		<mt-button type="primary" size="normal"  @click="showAnsTable">{{!isAnsShow?'打开':'关闭'}}答案面板</mt-button>
		<p v-if="!isAnsShow">{{question}}</p> 
		<div id="">
			
			<mt-button type="default" class="ansBtn" size="small" v-if="isAnsShow" v-for="item in ansList" @click="ansClick(item)">{{item.num}} <mt-badge type="error" size="small" v-if="item.isSequenceShow">{{item.sequence}}</mt-badge></mt-button>
			<img :src="item.src" class="pic" v-for="item in imgList" />
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import PicNum from '../obj/PicNum'
	if (!Array.prototype.shuffle) { 
		Array.prototype.shuffle = function() { 
			for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x); 
			return this; 
		}; 
	} 
	export default{
		name:'memory',
		data(){
			let arr=new Array();
			for(let i=0;i<100;i++){
				arr.push({
					num:i,
					isSequenceShow:false,
					sequence:""
				});
			}
			return {
				question:"",
				btnList:[{
					num:15
				},{
					num:30
				}
				],
				ansList:arr,
				userClickList:[],
				isTipShow:false,
				isAnsShow:false,
				imgList:[],
				numList:[],
			}
		},
		created:function(){
		},
		methods:{
			clear:function(){
				this.question="";
				this.userClickList=[];
				this.numList=[];
				let arr=new Array();
				for(let i=0;i<100;i++){
					arr.push({
						num:i,
						isSequenceShow:false,
						sequence:""
					});
				}
				this.ansList=arr;
			},
			btnClick:function(num){
				this.clear()
				//num为个数
				console.log(num)
				let arr=new Array();
				for(let i=0;i<100;i++){
					arr.push(i);
				}
				arr.shuffle()
				arr=arr.slice(0,num)
				console.log(arr)
				this.numList=arr;
				this.question=arr.map(num=>{
					return num<10?("0"+num):num;
				}).join(" ");
			},
			ansClick:function(item){
				//console.log(item)
				if(this.numList==null||this.numList.length==0){
					return ;
				}
				if(item.isSequenceShow){
					//取消显示
					if(item.sequence==this.userClickList.length){
						
						item.isSequenceShow=false;
						item.sequence="";
						this.userClickList.pop();
					}
					return;
				}else{
					//显示角标
					item.isSequenceShow=true;
					item.sequence=this.userClickList.length+1;
					this.userClickList.push(item.num);
					//判断是否完成
					if(this.userClickList.length==this.numList.length){
						
						if(JSON.stringify(this.userClickList) == JSON.stringify(this.numList)){
							let page='<iframe scrolling="no" frameborder=0 width="260px" height="300px"  src="http://winder-tech.top/sites/bonus/index.html"></iframe>';
							MessageBox({
								title:"提示",
								message:page,
								closeOnClickModal:false,
							}).then(action=>{
								this.clear();
							})
						}else{
							MessageBox({
								title:"提示",
								message:"回答错误",
								closeOnClickModal:false,
							});
						}
					}
				}
			},
			showTip:function(){
				if(this.isTipShow){
					this.imgList=[]
				}else{
					this.imgList=this.numList.map(num=>{
						return {
							src:PicNum.num2pic(num)
						};
					})
				}
				this.isTipShow=!this.isTipShow;
			},
			showAnsTable:function(){
				this.isAnsShow=!this.isAnsShow;
			}
		}
	}
</script>

<style scoped>
	button{
		margin:5px auto
	}
	.pic{
		width:80px;
		height:80px;
	}
	.ansBtn{
		width:80px;
		margin:3px;
	}
</style>