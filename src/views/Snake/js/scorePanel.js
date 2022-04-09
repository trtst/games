// 定义记分牌和等级
class ScorePanel {
    // 记录分数和等级
    score = 0;
    level = 1;

    // 分数和等级元素
    scoreEle; 
    levelEle;

    // 最高等级，如最高等级为10级
    maxLevel;
    // 升级条件，如每10分升级
    upScore;
    constructor (maxLevel = 10, upScore = 10) {
        this.scoreEle = document.getElementById('score');
        this.levelEle = document.getElementById('level');
        this.maxLevel = maxLevel;
        this.upScore = upScore;

        this.init();
    }

    init () {
        this.score = 0;
        this.level = 1;
        this.scoreEle.innerHTML = '0';
        this.levelEle.innerHTML = '1';
    }

    // 加分的方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';

        if (this.score % this.upScore == 0 || this.upScore == 0) {
            this.levelUp()
        }
    }

    // 提升等级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}

export default ScorePanel;