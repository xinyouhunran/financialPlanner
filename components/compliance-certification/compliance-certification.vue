<template>
	<view class="" @touchmove.stop.prevent>
		<view class="l-popup-container">
		</view>
		<view class="l-popup">
			<view class="l-popup-title">
				理财师合规认证
			</view>
			<view class="l-popup-message">
				根据相关法律法规要求，向用户推介相关产品需要认证实名信息并且提供相关资质及能力证明。在开始使用前，请您先做理财师认证。
			</view>
			<view class="l-popup-button">
				去认证
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.l-popup-container{
	width: 100vw;
	height: 100vh;
	background-color: #0F0F0F;
	opacity: 0.4;
	position: absolute;
	z-index: 900;
	top: 0;
	overflow-y: hidden;
}
.l-popup{
	position: fixed;
	top: 458rpx;
	left:50%;
	margin-left: -254rpx;
	z-index: 901;
	width: 506rpx;
	background-color: #FFFFFF;
	.l-popup-title{
		margin-top: 40rpx;
		font-size: 28rpx;
		color: #101010;
		margin: 40rpx auto 0;
		font-weight: 600;
		text-align: center;
	}
	.l-popup-message{
		width: 204px;
		margin: 42rpx auto 0;
		font-size: 24rpx;
		color: #101010;
	}
	.l-popup-button{
		width: 100%;
		height: 86rpx;
		background-color: #497CE8;
		color: #FFFFFF;
		text-align: center;
		line-height: 86rpx;
		margin-top: 52rpx;
	}
}
</style>
