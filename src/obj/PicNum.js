import { MessageBox } from 'mint-ui';
import { bonus } from '../components/bonus';
class PicNum{
	constructor(start=0,end=99){
		this.start=start;
		this.end=end;
		this.len=end-start+1;
		if (!Array.prototype.shuffle) { 
			Array.prototype.shuffle = function() { 
				for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x); 
				return this; 
			}; 
		} 
	}
	
	refresh(){
		let num=this.chooseOne();
		this.curNum=num;
		let choices=this.geneChoices(num);
		let pics=this.choices2pics(choices);
		return {
			num:num,
			pic:PicNum.num2pic(num),
			choices:choices,
			pics:pics,
		}
	}
	
	checkWin(choice){
		return choice==this.curNum;
	}
	
	handleChoice(choice){
		if(this.checkWin(choice)){ 
			MessageBox('提示', '<iframe scrolling="no" frameborder=0 width="260px" height="300px"  src="http://winder-tech.top/sites/bonus/index.html"></iframe>');
		}else{
			MessageBox('提示', '回答错误');
		}
	}
	
	chooseOne(){
		return Number.parseInt(Math.random()*this.len);
	}
	
	geneChoices(num){
		//产生4个不同num的数
		let count=3;
		let arr=new Array();
		arr.push(num)
		while(count-->0){
			let cur;
			while(arr.indexOf(cur=this.chooseOne())!=-1){}
			arr.push(cur);
		}
		arr.shuffle()
		return arr;
	}
	
	static num2pic(num){
		return `http://pppppp.bj.bcebos.com/memory/${num}.png`
	}
	
	choices2pics(choices){
		return choices.map(function(item){
			return `http://pppppp.bj.bcebos.com/memory/${item}.png`
		})
	}
	
}
export default PicNum