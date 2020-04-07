<template>
	<view class="l-module" @tap="$nav({ url: '/pages/company-details/company-details?id=' + dataInfo.partyId })">
		<view class="l-module-left">
			<image class="l-img-company" src="../../static/gongsi@2x.png" mode="aspectFill"></image>
		</view>
		<view class="l-module-right">
			<view class="l-product-name">
				{{ dataInfo.partyShortName || '--' }}
			</view>
			<view class="l-module-content">
				<view class="l-module-item l-txt-left">
					<view class="l-module-value l-color-E70012">
						{{ dataInfo.returnAccum || '--'}}
					</view>
					<view class="l-module-label">
						累计收益
					</view>
				</view>
				<view class="l-module-item l-txt-right">
					<view class="l-module-value l-color-E70012">
						{{ dataInfo.returnA || '--' }}
					</view>
					<view class="l-module-label">
						今年收益
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataInfo: {
				type: Object,
				default () {
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.l-module {
		width: calc(100% - 60rpx);
		box-sizing: border-box;
		padding: 30rpx 0 21rpx;
		margin: 0 30rpx;
		font-size: 14px;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #EDEDED;
	}
	
	.l-module-left{
		width: 116rpx;
		height: 116rpx;
		margin-right: 49rpx;
	}

	.l-img-company{
		width: 116rpx;
		height: 116rpx;
		border-radius: 20rpx;
	}

	.l-module-right{
		width: calc(100% - 165rpx);
	}
	
	.l-product-name{
		font-size: 16px;
		color: #000000;
		font-weight: bold;
		padding-bottom: 29rpx;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-module-content{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-module-value {
		font-size: 16px;
	}

	.l-module-label {
		margin-top: 13rpx;
		white-space: nowrap;
		color: #828282;
	}

	.l-color-E70012 {
		color: #E70012;
	}

	.l-txt-left {
		text-align: left;
	}

	.l-txt-right {
		text-align: right;
	}
</style>
