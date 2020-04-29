<template>
	<view class="l-module-item" @tap="$nav({url: '/pages/tabbar/road/road-details?id=' + dataInfo.id})">
		<view class="l-module-top">
			<image class="l-img-banner" lazy-load :src="dataInfo.coverH5ImageUrl || ''" mode="aspectFit"></image>
			<view class="l-view-posi">
				<text class="l-icon l-icon-stop"></text>
				<text class="l-mt-date">{{ dataInfo.duration || '' }}</text>
			</view>
		</view>
		<view class="l-module-bottom">
			<view class="l-mr-name">{{ dataInfo.title || '' }}</view>
			<view class="l-mr-works l-flex l-flex-jc_sb">
				<text>{{ dataInfo.presenter || '' }} · <text>{{ dataInfo.showDate || '1997/01/01 00:00:00' }}</text></text>
				<text><text class="l-icon l-icon-look"></text> {{ dataInfo.viewUsers || 0 }}</text>
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
		margin-bottom: 34rpx;
		background-color: #FFFFFF;
	}
	
	.l-module-top{
		position: relative;
		width: 100%;
		background-color: #CCCCCC;
	}
	
	.l-view-posi,
	.l-view-posi-top{
		position: absolute;
		box-sizing: border-box;
		display: flex;
		color: #FFFFFF;
		border-radius: 18rpx;
		font-size: 20rpx;
		align-items: center;
		z-index: 1;
		padding: 0 10rpx;
		justify-content: center;
	}
	
	.l-view-posi-top{
		right: 30rpx;
		top: 10rpx;
		min-width:178rpx;
		height:40rpx;
		background-color:#F97429;
	}
	
	.l-view-posi{
		right: 30rpx;
		bottom: 10rpx;
		min-width:160rpx;
		height:40rpx;
		background-color: rgba(116,116,116,0.4);
	}
	
	.l-img-banner{
		width: 100%;
		height: 436rpx;
	}
	
	.l-module-bottom{
		padding: 19rpx 29rpx 32rpx;
	}
	
	.l-mr-name{
		font-size: 34rpx;
		line-height: 1.2;
		margin-bottom: 29rpx;
	}
	
	.l-mr-works{
		font-size: 26rpx;
		color: #828282;
	}
	
	.l-icon-look{
		width: 28rpx;
		height: 20rpx;
		margin-right: 4rpx;
		background-image: url('~@/static/road/liulan@2x.png');
	}
	
	.l-icon-stop{
		width: 32rpx;
		height: 32rpx;
		margin-right: 16rpx;
		background-image: url('~@/static/road/bofang@2x.png');
	}
	
</style>
