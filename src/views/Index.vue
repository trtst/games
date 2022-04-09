<template>
    <main-layout>
        <div class="home">
            Hello, world!
        </div>
    </main-layout>
</template>
<script setup>
import MainLayout from '../App.vue'
</script>
<style lang="less" scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 100px;
    font-weight: 300;
}
</style>