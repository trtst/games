// 定义一个蛇的类
//            /^\/^\
//          _|__|  O|
// \/     /~     \_/ \
//  \____|__________/  \
//         \_______      \
//                `\     \                 \
//                   |     |                  \
//                  /      /                    \
//                 /     /                       \\
//               /      /                         \ \
//              /     /                            \  \
//            /     /             _----_            \   \
//           /     /           _-~      ~-_         |   |
//          (      (        _-~    _--_    ~-_     _/   |
//           \      ~-____-~    _-~    ~-_    ~-_-~    /
//             ~-_           _-~          ~-_       _-~   
class Snake {
    // 表示蛇整体的元素
    ele;
    // 表示蛇头的元素
    head;
    // 表示蛇身的元素
    bodies;
    
    constructor() {
        this.ele = document.getElementById('snake');
        this.bodies = this.ele.getElementsByTagName('div');
        this.head = this.bodies[0];

        this.init();
    }

    init () {
        this.ele.innerHTML = '<div></div>';
        this.head = this.bodies[0]; // 初始化时，没有头部元素，重新获取头部
    }

    // 获取蛇的坐标（只在蛇头上做验证），即蛇头的坐标  X轴
    get X() {
        return this.head.offsetLeft;
    }

    // Y轴坐标
    get Y() {
        return this.head.offsetTop;
    }

    // 设置 X轴坐标
    set X(val) {
        if (this.X === val) {
            return;
        }

        // 判断蛇的移动范围
        if (val < 0 || val > 290) {
            throw new Error('蛇撞墙了!');
        }

        // 修改X坐标时，蛇在左右移动，不能掉头
        // 如果只有蛇头 可以掉头；如果蛇头的位置与第二个蛇身的位置一致，代表掉头了
        if (this.bodies[1] && this.bodies[1].offsetLeft === val) {
            // 如果发生掉头，让蛇继续移动
            if (val > this.X) {
                val = this.X - 10;
            } else {
                val = this.X + 10;
            }
        }

        this.moveBody();
        this.head.style.left = val + 'px';
        this.checkHeadBody();
    }

    // 设置 Y轴坐标
    set Y(val) {
        if (this.Y === val) {
            return;
        }

        // 判断蛇的移动范围
        if (val < 0 || val > 290) {
            throw new Error('蛇撞墙了!');
        }

        // 如果只有蛇头 可以掉头；如果蛇头的位置与第二个蛇身的位置一致，代表掉头了
        if (this.bodies[1] && this.bodies[1].offsetTop === val) {
            // 如果发生掉头，让蛇继续移动
            if (val > this.Y) {
                val = this.Y - 10;
            } else {
                val = this.Y + 10;
            }
        }

        this.moveBody();
        this.head.style.top = val + 'px';
        this.checkHeadBody();
    }

    // 吃到食物后，添加一段蛇的身体
    addBody() {
        this.ele.insertAdjacentHTML('beforeend', '<div></div>');
    }

    // 添加一份方法，蛇的身体移动
    moveBody() {
        /* 
            将后边的身体位置设置为前边身体的位置
            如：
            第4节 = 第3节的位置
            第3节 = 第2节的位置
            第2节 = 第1节的位置 
        */
        //  遍历获取所有的身体

        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = this.bodies[i - 1].offsetLeft;
            let Y = this.bodies[i - 1].offsetTop;

            // 将值设置到当前身体上
            this.bodies[i].style.left = X + 'px';
            this.bodies[i].style.top = Y + 'px';
        }
    }

    // 检查蛇头是否与蛇身的坐标发送重叠
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i];

            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞到了自己!');
            }
        }
    }
}

export default Snake;