import Snake from './snake.js'
import Food from './food.js'
import ScorePanel from './scorePanel.js'

class GameControl {
    snake;
    food;
    scorePanel;
    // 蛇的移动方向
    direction = '';
    // 记录游戏是否结束
    isLive = true;
    // 开启游戏按钮
    btn;
    // 游戏结束后显示
    over;
    // 清除定时器
    timer = 0;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.btn = document.getElementById('btn');
        this.over = document.getElementById('over');

        this.init()
    }

    // 游戏的初始化，调用后游戏即开始
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.btn.addEventListener('click', this.onOff.bind(this));
    }

    /* 
        ArrowUp Up
        ArrowRight Right
        ArrowDown Down
        ArrowLeft Left
    */
    keydownHandler(e) {
        // 修改移动方向
        this.direction = e.key;
    }

    run() {
        /* 
            根据方向（this.direction）来改变蛇的位置
            向上 Top 减少
            向右 Left 增加
            向下 Top 增加
            向左 Left 减少
        */
        //获取蛇的现在坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch(this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top值减少
                Y -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left值增加
                X += 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top值增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left值减少
                X -= 10;
                break;
        }

        //检测蛇是否吃到了食物
        if (this.checkEat(X, Y)) {
            // 蛇吃到食物后，食物的位置进行重置
            this.food.change();

            // 同时 分数增加
            this.scorePanel.addScore();

            // 同时  蛇的身体增加一截
            this.snake.addBody();
        }

        try {
            // 修改蛇的坐标,让蛇移动
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            // 进入到catch,说明出现了异常,游戏结束.
            console.log(e.message);
            this.over.style.display = 'block';
            this.isLive  = false; // 游戏结束
            this.btn.className = '';
        }

        clearTimeout(this.timer);
        this.isLive && (this.timer = window.setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30));
    }

    // 定义一个方法，用来检测蛇是否吃到了食物
    checkEat (X, Y) {
        return this.food.X === X && this.food.Y === Y;
    }

    onOff () {
        if (this.btn.className === 'active') return;
        this.over.style.display = 'none';
        this.isLive  = true;
        this.snake.init();
        this.scorePanel.init();
        this.btn.className = 'active';
        this.direction = 'Right';
        
        setTimeout(() => {
            this.run();
        }, 300)
    }
}

export default GameControl;