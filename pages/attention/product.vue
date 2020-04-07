<template>
	<view class="l-module" @tap="$nav({ url: '/pages/product-details/product-details?id=' + dataInfo.securityId })">
		<view class="l-module-item l-txt-left">
			<view class="l-module-value l-product-name">
				{{ dataInfo.secShortName || '--' }}
			</view>
			<view class="l-module-label">
				更新时间<span>{{ dataInfo.endDateDay ? '(' + dataInfo.endDateDay + ')' : '' }}</span>
			</view>
		</view>
		<view class="l-module-item l-txt-center">
			<view class="l-module-value l-color-E70012">
				{{ dataInfo.accumNav || '--'}}
			</view>
			<view class="l-module-label">
				累计净值
			</view>
		</view>
		<view class="l-module-item l-txt-right">
			<view class="l-module-value l-color-E70012">
				{{ dataInfo.accumNav || '--' }}
			</view>
			<view class="l-module-label">
				净值变动
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
	.l-module{
		width: calc(100% - 88rpx);
		box-sizing: border-box;
		padding: 29rpx 0 ;
		margin: 0 44rpx;
		font-size: 14px;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #EDEDED;
		justify-content: space-between;
	}
	
	.l-product-name{
		width: 220rpx;
		color: #000000;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-module-value{
		font-size: 16px;
	}
	
	.l-module-label{
		margin-top: 20rpx;
		white-space: nowrap;
		color: #828282;
	}
	
	.l-color-E70012{
		color: #E70012;
	}
	
	.l-txt-left{
		text-align: left;
	}
	
	.l-txt-center{
		text-align: center;
	}
	
	.l-txt-right{
		text-align: right;
	}
</style>
