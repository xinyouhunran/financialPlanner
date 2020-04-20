<template>
	<view class="container">
		<view class="theme-fund">
			<view class="theme-item" @tap="$nav({url:'/pages/theme-fund/theme-detail'})">
				<view class="t">
					农业
				</view>
				<view class="m red">
					12.65%
				</view>
				<view class="b">
					近一周
				</view>
			</view>
			<view class="theme-item">
				<view class="t">
					农业
				</view>
				<view class="m red">
					12.65%
				</view>
				<view class="b">
					近一周
				</view>
			</view>
			<view class="theme-item">
				<view class="t">
					农业
				</view>
				<view class="m red">
					12.65%
				</view>
				<view class="b">
					近一周
				</view>
			</view>
			<view class="theme-item">
				<view class="t">
					农业
				</view>
				<view class="m green">
					12.65%
				</view>
				<view class="b">
					近一周
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
.theme-fund{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.theme-item{
		width: 248rpx;
		height: 204rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-right: 1px solid #F4F4F4;
		border-bottom: 1px solid #F4F4F4;
		.t{
			font-size: 16px;
			font-weight: bold;
		}
		.m{
			font-size: 18px;
			margin-top: 44rpx;
		}
		.b{
			font-size: 13px;
			color: #828282;
			margin-top: 26rpx;
		}
	}
}
.red{
	color: #E70012;
}
.green{
	color: green;
}
</style>
