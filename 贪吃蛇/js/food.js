function Food(mediator){
	var self=this;
	//随机食物
	do{
		this.row=parseInt(Math.random()*mediator.rowAmount);
		this.col=parseInt(Math.random()*mediator.colAmount);
	}while(
	(function(){
		for (var i = 0; i <mediator.snake.body.length; i++) {
			//判断食物是否在蛇身上
				if(mediator.snake.body[i].row==self.row&&mediator.snake.body[i].col==self.col){
				return true;
				}
			}
		return false;
		}
		)()
	);
}
//食物渲染
Food.prototype.render=function(){
	game.setColor(this.row,this.col,"green");
}