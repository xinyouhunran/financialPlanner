<template>
	<view class="l-navbar">
		<view class="l-navbar-place"></view>
		<view class="l-navbar-view">
			<view class="l-navbar-nav" @tap="$back()">
				<text class="l-icon l-icon-back"></text>
			</view>
			<view class="l-navbar-title">
				{{ title}}
			</view>
			<view class="l-navbar-handle" @tap="onHandle">
				{{ handle }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title: {
				type: String,
				default: ''
			},
			handle: {
				type: String,
				default: ''
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			onHandle(){
				this.$emit('onHandle')
			}
		}
	}
</script>

<style scoped>
	.l-navbar{
		position: relative;
		width:750rpx;
		/* #ifdef H5 */
		height:94rpx;
		/* #endif */
	}
	
	.l-navbar-place{
		width:750rpx;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		height:94rpx;
	}
	
	.l-navbar-view{
		height: 94rpx;
		padding: 0 34rpx;
		position: fixed;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		top: 0;
		left: 0;
		width: calc(100% - 68rpx);
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:rgba(237,237,237,1);
		z-index: 11;
	}
	
	.l-navbar-nav{
		width: 50rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.l-icon-back{
		width: 20rpx;
		height: 35rpx;
		background-image: url('~@/static/back@2x.png');
	}
	
	.l-navbar-title{
		font-size: 36rpx;
	}
	
	.l-navbar-handle{
		font-size: 30rpx;
	}
</style>
