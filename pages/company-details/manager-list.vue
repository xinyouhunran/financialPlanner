<template>
	<view class="l-module" @tap="$nav({ url: '/pages/people-details/people-details?id=' + dataInfo.personId })">
		<view class="l-module-left">
			<image class="l-module-l-avatar" src="../../static/ren@2x.png" mode="aspectFill"></image>
		</view>
		<view class="l-module-right">
			<view class="l-mr-view-1">
				<!-- <text class="l-text-1">核心人物</text> -->
				<text class="l-text-2">{{ dataInfo.realName || '--' }}</text>
				<text class="l-text-3">{{ dataInfo.position || '' }}</text>
			</view>
			<view class="l-mr-view-2 l-flex l-flex-jc_sb l-flex-ai_c">
				<view class="l-mrv-view">
					<text class="l-text-4">代表产品累计收益：</text>
					<text class="l-text-5">{{ dataInfo.repSecReturnAccum || '--' }}</text>
				</view>
				<!-- <view class="l-mrv-btn">
					<text class="l-af-circle"></text>直聊TA
				</view> -->
			</view>
			<view class="l-mr-view-3">
				从业{{ workYear || '1' }}年 | {{ fundCounts }}
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
		},
		computed:{
			workYear(){
				return parseFloat(this.dataInfo.workYear) || '1'
			},
			fundCounts(){
				return this.dataInfo.fundCounts == '认证可见' ? this.dataInfo.fundCounts : `管理${ this.dataInfo.fundCounts }只基金`;
			}
		}
	}
</script>

<style scoped>
	.l-module{
		display: flex;
		align-items: center;
		padding: 44rpx 0;
		font-size: 26rpx;
	}
	
	.l-module-left{
		width: 138rpx;
		height: 138rpx;
		margin-right: 29rpx;
	}
	
	.l-module-right{
		flex: 1;
	}
	
	.l-module-l-avatar{
		width: 138rpx;
		height: 138rpx;
	}
	
	.l-mr-view-2{
		width: 100%;
		height: 52rpx;
		padding: 12rpx 0 17rpx;
	}
	
	.l-mrv-view{
		flex: 1;
	}
	
	.l-mrv-btn{
		width:132rpx;
		height:52rpx;
		font-size: 26rpx;
		color: #836438;
		display: flex;
		align-items: center;
		justify-content: center;
		border:1rpx solid rgba(172,148,114,1);
		border-radius:26rpx;
		margin-left: 20rpx;
	}
	
	.l-af-circle{
		width: 10rpx;
		height: 10rpx;
		display: inline-block;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 4rpx;
		background-color: #836438;
	}
	
	.l-text-1{
		display: inline-block;
		width:116rpx;
		height:34rpx;
		line-height: 34rpx;
		text-align: center;
		color: #FFFFFF;
		background:rgba(172,148,114,1);
		border-radius:4rpx;
		margin-right: 11rpx;
	}
	
	.l-text-2{
		font-size: 34rpx;
		margin: 0 15rpx 0 0;
	}
	
	.l-text-3{
		display: inline-block;
		width: 188rpx;
		overflow: hidden;
		white-space: nowrap;
		word-break: break-all;
		text-overflow: ellipsis;
	}
	
	.l-text-5{
		color: #E70012;
	}
</style>
