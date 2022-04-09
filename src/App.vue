<template>
	<div class="layout">
		<div class="sidebar">
			<Header></Header>
		</div>
		<div class="main">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import VLink from './components/VLink.vue'
import Header from './components/Header.vue'
</script>
<style lang="less" scoped>
.layout {
	display: flex;
	width: 100%;
	height: 100%;

	.sidebar {
		width: 300px;
		background: #fff;
    	box-shadow: 0 20px 27px #0000000d;
	}

	.main {
		flex: 1;
	}
}
</style>
