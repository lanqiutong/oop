function Game(){
	this.rowAmount=16;
	this.colAmount=20;
	this.init();
	this.snake=new Snake();
	this.food=new Food(this);
	this.start();
	this.bindEvent();
	
}
Game.prototype.init=function(){
	//创建表格（地图）
	this.dom=document.createElement("table");
	var tr,td;
	for (var i = 0; i < this.rowAmount; i++) {
		tr=document.createElement("tr");
		for (var j = 0; j < this.colAmount; j++) {
			td=document.createElement("td");
			tr.appendChild(td);
		};
		this.dom.appendChild(tr);
	};
	document.getElementById("app").appendChild(this.dom);
}
//设置颜色
Game.prototype.setColor=function (row,col,color){
		this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background=color;	
}
//清屏
Game.prototype.clear=function(){
	for (var i = 0; i < this.rowAmount; i++) {
		for (var j = 0; j < this.colAmount; j++) {
			this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background="#fff";
		}
	}
}
//开始游戏
Game.prototype.start=function(){
	var self=this;
	this.f=0;
	this.timer=setInterval(function(){
		self.f++;
		self.clear();
		document.getElementsByTagName("h3")[0].innerHTML="帧编号："+self.f;
		var during=self.snake.body.length<30 ? 30-self.snake.body.length : 1;
		if(self.f%during==0) self.snake.update();
		self.snake.render();
		self.food.render();
	} ,20);
}
//绑定键盘监听事件
Game.prototype.bindEvent=function (){
	var self=this;
	document.onkeydown=function(event){
		
		if(event.keyCode==37){
			//禁止掉头
			if(self.snake.direction=="R") return;
			self.snake.changedirection("L");
		}
		if(event.keyCode==38){
			if(self.snake.direction=="D") return;
			self.snake.changedirection("U");
		}
		if(event.keyCode==39){
			if(self.snake.direction=="L") return;
			self.snake.changedirection("R");
		}
		if(event.keyCode==40){
			if(self.snake.direction=="U") return;
			self.snake.changedirection("D");
		}
		// console.log(event.keyCode,self.snake.direction);
	}
}