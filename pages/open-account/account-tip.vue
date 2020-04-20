<template>
	<view class="account-tip">
		<view class="tip">
			<view class="item" :class="{'item-active':tip1}">
				1
			</view>
			<view class="line">
				
			</view>
			<view class="item" :class="{'item-active':tip2}">
				2
			</view>
			<view class="line">
				
			</view>
			<view class="item" :class="{'item-active':tip3}">
				3
			</view>
		</view>
		<view class="tip-name">
			<view :class="{'tip-name-active':tip1}">
				实名认证
			</view>
			<view :class="{'tip-name-active':tip2}">
				绑定银行卡
			</view>
			<view :class="{'tip-name-active':tip3}">
				交易密码
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tip1:{
				type:Boolean,
				default:true,
			},
			tip2:{
				type:Boolean,
				default:false,
			},
			tip3:{
				type:Boolean,
				default:false,
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.account-tip{
	background-color: #FFFFFF;
	height: 200rpx;
	overflow: hidden;
	.tip{
		width: 670rpx;
		margin: 22px auto 0;
		height: 80rpx;
		display: flex;
		align-items: center;
		.item{
			width: 80rpx;
			height: 80rpx;
			border-radius: 80rpx;
			border: 1px solid #afafaf;
			color: #afafaf;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.item-active{
			background-color: #8689CF;
			border: 1px solid #8689CF;
			color: #FFFFFF;
		}
		.line{
			height: 1px;
			background-color: #EDEDED;
			width: 210rpx;
		}
	}
	.tip-name{
		padding: 0 24rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #AFAFAF;
	}
	.tip-name-active{
		color: #242424;
	}
}
</style>
