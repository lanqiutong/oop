function Game(){
	this.init();
	this.block=new Block();
	this.nextblock=new Block();
	this.map=new Map();
	this.start();
	this.bindEvent();
}
Game.prototype.init=function(){
	this.dom=document.createElement("table");
	this.dom.style.float="left";
	this.dom.style.margin="10px";
	for (var i = 0; i <20; i++) {
		var tr=document.createElement("tr");
		for (var j = 0; j < 12; j++) {
			var td=document.createElement("td");
			tr.appendChild(td);
		}
		this.dom.appendChild(tr);
	}
	document.getElementById("app").appendChild(this.dom);
	this.dom2=document.createElement("table");
	this.dom2.style.float="left";
	for (var i = 0; i <4; i++) {
		var tr=document.createElement("tr");
		for (var j = 0; j < 4; j++) {
			var td=document.createElement("td");
			tr.appendChild(td);
		}
		this.dom2.appendChild(tr);
	}
	document.getElementById("app").appendChild(this.dom2);
	this.dom3=document.createElement("div");
	this.dom3.id="box";
	
	var btn1=document.createElement("button");
	var btn2=document.createElement("button");
	
	this.dom3.appendChild(btn1);
	this.dom3.appendChild(btn2);
	btn1.innerHTML="重新开始";
	btn2.innerHTML="返回首页";
	this.dom3.style.display="none";
	document.getElementById("app").appendChild(this.dom3);


}
Game.prototype.nextblockrender=function(){
	for(var i = 0 ; i < 4 ; i++){
		for (var j = 0; j < 4; j++) {
			if(yunsuan(this.nextblock.code,i,j)==1){
				this.dom2.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className="b"+this.nextblock.formnum;
			}
		}
	}
}
Game.prototype.setclass=function (i,j,classname){
				this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className=classname;			
}
Game.prototype.clear=function(){
	for (var i = 0; i <20; i++) {
			for (var j = 0; j < 12; j++) {
				this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className="";

			}
		}
	for (var i = 0; i <4; i++) {
			for (var j = 0; j < 4; j++) {
				this.dom2.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className="";
				
			}
		}
}
Game.prototype.start=function(){
	var self=this;
	var f=0;
	this.timer=setInterval(function(){
		f++;
		self.clear();
		if(f%30==0){self.block.update();};
		self.block.render();
		self.map.render();
		self.nextblockrender();
		document.getElementById("score").innerHTML="分数:"+game.map.score*10;	
	}, 20);
}
Game.prototype.bindEvent=function(){
	var self=this;
	document.onkeydown=function(event){
		if(event.keyCode==37){
			self.block.left();
		}
		if(event.keyCode==38){
			self.block.rotate();
		}
		if(event.keyCode==39){
			self.block.right();
		}
		if(event.keyCode==40){
			self.block.goBottom();
		}
	}
}
function yunsuan(code,m,n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1;
}
