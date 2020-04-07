<template>
	<view class="aboutus">
		<view class="l-flex l-flex-direction l-flex-ai_c">
			<image src="../../static/rzg@2x.png" mode="" class="logo"></image>
			<text class="name">融总管</text>
			<text class="version">版本号1.0.0</text>
		</view>
		<view class="l-view set-t">
			<view class="l-flex l-flex-jc_sb box l-bb" @tap="$nav({url:'/pages/mine/update-pwd'})">
				<view class="">
					公司介绍
				</view>
				<image src="../../static/right@2x.png" mode=""></image>
			</view>
			<view class="l-flex l-flex-jc_sb box l-bb" @tap="$nav({url:'/pages/mine/aboutus'})">
				<view class="">
					服务协议
				</view>
				<image src="../../static/right@2x.png" mode=""></image>
			</view>
			<view class="l-flex l-flex-jc_sb box" @tap="$nav({url:'/pages/mine/aboutus'})">
				<view class="">
					隐私条例
				</view>
				<image src="../../static/right@2x.png" mode=""></image>
			</view>
		</view>
		<view class="l-flex l-flex-jc_sb phone" @tap="$nav({url:'/pages/mine/aboutus'})">
			<view class="">
				服务热线
			</view>
			<view class="red">
				400-660-3928
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
.aboutus{
	height: calc(100vh - var(--status-bar-height) - var(--window-top));
	background-color: #F4F4F4;
	font-size: 16px;
	.logo{
		width: 120rpx;
		height: 120rpx;
		margin-top: 100rpx;
	}
	.name{
		margin-top: 28rpx;
	}
	.version{
		margin-top: 18rpx;
	}
}
.set-t{
	background-color: #FFFFFF;
	margin-top: 66rpx;
	.box{
		padding: 35rpx 0;
	}
	image{
		width: 16rpx;
		height: 26rpx;
	}
}
.phone{
		margin-top: 10px;
		background-color: #FFFFFF;
		padding: 35rpx 24rpx;
		.red{
			color: #E70012;
		}
	}
</style>
