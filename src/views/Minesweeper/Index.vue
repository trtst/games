<template>
<main-layout>
	<div class="header">
		<span :class="{active: index == 0}" @click="init(0)">初级</span>
		<span :class="{active: index == 1}" @click="init(1)">中级</span>
		<span :class="{active: index == 2}" @click="init(2)">高级级</span>
		<span @click="init(index)">重新开始</span>
	</div>
	<p class="total">剩余雷数: {{surplus}}</p>
	<div class="row" v-for="(row, index) in squares">
		<template v-for="item in row">
			<div class="item" :class="classNames(item)"  @click="play(item)" @click.right.prevent="rightHandler(item)">
				<template v-if="item.isShow && !item.isFlag">
					<template v-if="item.type == 'number'">
						{{ item.value }}
					</template>
					<template v-else>
						💣
					</template>
				</template>
			</div>
		</template>
	</div>
</main-layout>
</template>
<script setup>
import MainLayout from '/src/App.vue';
import { computed, onMounted, reactive, toRefs, watch } from "vue";
const arr = [[9, 9, 10], [16, 16, 45], [28, 28, 99]];
const info = reactive({
	row: 0,            // 行数
	column: 0,         // 列数
	bombNum: 0,        // 炸弹数量
	squares: [],       // 存储的所有的方块信息 [[type: 'number', x: 0, y: 0, value: 0], [type: 'bomb', x: 0, y: 1]]
	index: 0,          // 当前扫雷初中高级类别 0,1,2
	surplus: 0,        // 展示在页面上，剩余炸弹数量
	timer: null,
	isOver: false      // 游戏是否结束
});

let { row, column, bombNum, squares, index, surplus, timer, isOver } = toRefs(info);

// 实现炸弹不重复的随机位置
const randomNum = () => {
	const square = Array( row.value * column.value).fill('');

	square.forEach((item, i) => square[i] = i);
	square.sort(() => .5 - Math.random());

	return square.slice(0, bombNum.value);
}

const getAround = (item) => {
	const x = item.x;
	const y = item.y;
	const around = []; // 当前炸弹周围的格子

	/*  重点: 找到当前炸弹周围，数字的格子
		x-1,y-1  x,y-1 x+1,y-1
		x-1,y    x,y   x+1,y
		x-1,y+1  x,y+1 x+1,y+1 
	*/

	for (let i = x - 1; i <= x + 1; i++) {
		for (let j = y - 1; j <= y + 1; j++) {
			if (
				i < 0 ||
				j < 0 ||
				i > row.value - 1 ||
				j > column.value - 1 ||
				(i == x && j == y) ||
				squares.value[j][i].type == 'bomb'
			) {
				continue;
			}
			
			around.push([j, i]);
		}
		
	}

	return around;
}

const updateNum = () => {
	for (let i = 0; i < row.value; i++) {
		for (let j = 0; j < column.value; j++) {
			if (squares.value[i][j].type == 'number') {
				continue;
			}
			
			const aroundList = getAround(squares.value[i][j]);

			aroundList.forEach((item, index) => {
				squares.value[item[0]][item[1]].value += 1;
			})
		}
	}
}

/* 
行与列
0,0  0,1  0,2
1,0  1,1  1,2

x与y坐标
0,0  1,0  2,0
0,1  1,1  2,1
*/
const render = () => {
	let n = 0;
	const rn = randomNum();

	for (let i = 0; i < row.value; i++) {
		squares.value[i] = [];
		
		for (let j = 0; j < column.value; j++) {
			if (rn.includes(n)) {
				squares.value[i][j] = { type: 'bomb', x: j, y: i };
			} else {
				squares.value[i][j] = { type: 'number', x: j, y: i, value: 0 };
			}

			n++;
		}
	}

	updateNum();
}

const play = (item) => {
	if (isOver.value || item.isFlag) return;

	item.isShow = true;
	if (item.type == 'number') {
		if (item.value < 1) {
			getAllZero(item);
		}
	} else {
		isOver.value = true;
		gameOver(item);
		console.log('炸弹');
	}
}

const rightHandler = (item) => {
	if (isOver.value || !surplus.value) return;
	
	if(!item.isShow) {
		if (item.isFlag) {
			item.isFlag = false;
			surplus.value+=1;
		} else {
			item.isFlag = true;
			surplus.value-=1;
		}
	}

	if (surplus.value <= 0) {
		gameOver();
	}
}

const getAllZero = (item) => {
	const around = getAround(item);

	around.forEach(a => {
		const cur = squares.value[a[0]][a[1]]
		
		if (cur.value == 0) {
			if (!cur.isShow) {
				cur.isShow = true;
				getAllZero(cur);
			}
		} else {
			cur.isShow = true;
		}
	})
}

const gameOver = (item) => {
/* 	1、显示所有的雷
	2、取消点击事件
	3、高亮当前点击的雷 */

	for (let i = 0; i < row.value; i++) {
		for (let j = 0; j < column.value; j++) {
			if (squares.value[i][j].type == 'bomb') {
				squares.value[i][j].isShow = true;
				
				if (squares.value[i][j].isFlag) {
					squares.value[i][j].isBomb = true;
				}
			}

			if (item && item.x == squares.value[i][j].x && item.y == squares.value[i][j].y) {
				item.bomb = true;
			}
		}
	}
}

const classNames = computed(() => {
	return (item) => {
		return {
			// 点击格子后，高亮显示当前格子
			active: item.isShow,
			// 当格子是数字且已是高亮状态，给数字添加不同的颜色，如果该格子是旗帜状态，则不添加
			['type-' + item.value]: item.type == 'number' && item.isShow && !item.isFlag,
			// 右击添加旗帜状态
			flag: item.isFlag,
			// 爆雷后，高亮显示当前点击的雷
			bomb: item.bomb,
			// 爆雷后，高亮正确标注的旗帜
			right: item.isBomb
		}
	}
})

const init = (type) => {
	row.value = arr[type][0];
	column.value = arr[type][1];
	bombNum.value = arr[type][2];
	squares.value = [];
	index.value = type;
	surplus.value = bombNum.value;
	isOver.value = false;
	render();
}

onMounted(() => {
	init(index.value);
});
</script>
<style>
.header { padding: 35px 0; text-align: center; }
.header span { display: inline-block; width: 70px; padding: 6px 0; border: 1px solid #ddd; margin: 0 5px; font-size: 12px; color: #666; background: #fafafa; text-align: center; cursor: pointer;}
.header span.active { background: #222; border-block-color: #222; color: #fff; }
.total { margin-bottom: 20px; text-align: center; }
.row { display: flex; justify-content: center; }
.item { position: relative; display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; font-size: 12px; font-weight: bold; border: 1px solid #ddd; margin: 1px; background: #f0f0f0; box-sizing: border-box; cursor: pointer; }
.item:hover { background: #f0f0f0; }
.item.active { border-color: #eee; background: #fff;}
.item.bomb { background: #ff8383;}
.item.flag { background: #f0f0f0;}
.item.flag.right { background: #b4ffa4;}
.item.flag:after { content: '🚩';}
.type-0 { color:#fff; }
.type-1 { color:#0004ff; }
.type-2 { color:#5cbe2e; }
.type-3 { color:#db524d; }
.type-4 { color:#93208f; }
.type-5 { color:#7e0707; }
.type-6 { color:#ff3fff; }
.type-7 { color:#00cc88; }
.type-8 { color:#f00; }
</style>
