<template>
	<section class="cube-container">
<!--		<div class="cube angle" v-bind:class="cube-class">-->
		<div v-bind:class="cubeClass">
			<figure v-bind:class="front"></figure>
			<figure class="back"></figure>
			<figure v-bind:class="right"></figure>
			<figure class="left"></figure>
			<figure v-bind:class="top"></figure>
			<figure class="bottom"></figure>
		</div>
	</section>
</template>

<script>
	Array.prototype.chooseOne=function(){
		return this[Number.parseInt(Math.random()*this.length)];
	}
	Array.prototype.shuffle = function() { 
		for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x); 
		return this; 
	}; 
	export default {
		props:['type'],//1棱块 2角块
	 	name: 'cube',
	  	data () {
	    	return {
	     		front: 'front',
	     		right: 'right',
	     		top: 'top',
	     		colorObj:{
					"1":"blue",
					"2":"red",
					"3":"green",
					"4":"orange",
					"5":"yellow",
					"6":"white",
				}
	    	}
	  	},
	  	created:function(){
	  		if(this.type==1){
	  			this.renderEdge();
	  		}else{
	  			this.renderAngle();
	  		}
/*	  		if(this.cubeClass){
	  			console.log("this.cubeClass初始化")
	  		}else{
	  			console.log("this.cubeClass未初始化")
	  			this.cubeClass='cube angle'
	  		}*/
	  	},
	  	methods:{
	  		rotate:function(){
	  			this.cubeClass='cube edge'
	  			this.$emit('define','子组件返回的数据')
	  		},
	  		getColor:function(i){
	  			return this.colorObj[i];
	  		},
	  		renderEdge:function(){
	  			this.cubeClass='cube edge'
	  			let anglesArr=["1-2-5","2-3-5","3-4-5","4-1-5","1-6-2","2-6-3","3-6-4","4-6-1",];//逆时针
  				let edgesArr=["1-5","2-5","3-5","4-5","1-2","2-3","3-4","4-1","1-6","2-6","3-6","4-6",];
  				//随机选取
  				let edgeColor=edgesArr.chooseOne();
  				let arr=edgeColor.split("-");
  				arr.shuffle();
  				this.front='front '+this.getColor(arr[0]);
  				this.top='top '+this.getColor(arr[1]);
	  		},
	  		renderAngle:function(){
	  			this.cubeClass='cube angle'
	  			let anglesArr=["1-2-5","2-3-5","3-4-5","4-1-5","1-6-2","2-6-3","3-6-4","4-6-1",];//逆时针
  				//随机选取
  				let color=anglesArr.chooseOne();
  				let arr=color.split("-");
  				let index=[0,1,2].chooseOne();
  				if(index==1){
  					arr=[arr[1],arr[2],arr[0],]
  				}else if(index==2){
  					arr=[arr[2],arr[0],arr[1],]
  				} 
  				/*arr.shuffle();*/
  				this.front='front '+this.getColor(arr[0]);
  				this.right='right '+this.getColor(arr[1]);
  				this.top='top '+this.getColor(arr[2]);
	  		},
	  		refresh:function(){
	  			if(this.type==1){
		  			this.renderEdge();
		  		}else{
		  			this.renderAngle();
		  		}
	  		}
	  	}
	}
</script>

<style>
	.cube-container {
  width: 160px;
  height: 160px;
  position: relative;
  float:left;
  margin: 10px auto ;
/*  border: 1px solid #CCC;*/
  perspective: 1000px;
}

.cube {
  width: 100%;
  height: 100%;
  position: absolute;

          transform-style: preserve-3d;

          transition: transform 1s;
}
/*.cube:hover{
transform: rotateX(360deg) rotateY(360deg);
}*/
.cube figure {
  display: block;
  position: absolute;
  width: 96px;
  height: 96px;
  border: 2px solid black;
  line-height: 96px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.cube.panels-backface-invisible figure {
          backface-visibility: hidden;
}

.front  { background: rgba(0,0,255,0.8); }
.right  { background: rgba(255,0,0,0.8); }
.back  { background: rgba(0,255,0,0.8); }
.left  { background: rgba(255,128,0,0.98); }
.top  { background: rgba(255,255,0,0.8); }
.bottom  { background: rgba(238,238,238,0.8); }

.blue  { background: rgba(0,0,255,0.8); }
.red  { background: rgba(255,0,0,0.8); }
.green  { background: rgba(0,255,0,0.8); }
.orange  { background: rgba(255,128,0,0.98); }
.yellow  { background: rgba(255,255,0,0.8); }
.white  { background: rgba(238,238,238,0.8); }
/*.front  { background: hsla(   240, 100%, 50%, 0.7 ); }
.back   { background: hsla(  120, 100%, 50%, 0.7 ); }
.right  { background: hsla( 0, 100%, 50%, 0.7 ); }
.left   { background: hsla( 60, 100%, 50%, 0.7 ); }
.top    { background: hsla( 80, 100%, 50%, 0.7 ); }
.bottom { background: hsla( 160, 100%, 50%, 0.7 ); }*/

.cube .front  {
          transform: translateZ( 50px );
}
.cube .back   {
          transform: rotateX( -180deg ) translateZ( 50px );
}
.cube .right {
          transform: rotateY(   90deg ) translateZ( 50px );
}
.cube .left {
          transform: rotateY(  -90deg ) translateZ( 50px );
}
.cube .top {
          transform: rotateX(   90deg ) translateZ( 50px );
}
.cube .bottom {
          transform: rotateX(  -90deg ) translateZ( 50px );
}
/*观察点为上面 */
.edge {
	transform: translateZ( -100px ) rotateX(-45deg);
}		

.angle {
	 
	 transform: translateZ( -100px ) rotateX(-45deg) rotateY(-45deg);;
}


</style>