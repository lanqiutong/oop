function Map(){
	this.code=[
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxx□□□□□□□□□□□□xxx",
	"xxxxxxxxxxxxxxxxxx",
	"xxxxxxxxxxxxxxxxxx",
	"xxxxxxxxxxxxxxxxxx"
	];
	this.score=0;
}
Map.prototype.render=function(){
	for (var i = 0; i <20; i++) {
		for (var j = 0; j < 12; j++) {
			var char=this.code[i][j+3];
			if(char!="□"){
			game.setclass(i,j,"b"+char);
		}
		}
	}
}
//判断是否卡住
Map.prototype.check=function(row,col,blockcode){
	var cutsquare=[];
	for (var i = 0; i < 4; i++) {
		cutsquare.push(this.code[row+i].substr(col+3,4));
	}
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			//触底
			if( yunsuan(blockcode,i,j) == 1 && cutsquare[i][j] != "□"){
				return false;
			}
		}	
	}
	return true;
}
//添加死亡方块
Map.prototype.addBlockDied=function(row,col,blockcode,color){
	for (var i = 0; i <4; i++) {
		for (var j = 0; j < 4; j++) {
			if(yunsuan(blockcode,i,j)==1){
				this.code[row+i]=changestr(this.code[row+i],col+j+3,color);
			}
		}
	}
}
//消行
Map.prototype.wipe=function(){
	for (var i = 0; i < 20; i++) {		
		if(this.code[i].indexOf("□")==-1){
			this.code.splice(i,1);
			this.code.unshift("xxx□□□□□□□□□□□□xxx");
			this.score++;
		}		
	}
}
function changestr(str,n,newchar){
	return str.substr(0,n)+newchar+str.substr(n+1);
}
function yunsuan(code,m,n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1;
}