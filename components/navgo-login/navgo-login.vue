<template>
	<view class="l-module" :class="{ 'l-display-none': isLogin }" :style=" keys + ':' + values + 'px;' ">
		<view>登录即可查看基金最新净值</view>
		<button class="l-btn l-module-btn" @tap="onShowLogin">立即登录</button>
	</view>
</template>

<script>
	export default {
		props:['keys','value'],
		computed:{
			values(){
				return uni.upx2px(this.value);
			},
			isLogin(){
				return this.$store.getters.hasLogin
			}
		},
		methods:{
			onShowLogin(){
				// this.$emit('onShowLogin')
				this.$nav({ url: '/pages/register/register' })
			}
		}
	}
</script>

<style scoped>
	.l-module{
		box-sizing: border-box;
		position: fixed;
		left: 50%;
		z-index: 777;
		color: #FFFFFF;
		width:639rpx;
		height:88rpx;
		display: flex;
		color: #FFFFFF;
		padding: 0 24rpx;
		align-items: center;
		justify-content: space-between;
		background:rgba(102,102,102,0.9);
		border-radius:8px;
		transform: translateX(-50%);
	}
	
	.l-module-btn{
		display: flex;
		font-size: 24rpx;
		font-weight: bold;
		align-items: center;
		justify-content: center;
		width:158rpx;
		height:56rpx;
		background:linear-gradient(90deg,rgba(237,193,118,1) 0%,rgba(248,213,157,1) 100%);
		border-radius:28rpx;
	}
	
	.l-display-none{
		display: none;
	}
</style>
