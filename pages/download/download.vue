<template>
	<view class="l-container">
		<view class="l-head">
			<view class="l-head-view">
				<image class="l-icon-app" src="../../static/app@2x.png" mode="aspectFill"></image>
				<view class="l-head-txt">
					iFund
				</view>
				<view class="">
					版本号{{ $config.$versions }}
				</view>
			</view>
		</view>
		<view class="l-handle">
			<button class="l-btn l-btn-download" @tap="downLoadFile">
				点击下载app
			</button>
		</view>
	</view>
</template>

<script>
	// android ios
	export default {
		data(){
			return {
			}
		},
		onLoad() {
			
		},
		methods:{
			downLoadFile() {
				const link = document.createElement('a');
				link.download = 'iFundapp'; //下载
				link.href = this.$config.$appDownload;
				link.click();//进行点击时下载
			}
		}
	}
</script>

<style scoped>
	.l-container{
		width: 100%;
	}
	.l-head{
		width: 100%;
		width: 100%;
		height: 402rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #494949;
	}
	
	.l-head-view{
		text-align: center;
	}
	
	.l-icon-app{
		width: 120rpx;
		height: 120rpx;
	}
	
	.l-head-txt{
		margin: 29rpx 0 19rpx;
		font-size: 42rpx;
	}
	
	.l-handle{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.l-btn-download{
		width: 60%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #E70012;
		font-size: 32rpx;
		border: 1rpx solid;
	}
</style>
