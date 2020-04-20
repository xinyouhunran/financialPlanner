<template>
	<view class="l-module">
		<view class="l-module-head l-flex l-flex-ai_c">
			<text class="l-module-head-befor">代表作</text>
			<text class="l-module-head-content">中战宏观对冲2号</text>
			<text class="l-module-head-after">已清算</text>
		</view>
		<view class="l-module-foot l-flex">
			<view class="l-module-foot-left l-flex-1">
				<view class="l-module-foot_top">认证可见</view>
				<view class="l-module-foot_bottom">累计收益</view>
			</view>
			<view class="l-module-foot-center l-flex-1">
				<view class="l-module-foot_top">认证可见</view>
				<view class="l-module-foot_bottom">累计净值</view>
			</view>
			<view class="l-module-foot-right l-flex-1">
				<view class="l-module-foot_top">3年3个月</view>
				<view class="l-module-foot_bottom">运行时间</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style scoped lang="scss">
	.l-module{
		width: 100%;
		min-height: 204rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: #FFFFFF;
	}
	
	.l-module-head{
		padding: 31rpx 0 44rpx;
		
		&-befor,
		&-after{
			width:88rpx;
			height:34rpx;
			text-align: center;
			line-height: 34rpx;
			color: #FFFFFF;
			// padding: 2rpx;
			background:rgba(172,148,114,1);
			border-radius:4rpx;
			margin-right: 10rpx;
		}
		
		&-content {
			font-size: 32rpx;
		}
		
		&-after {
			background:#999999;
			margin-left: 10rpx;
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
		
		&-center &_top,
		&-left &_top{
			color: #E70012;
		}
		
		&_top{
			font-weight: bold;
			font-size: 36rpx;
		}
		
		&_bottom {
			padding-top: 22rpx;
			font-size: 26rpx;
			color: #828282;
		}
	}
</style>
