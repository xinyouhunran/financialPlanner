<template>
	<view class="container">
		<view class="l-status"></view>
		<view class="theme-detail">
			<top-title title="医疗行业"></top-title>
			<top-notice texts="泛指业主为医疗、医疗期间、卫生保健的上市公司。" :show="false"></top-notice>
			
			<view class="t l-flex l-flex-ai_c l-flex-jc_sb l-view">
				<view class="item">
					<view class="red">
						12.65%
					</view>
					<view class="">
						近一周
					</view>
				</view>
				<view class="item">
					<view class="green">
						-12.65%
					</view>
					<view class="">
						近一周
					</view>
				</view>
				<view class="item">
					<view class="">
						12.65%
					</view>
					<view class="">
						近一周
					</view>
				</view>
				<view class="item">
					<view class="">
						12.65%
					</view>
					<view class="">
						近一周
					</view>
				</view>
			</view>
			
			<view class="b l-view">
				<view class="fund-item l-flex l-flex-ai_c l-flex-jc_sb">
					<view class="l">
						<view class="">
							工银医疗健康股票A
						</view>
						<view class="">
							中高风险
						</view>
					</view>
					<view class="item">
						<view class="red">
							0.98%
						</view>
						<view class="">
							近一年
						</view>
					</view>
					<view class="ljmr">
						立即买入
					</view>
				</view>
				<view class="fund-item l-flex l-flex-ai_c l-flex-jc_sb">
					<view class="l">
						<view class="">
							工银医疗健康股票A
						</view>
						<view class="">
							中高风险
						</view>
					</view>
					<view class="item">
						<view class="green">
							-0.98%
						</view>
						<view class="">
							近一年
						</view>
					</view>
					<view class="ljmr">
						立即买入
					</view>
				</view>
			</view>
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
.theme-detail{
	.t{
		height: 128rpx;
		background-color: #FFFFFF;
	}
	.item{
		display: flex;
		flex-direction: column;
		align-items: center;
		view:nth-of-type(1){
			font-size: 15px;
		}
		view:nth-of-type(2){
			font-size: 12px;
			color: #828282;
			margin-top: 24rpx;
		}
	}
	.b{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		.fund-item{
			padding: 30rpx 0;
			.l{
				view:nth-of-type(1){
					font-size: 15px;
				}
				view:nth-of-type(2){
					width: 114rpx;
					height: 34rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 14rpx;
					color: #FFFFFF;
					background-color: #D6D5D5;
					font-size: 12px;
					border-radius: 4rpx; 
				}
			}
		}
	}
}
.ljmr{
	width: 130rpx;
	height: 44rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	border-radius: 20rpx;
	background: linear-gradient(to bottom,#FA6974,#E70012);
	font-size: 12px;
}
</style>
