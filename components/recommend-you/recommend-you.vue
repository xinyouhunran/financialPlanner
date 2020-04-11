<template>
	<view class="recommend-you">
		<view class="recommend-you-t">
			为您推荐
		</view>
		<view class="recommend-you-b l-flex l-flex-jc_sb">
			<view class="recommend-you-item l-flex l-flex-direction l-flex-ai_c" v-for="(v,i) in 3" :key="i">
				<view class="">
					余额宝攒钱金
				</view>
				<view class="colore70012 lilu">
					6.88%
				</view>
				<view class="color82 nh">
					近七日年化
				</view>	
				<view class="recommend-you-btn">
					1000元起购
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.recommend-you{
	background-color: #FFFFFF;
	padding: 22rpx 24rpx 34rpx;
	&-t{
		font-size: 15px;
		font-weight: bold;
		text-align: center;
	}
	&-b{
		margin-top: 26rpx;
	}
	&-item{
		padding: 28rpx 24rpx 32rpx;
		background-color: #F9F9F9;
		border: 1px solid #fefefe;
		border-radius: 20rpx;
		.lilu{
			margin-top: 16px;
		}
		.nh{
			margin-top: 16rpx;
		}
	}
	&-btn{
		width: 170rpx;
		height: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		border-radius: 20rpx;
		background: linear-gradient(to bottom,#FA6974,#E70012);
		margin-top: 30rpx;
	}
}
</style>
