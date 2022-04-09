<template>
    <main-layout>
        <div class="music">
            <div class="title">Gitee</div>
            <div class="box">
                <div class="item">
                    <a href="https://gitee.com/trtst/vue_pc_music" target="_blank">Vue2.x</a>
                </div>
                <div class="item">
                    <a href="https://gitee.com/trtst/vue3-music" target="_blank">Vue3.x</a>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script setup>
import MainLayout from '/src/App.vue';
</script>
<style lang="less" scoped>
.music {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    .title {
        font-size: 80px;
    }

    .box {
        display: flex;
        font-size: 20px;

        a {
            margin: 0 10px;

            &:hover {
                color: #ff641e;
            }
        }
    }
}
</style>