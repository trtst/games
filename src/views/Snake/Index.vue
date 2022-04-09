<template>
    <main-layout>
        <div class="snake-main">
            <div id="stage">
                <div id="snake"></div>
                <div id="food">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div id="over">GAME OVER</div>
            </div>
            <div id="score-panel">
                <div>
                    Score: <span id="score">0</span>
                </div>
                <div>
                    <span id="btn">开始游戏</span>
                </div>
                <div>
                    Level: <span id="level">1</span>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script setup>
import MainLayout from '/src/App.vue';
import GameControl from './js/gameControl.js'
import { onMounted } from 'vue'

onMounted(() => {
    const gameControl = new GameControl()
})


console.log(`
    /^\\/^\\
    _|__|  O|
\\/     /~     \\_/ \\
\\____|__________/  \\
   \\_______      \\
          \\     \\                \\
            |     |\                 \\
            /     /\                   \\\\
           /     /    \                   \\\\
         /      /      \                   \\ \\
        /     /         \                   \\  \\
      /     /             _----_            \\   \\
     /     /           _-~      ~-_         |   |
    (      (        _-~    _--_    ~-_     _/   |
     \\      ~-____-~    _-~    ~-_    ~-_-~    /
       ~-_           _-~          ~-_       _-~   
          ~--______-~                ~-___-~
`
);

</script>
<style lang="less" scoped>
.snake-main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    width: 360px;
    height: 420px;
    background-color: #fff;
    margin: 100px auto;
    border: 10px solid #000;
    border-radius: 20px;
}

#stage {
    position: relative;
    width: 304px;
    height: 304px;
    border: 2px solid #000;

    &.active > div {
        display: none;
    }

    &.active #over {
        display: block;
    }
}

#score-panel {
    display: flex;
    width: 300px;
    justify-content: space-between;

    #btn {
        cursor: pointer;

        &.active {
            cursor: not-allowed;
            color: #777;
        }
    }
}

#snake {
    
    :deep(div) {
        position: absolute;
        display: inline-block;
        width: 10px;
        height: 10px;
        border: 1px solid #fff;
        background-color: #000;
    }
}

#food {
    position: absolute;
    left: 100px;
    top: 100px;
    display: flex;
    width: 10px;
    height: 10px;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: space-between;
    animation: twinkle 1.2s linear 1.2s infinite alternate;

    span {
        display: block;
        width: 4px;
        height: 4px;
        background-color: #000;
    }
}

#over {
    display: none;
    font-size: 40px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-top: 120px;
    text-shadow: 2px 2px #999;
}

@keyframes twinkle {
    0% {
        opacity: 0.9;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 0.2;
    }
}
</style>