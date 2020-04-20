<template>
	<view class="l-module-item" @tap="$nav({url: '/pages/tabbar/road/road-details?id='+ dataInfo.id})">
		<view class="l-module-left">
			<image class="l-img-banner" :src="dataInfo.coverImageUrl || ''" mode="aspectFit"></image>
		</view>
		<view class="l-module-right">
			<view class="l-mr-name">{{ dataInfo.title || '' }}</view>
			<view class="l-mr-works l-flex l-flex-jc_sb">
				<text>{{ dataInfo.presenter || '' }}</text>
				<text>{{ dataInfo.date || '1天前' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataInfo: {
				type: Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.l-module-item{
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 34rpx;
	}
	
	.l-module-left{
		margin-right: 20rpx;
	}
	
	.l-img-banner{
		width: 260rpx;
		height: 150rpx;
		background-color: #D6D6D6;
	}
	
	.l-module-right{
		flex: 1;
		padding: 4rpx 0;
		height: 142rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.l-mr-name{
		line-height: 1.5;
		word-break: break-all;
		font-size: 30rpx;
	}
	
	.l-mr-works{
		font-size: 24rpx;
		color: #828282;
	}
</style>
