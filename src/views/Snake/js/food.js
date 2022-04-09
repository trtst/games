// 定义食物类 Food
class Food {
    constructor () {
        // 获取页面中的food元素，并将其赋值给ele
        this.ele = document.getElementById('food');

        this.change();
    }

    // 获取食物X轴坐标
    get X() {
        return this.ele.offsetLeft;
    }

    // 获取食物Y轴坐标
    get Y() {
        return this.ele.offsetTop;
    }

    // 修改食物的X轴、Y轴的位置
    change() {
        // 生成一个随机的位置
        // 食物位置的最小是0、最大是290
        
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;

        this.ele.style.left = top + 'px';
        this.ele.style.top = left + 'px';
    }
}

export default Food;