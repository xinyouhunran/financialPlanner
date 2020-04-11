<template>
	<view class="result">
		<view class="result-t">
			<view class="l-view title-t">
				<view class="title">买入结果</view>
				<view class="opeator">完成</view>
			</view>
			
			<view class="result-m l-view">
				<view class="l-bb l-flex l-flex-direction l-flex-ai_c">
					<image src="../../static/result/cg@2x.png" mode=""></image>
					<view class="wenzi font18">
						申请成功
					</view>
					<view class="cash fontweight">
						10000元
					</view>
					<view class="mes color82">
						购买申请已提交，等待银行处理
					</view>
				</view>
			</view>
			
			<view class="result-b l-flex">
				<view class="l l-flex l-flex-direction l-flex-ai_c">
					<view class="dd">
						<image src="../../static/result/dd@2x.png" mode=""></image>
					</view>
					<view class="line">
						<image src="../../static/result/22@2x.png" mode=""></image>
					</view>
					<view class="point">
						<image src="../../static/result/55@2x.png" mode=""></image>
					</view>
				</view>
				<view class="r">
					<view class="top">
						<view class="topic">
							处理中
						</view>
						<view class="topicmes color82">
							预计04-08星期三15:00前确认份额
						</view>
					</view>
					<view class="topnext color82">
						预计04-09星期四可到"资产总览"查看收益
					</view>
				</view>
			</view>
		</view>
		
		<recommend-you class="wntj"></recommend-you>
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
.wntj{
	margin-top: 20rpx;
}
.result{
	background-color: #efefef;
	height: 100vh;
	&-t{
		padding-top: calc(34rpx + var(--status-bar-height));
		background-color: #FFFFFF;
		font-size: 17px;
		.title-t{
			overflow: hidden;
			display: flex;
			justify-content: center;
		}
		.title{
			
		}
		.opeator{
			color: #3481F2;
			position: absolute;
			right: 24rpx;
		}
	}
	&-m{
		margin-top: 70rpx;
		image{
			width: 150rpx;
			height: 150rpx;
		}
		.wenzi{
			font-weight: bold;
			margin-top: 19rpx;
		}
		.cash{
			font-size: 40px;
			margin-top: 42rpx;
		}
		.mes{
			font-size: 13px;
			margin-top: 42rpx;
			padding-bottom: 58rpx;
		}
	}
	&-b{
		padding: 44rpx 44rpx 34rpx;
		.dd{
			width: 76rpx;
			height: 76rpx;
		}
		.line{
			width: 2rpx;
			height: 102rpx;
		}
		.point{
			width: 26rpx;
			height: 26rpx;
		}
		.r{
			margin-left: 44rpx;
			.top{
				margin-top: 6rpx;
				.topic{
					font-size: 16px;
					font-weight: bold;
				}
				.topicmes{
					margin-top: 6rpx;
					font-size: 14px;
				}
			}
			.topnext{
				margin-top: 108rpx;
				font-size: 14px;
			}
		}
	}
}
</style>
