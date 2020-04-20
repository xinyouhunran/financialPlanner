<template>
	<view class="l-tally">
		<view class="l-pk-item" >
			<view class="l-pki-left">
				<view class="l-pki-name">
					<view class="l-text-1">
						<text class="l-text-red" v-if="!1">免认购费</text>
						{{ dataInfo.secShortName || dataInfo.secFullName || '--' }}
					</view>
				</view>
			</view>
			<view class="l-pki-right">
				{{ dataInfo.accumNav || '--' }}
				<span class="l-text-3">
					累计收益
				</span>
			</view>
		</view>
		<view class="l-tally-btn" v-if="dataInfo.securityId" @tap="$nav({ url: '/pages/tally/tally?id='+ dataInfo.securityId })">
			<span>+</span>
			<span>新增</span>
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
	.l-tally{
		display: flex;
		width: 100%;
		height: 134rpx;
		align-items: center;
		border-bottom: 1rpx solid #EDEDED;
		background-color: #FFFFFF;
	}
	
	.l-pk-item {
		flex: 1;
		display: flex;
	}
	
	.l-pki-left{
		flex: 1;
		line-height: 1.4;
		display: flex;
	}
	
	.l-pki-name{
		font-size: 32rpx;
		width: 305rpx;
	}
	
	.l-text-1{
		width: calc(100% - 56rpx);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.l-pki-icon{
		line-height: 1.4;
	}
	
	.l-pki-right{
		color: #E70012;
		white-space: nowrap;
		text-align: right;
		width: 120rpx;
		line-height: 1.4;
	}
	
	.l-text-3 {
		display: block;
		font-size: 28rpx;
		color: #828282;
	}
	
	.l-text-red {
		display: inline-block;
		padding: 0 4rpx;
		vertical-align: middle;
		height: 30rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 30rpx;
		font-size: 20rpx;
		color: rgba(231, 0, 18, 1);
		border: 1px solid;
		border-radius: 4px;
		margin-right: 8rpx;
	}
	
	.l-icon-checked {
		vertical-align: middle;
		min-width: 36rpx;
		height: 36rpx;
		margin-right: 19rpx;
		background-image: url('~@/static/handle/xuanze@2x.png');
	}
	
	.l-icon-check {
		vertical-align: middle;
		min-width: 36rpx;
		height: 36rpx;
		margin-right: 19rpx;
		background-image: url('~@/static/xuan@2x.png');
	}
	
	.l-tally-btn{
		width:100rpx;
		height:50rpx;
		margin-left: 21rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #E70012;
		border-radius: 25rpx;
		border: 1rpx solid ;
	}
</style>
