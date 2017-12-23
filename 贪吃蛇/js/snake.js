function Snake(){
	this.body=[
	{"row":3,"col":8},
	{"row":3,"col":7},
	{"row":3,"col":6},
	{"row":3,"col":5},
	{"row":3,"col":4}
	];
	this.direction="R";
	 this.willdirection="R";
}
// 渲染蛇的颜色
Snake.prototype.render=function(){
	game.setColor(this.body[0].row,this.body[0].col,"blue");
	for (var i = 1; i < this.body.length; i++) {
		game.setColor(this.body[i].row,this.body[i].col,"red");
	};
}
//蛇的运动
Snake.prototype.update=function(){
	 this.direction=this.willdirection;
	switch(this.direction) {
		case "R":
			var toucha={"row":this.body[0].row,"col":this.body[0].col+1};
			this.body.unshift(toucha);
			break;
		case "L":
			var toucha={"row":this.body[0].row,"col":this.body[0].col-1};
			this.body.unshift(toucha);
			break;
		case "U":
			var toucha={"row":this.body[0].row-1,"col":this.body[0].col};
			this.body.unshift(toucha);
			break;
		case "D":
			var toucha={"row":this.body[0].row+1,"col":this.body[0].col};
			this.body.unshift(toucha);
			break;
	}
	var self=this;
	//判断蛇撞墙
	if(toucha.row<0||toucha.col<0||toucha.row>game.rowAmount-1||toucha.col>game.colAmount-1){
		alert("你撞墙了，游戏结束，长度是"+(this.body.length-1));
		this.body.shift();
		clearInterval(game.timer);
		}else if(
			//判断蛇撞到自己
		(function(){for (var i = 1; i <self.body.length; i++) {
				if(toucha.row==self.body[i].row&&toucha.col==self.body[i].col){
				return true;
				}
			}
		return false;
		}
		)()
		){
			alert("你撞自己了，游戏结束，长度是"+(this.body.length-1));
			this.body.shift();
			clearInterval(game.timer);
		}else if(
			//判断蛇是否吃到食物
			(function(){
				if(toucha.row==game.food.row&&toucha.col==game.food.col){
					return true;
				}else{
					return false;
				}
			})()
			){
			game.food=new Food(game);
			game.f=0;
		}else{
			this.body.pop();
		}
	

		

	

}
Snake.prototype.changedirection=function(str){
	this.willdirection=str;
}