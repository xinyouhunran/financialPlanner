<template>
	<view class="setting">
		<!-- <view class="l-status"></view> -->
		<view class="l-view set-t">
			<view class="l-flex l-flex-jc_sb box l-bb" @tap="$nav({url:'/pages/mine/update-pwd'})">
				<view class="">
					修改密码
				</view>
				<image src="../../static/right@2x.png" mode=""></image>
			</view>
			<view class="l-flex l-flex-jc_sb box l-bb" @tap="$nav({url:'/pages/mine/update-tradpwd'})">
				<view class="">
					修改交易密码
				</view>
				<image src="../../static/right@2x.png" mode=""></image>
			</view>
			<view class="l-flex l-flex-jc_sb box" @tap="$nav({url:'/pages/mine/aboutus'})">
				<view class="">
					关于融总管
				</view>
				<image src="../../static/right@2x.png" mode=""></image>
			</view>
		</view>
		<view class="l-view set-b l-flex l-flex-jc_c l-flex-ai_c" @tap="loginOut">
			退出登录
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
			loginOut() {
				let url = 'auth/logout';
				let params = {};
				// this.$get(url, params)
				// .then(res => {
			
				// }).catch(res => {
			
				// })
			
				this.$store.dispatch('logout').then(data=>{
					this.$nav({url:'/pages/mine/mine'},"switchTab")
				})
			},
		}
	}
</script>

<style scoped lang="scss">
.setting{
	height: calc(100vh - var(--status-bar-height) - var(--window-top));
	background-color: #EDEDED;
	font-size: 16px;
}
.set-t{
	background-color: #FFFFFF;
	.box{
		padding: 35rpx 0;
	}
	image{
		width: 16rpx;
		height: 26rpx;
	}
}
.set-b{
	color: #D3A35C;
	height: 101rpx;
	background-color: #FFFFFF;
	margin-top: 20rpx;
}
</style>
