<template>
	<view class="container">
		<view class="cash-baby">
			<view class="l-status">	
			</view>
			<view class="title l-flex l-view l-flex-jc_sb">
				<view class="" @tap="$back(1)">
					<image src="../../static/backwhite@2x.png" mode=""></image>
				</view>
				<view class="">
					现金宝
				</view>
				<view class="">
					
				</view>
			</view>
			<view class="describe">
				现金宝是万小宝旗下退出的一款投资货币基金的活期理财工具
			</view>
			<view class="describe-b l-flex l-flex-jc_sa">
				<view class="l-flex l-flex-direction l-flex-ai_c cash-font">
					<view class="">
						2.60%
					</view>
					<view class="">
						最高7日年化收益
					</view>
					<view class="">
						(04-02)
					</view>
				</view>
				<view class="l-flex l-flex-direction l-flex-ai_c cash-font">
					<view class="">
						0.6892
					</view>
					<view class="">
						万份收益(元)
					</view>
					<view class="">
						(02-27) 
					</view>
				</view>
			</view>
		</view>
		
		<view class="cash-chart">
			<canvas-area :height="174" :width="356"></canvas-area>
		</view>
		
		<view class="cash-box">
			<view class="cash-item l-flex l-bb">
				<view class="l">
					<image src="../../static/finance/lc@2x.png" mode=""></image>
				</view>
				<view class="r">
					<view class="">
						随存随取
					</view>
					<view class="">
						灵活理财，取现最快3秒到账
					</view>
				</view>
			</view>
			<view class="cash-item l-flex l-bb">
				<view class="l">
					<image src="../../static/finance/q@2x.png" mode=""></image>
				</view>
				<view class="r">
					<view class="">
						天天盈利
					</view>
					<view class="">
						安心理财，天天收利息
					</view>
				</view>
			</view>
			<view class="cash-item l-flex">
				<view class="l">
					<image src="../../static/finance/jj@2x.png" mode=""></image>
				</view>
				<view class="r">
					<view class="">
						一键互转
					</view>
					<view class="">
						随时发现高收益基金，灵活购买
					</view>
				</view>
			</view>
		</view>
		
		<view class="deposit l-flex l-flex-jc_c l-flex-ai_c" @tap="$nav({url:'/pages/cash-baby/deposit'})">
			立即存入
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
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.cash-baby{
	width: 750rpx;
	height: calc(514rpx + var(--status-bar-height));
	background: url(~@/static/hqlc.png) no-repeat;
	background-size: 750rpx calc(514rpx + var(--status-bar-height));
	overflow: hidden;
	.title{
		margin-top: 34rpx;
		font-size: 17px;
		color: #FFFFFF;
		image{
			width: 20rpx;
			height: 34rpx;
		}
	}
	.describe{
		color: #FFFFFF;
		font-size: 16px;
		text-align: center;
		line-height: 40rpx;
		width: 476rpx;
		margin: 68rpx auto 0;
	}
	.describe-b{
		margin-top: 70rpx;
		color: #FFFFFF;
	}
	.cash-font view:nth-of-type(1){
		font-size: 30px;
	}
	.cash-font view:nth-of-type(2){
		font-size: 15px;
		margin-top: 20rpx;
	}
	.cash-font view:nth-of-type(3){
		font-size: 12px;
		margin-top: 16rpx;
	}
}
.cash-chart{
	background-color: #FFFFFF;
	padding-top: 16px;
	padding-bottom: 10px;
	margin: 20rpx 0;
	padding-left: 8px;
	padding-right: 10px;
}
.cash-box{
	padding: 0 24rpx;
	background-color: #FFFFFF;
	.cash-item{
		padding: 24rpx 0;
		image{
			width: 80rpx;
			height: 80rpx;
		}
		.r{
			margin-left: 15px;
			view:nth-of-type(1){
				margin-top: 4rpx;
				font-size: 16px;
			}
			view:nth-of-type(2){
				margin-top: 14rpx;
				font-size: 13px;
				color: #828282;
			}
		}
	}
}
.deposit{
	background-color: #D3A35C;
	width: 680rpx;
	margin: 30rpx auto 0;
	height: 47px;
	color: #fff;
	border-radius: 46rpx; 
}
</style>
