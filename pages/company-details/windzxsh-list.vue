<template>
	<view class="l-module-item">
		<view class="l-module-right">
			<view class="l-mr-name">百亿私募明年投资策略募明年投资策略曝光，</view>
			<view class="l-mr-works l-flex l-flex-jc_sb">
				<text>大管家 李琴</text>
				<text>2天前</text>
			</view>
		</view>
		<view class="l-module-left">
			<image class="l-img-banner" src="../../static/tu1@2x.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	.l-module-item{
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.l-module-left{
		margin-left: 20rpx;
	}
	
	.l-img-banner{
		width: 200rpx;
		height: 160rpx;
	}
	
	.l-module-right{
		padding: 4rpx 0;
		height: 152rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.l-mr-name{
		line-height: 1.5;
		word-break: break-all;
		font-size: 32rpx;
	}
	
	.l-mr-works{
		font-size: 24rpx;
		color: #828282;
	}
</style>
