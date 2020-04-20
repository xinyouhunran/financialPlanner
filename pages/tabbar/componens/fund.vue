<template>
	<view class="l-module" @tap="$nav({url: '/pages/product-details/product-details?id=' + dataInfo.securityId})">
		<view class="l-module-title">
			<span class="l-module-title-name">{{ dataInfo.secFullName }}</span>
			<span class="l-module-title-sub" v-if="!1">{{ dataInfo.investStrategy }}</span>
		</view>
		<view class="l-module-content l-flex">
			<view class="l-module-content-item l-module-content-item-1">
				<view class="l-mci-top l-color-E70012">
					{{ dataInfo.returnRateYtd || '--' }}
				</view>
				<view class="l-mci-bottom">
					今年收益
				</view>
			</view>
			<view class="l-module-content-item l-module-content-item-2 l-flex-1">
				<view class="l-mci-top l-color-E70012">
					<span class="l-mcit-item">{{ dataInfo.investStrategy || '--' }}</span>
				</view>
				<view class="l-mci-bottom l-txt-hidden">
					{{ dataInfo.labelReason  || '--'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataInfo:{
				type: Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.l-module{
		width: 100%;
		padding: 29rpx 0 28rpx;
	}
	
	.l-module-title{
		display: flex;
		align-items: center;
		margin-bottom: 39rpx;
	}
	
	.l-module-title-name{
		display: block;
		max-width: calc(100% - 85rpx);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.l-module-title-sub{
		display: block;
		color: #E70012;
		font-size: 20rpx;
		white-space: nowrap;
		width:90rpx;
		height:34rpx;
		text-align: center;
		line-height: 34rpx;
		border: 1rpx solid;
		margin-left: 20rpx;
	}
	
	.l-module-content-item-1{
		width: 218rpx;
	}
	
	.l-module-content-item-2{
		width: calc(100% - 218rpx);
	}
	
	.l-mci-bottom{
		width: 100%;
	}
	
	.l-color-E70012{
		color: #E70012;
	}
	
	.l-mci-top{
		font-weight: bold;
		font-size: 30rpx;
		margin-bottom: 40rpx;
	}
	
	.l-mcit-item{
		font-weight: 400;
		font-size: 24rpx;
		padding: 8rpx 18rpx;
		border-radius: 23rpx;
		border: 1rpx solid;
		margin-right: 10rpx;
		white-space: nowrap;
	}
</style>
