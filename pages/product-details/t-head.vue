<template>
	<view class="l-module" >
		<view class="l-module-head l-flex l-flex-ai_c">
			<view class="l-module-head-user l-flex l-flex-ai_c  l-flex-1">
				<view class="l-module-head-user-info  l-flex-1 l-flex l-flex-direction l-flex-jc_sb">
					<view>
						<text class="l-mhui-name">{{ dataInfo.secShortName || '' }}</text>
						<!-- <text class="l-mhui-small">从业10年</text> -->
					</view>
					<view class="l-flex l-flex-ai_c l-flex-jc_sb">
						<view class="l-flex l-flex-ai_c">
							<!-- <text class="l-mhui-small-label">近一年融智评级：暂无</text> -->
							<text class="l-mhui-small-label">状态：{{ dataInfo.status || '--' }}</text>
							<text class="l-mhui-a" v-if="0">
								<text class="l-icon-star"></text>
								<text class="l-icon-star-active"></text>
							</text>
						</view>
						<view>
							<text class="l-mhui-small-label">{{ dataInfo.produceTypeStr || '' }}·{{ dataInfo.investStrategy || '' }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="l-module-foot l-flex">
			<view class="l-module-foot-left l-flex-1">
				<view class="l-module-foot_top">{{ dataInfo.returnRateEst || '--' }}</view>
				<view class="l-module-foot_bottom">累计收益</view>
			</view>
			<view class="l-module-foot-center l-flex-1">
				<view class="l-module-foot_top">
					<text style="font-size: 18px;">{{ dataInfo.returnRate1y || '--' }}</text>
					<text style="font-size: 12px;" v-if="dataInfo.returnRate1y && dataInfo.endDateDay && dataInfo.returnRate1y !== '认证可见'">({{ dataInfo.endDateDay }})</text>
				</view>
				<view class="l-module-foot_bottom">近一年收益</view>
			</view>
			<view class="l-module-foot-right l-flex-1">
				<view class="l-module-foot_top">{{ dataInfo.sharpeRatio || '--' }}</view>
				<view class="l-module-foot_bottom">夏普比率</view>
			</view>
		</view>
		
		<view class="l-module-foot-sub">
			<view v-if="dataInfo.partyShortName">
				<text>投资顾问：</text>
				<text 
				@tap="$nav({ url: '/pages/company-details/company-details?id='+ dataInfo.partyId })" 
				class="l-color-836438">{{ dataInfo.partyShortName }}&gt;</text>
			</view>
			<view v-if="dataInfo.userName">
				<text>经理：</text>
				<text 
				@tap="$nav({ url: '/pages/people-details/people-details?id=' + dataInfo.personId })" 
				class="l-color-836438">{{ dataInfo.userName }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataInfo: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		created() {
		}
	}
</script>

<style scoped lang="scss">
	.l-module{
		padding: 51rpx 30rpx 38rpx;
		margin-bottom: 24rpx;
		background-color: #FFFFFF;
	}
	
	.l-module-head{
		padding-bottom: 71rpx;
		
		&-user{
			&-avatar{
				width: 116rpx;
				height: 116rpx;
				margin-right: 22rpx;
				border-radius: 50%;
			}
			
			.l-img-avatar{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			
			&-info{
				height: 90rpx;
				font-size: 30rpx;
			}
			
			.l-mhui-name{
				font-weight: bold;
			}
			
			.l-mhui-small{
				color: #828282;
				font-size: 24rpx;
				margin-left: 18rpx;
			}
			
			.l-mhui-small-label{
				color: #828282;
				font-size: 28rpx;
			}
			
			.l-mhui-a{
				margin-left: 12rpx;
				font-size: 28rpx;
				color: #795728;
			}
		}
		
		&-handle{
			&-btn {
				width: 130rpx;
				height: 50rpx;
				color: #FFFFFF;
				border-radius: 25rpx;
				line-height: 50rpx;
				background-color: #AC9472;
			}
		}
	}

	.l-module-foot{
		&-left{
			text-align: left;
		}
		
		&-center{
			text-align: center;
		}
		
		&-right{
			text-align: right;
		}
		
		&-left &_top{
			color: #E70012;
		}
		
		&_top{
			font-weight: bold;
			white-space: nowrap;
			font-size: 36rpx;
		}
		
		&_bottom {
			padding-top: 15rpx;
			font-size: 24rpx;
			color: #828282;
		}
	}
	
	.l-display-none{
		display: none;
	}
	
	.l-module-foot-sub{
		margin-top: 54rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		.l-color-836438{
			color: #836438;
		}
	}
	
	
	
	.l-icon-star,
	.l-icon-star-active{
		display: inline-block;
		width: 32rpx;
		height: 30rpx;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.l-icon-star{
		background-image: url('~@/static/product/huise@2x.png');
	}
	
	.l-icon-star-active{
		background-image: url('~@/static/product/huangse@2x.png');
	}
	
</style>
