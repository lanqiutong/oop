function Block(){
	//所有形态
	this.allForms=["S","Z","J","L","O","T","I"];
	//自己的形态值
	this.formnum=parseInt(Math.random()*this.allForms.length);
	//自己的形态
	this.form=this.allForms[this.formnum];
	//所有形态code码
	this.allCodes={
	"S":[0x6c00	, 0x8c40],
	"Z":[0xc600	, 0x4c80],
	"J":[0x44c0	, 0x8e00 , 0x6440 , 0x0e20],
	"L":[0x4460 , 0x0e80 , 0xc440 , 0x2e00],
	"O":[0x6600],
	"T":[0x0e40 , 0x4c40 , 0x4e00 , 0x4640],
	"I":[0x4444 , 0x0f00]
	};
	this.codes=this.allCodes[this.form];
	//自己的方向
	this.direction=parseInt(Math.random()*this.codes.length);
	//自己的code码
	this.code=this.codes[this.direction];

	this.row=0;
	this.col=4;
}
Block.prototype.update=function(){
	if(game.map.check(this.row+1,this.col,this.code)){
	this.row++;
}else{	
	//地图上添加触底砖块
		game.map.addBlockDied(this.row,this.col,this.code,this.formnum);
		//消行判定
		game.map.wipe();
		//死亡判定
	 	if(!game.map.check(0,4,this.code)){
	 		alert("你死了,你的分数是"+game.map.score*10);
	 		clearInterval(game.timer);
	 		game.dom3.style.display="block";

	 	}else{
	 		
	 		game.block=game.nextblock;
	 		game.nextblock=new Block();
	 	}
}
}
Block.prototype.rotate=function(){
	this.direction++;
	if(this.direction>this.codes.length-1){
		this.direction=0;
	}
	var nextcode=this.codes[this.direction];
	if(game.map.check(this.row,this.col,nextcode)){
		this.code=nextcode;
	
	}
	
	
}
Block.prototype.left=function(){
	if(game.map.check(this.row,this.col-1,this.code)){
	this.col--;
}
	
}
Block.prototype.right=function(){
	if(game.map.check(this.row,this.col+1,this.code)){
	this.col++;
}
}
Block.prototype.goBottom=function(){
	var i=0;
	while(game.map.check(this.row+i,this.col,this.code)){
		i++;
	}
	this.row=this.row+i-1;
}
Block.prototype.render=function(){
	for(var i = 0 ; i < 4 ; i++){
		for (var j = 0; j < 4; j++) {
			if(yunsuan(this.code,i,j)==1){
				game.setclass(i+this.row,j+this.col,"b"+this.formnum);
			}
		}
	}
	//渲染自己的投影
	// var k=0;
	// while(game.map.check(this.row+k,this.col,this.code)){
	// 	k++;
	// }
	
	// for(var i = 0 ; i < 4 ; i++){
	// 	for (var j = 0; j < 4; j++) {
	// 		if(yunsuan(this.code,i,j)==1){
	// 			game.setclass(i+this.row+k-1,j+this.col,"bb");
	// 		}
	// 	}
	// }

}
function yunsuan(code,m,n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1;
}