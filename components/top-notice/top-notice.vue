<template>
	<view>
		<view class="l-flex top-notice l-flex-ai_c l-flex-jc_sb">
			<text>{{textStr}}</text>
			<image src="../../static/redright.png" mode="aspectFill" v-if="isShow"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:['texts','show'],
		data() {
			return {
			};
		},
		computed:{
			textStr(){
				return this.texts;
			},
			isShow(){
				return this.show;
			}
		}
	}
</script>

<style scoped lang="scss">
.top-notice{
	padding: 22rpx 24rpx;
	color: #e70012;
	font-size: 13px;
	background-color: #FFF5F6;
	image{
		width: 16rpx;
		height: 25rpx;
	}
}
</style>
