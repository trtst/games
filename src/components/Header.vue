<template>
	<div class="side-main">
		<div class="logo">
			TRTST
		</div>
		<ul class="nav">
			<li v-for="item in list" :class="{ 'active': item.path == curNav}"><v-link :href="item.path">{{item.name}}</v-link></li>
		</ul>
	</div>
</template>
<script setup>
import VLink from './VLink.vue';
import list from '../router/nav'

const curNav = window.location.pathname;

console.log(list);
</script>
<style lang="less" scoped>
.side-main {
	padding: 35px;
	text-align: center;
}
.logo {
	width: 160px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    color: #fff;
    background: #222;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 2px;
}
.nav {
	padding-top: 150px;

	li {
		display: block;
		padding: 10px 16px;
		color: #222;
		border-radius: 8px;
		text-align: center;
		font-weight: 300;
		cursor: pointer;

		&.active {
			font-weight: 400;

			a {
				display: inline-block;
				line-height: 30px;
				padding: 0 20px;
				color: #fff;
				background: #333;
			}
		}
	}
}
</style>