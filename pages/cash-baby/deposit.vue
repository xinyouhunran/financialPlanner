<template>
	<view class="container">
		<view class="deposit">
			<view class="cash-box">
				<view class="cash-item l-flex l-bb">
					<view class="l">
						<image src="../../static/finance/lc@2x.png" mode=""></image>
					</view>
					<view class="r">
						<view class="">
							万小宝
						</view>
						<view class="">
							随存随取
						</view>
					</view>
				</view>
			</view>
			
			<view class="buy-cash l-view">
				<view class="much">
					买入金额
				</view>
				<view class="l-flex cash-input">
					<view class="cashtag">
						￥
					</view>
					<view class="l-flex myinput l-flex-1">
						<input type="number" v-model="cash" placeholder="建议200元起" placeholder-class="placeclass" class="input-font" 
						@confirm="confirm"/>
					</view>
				</view>
			</view>
			
			<view class="choose l-view l-flex l-flex-jc_sb l-flex-ai_c">
				<view class="">
					支付方式
				</view>
				<view class="l-flex">
					<view class="color82">
						请选择
					</view>
					<view class="">
						<image src="../../static/right@2x.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="confir l-flex l-flex-jc_c l-flex-ai_c">
				确定
			</view>
			
			<view class="color82 l-flex l-flex-jc_c">
				预计04月08日开始产生收益，04月09日收益到账，
			</view>
			<view class="color82 l-flex l-flex-jc_c mes">
				资金转入现金宝，随时购买基金。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cash:'',
			}
		},
		methods: {
			confirm(){
				uni.hideKeyboard();
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.cash-box{
	padding: 0 24rpx;
	background-color: #FFFFFF;
	.cash-item{
		padding: 24rpx 0;
		image{
			width: 80rpx;
			height: 80rpx;
		}
		.r{
			margin-left: 15px;
			view:nth-of-type(1){
				margin-top: 4rpx;
				font-size: 16px;
			}
			view:nth-of-type(2){
				margin-top: 14rpx;
				font-size: 13px;
				color: #828282;
			}
		}
	}
}
.buy-cash{
	margin-top: 20rpx;
	background-color: #FFFFFF;
}
.much{
	font-size: 16px;
	padding-top: 13px;
}
.cash-input{
	margin-top: 78rpx;
	padding-bottom: 70rpx;
	.cashtag{
		font-size: 30px;
		font-weight: bold;
	}
	.myinput{
		align-items: flex-end;
		margin-left: 34rpx;
		.input-font{
			font-size: 20px;
		}
	}
	.placeclass{
		font-size: 16px;
		color: #afafaf;
	}
}
.choose{
	margin-top: 20rpx;
	background-color: #FFFFFF;
	height: 98rpx;
	image{
		width: 9px;
		height: 14px;
		margin-left: 20rpx;
	}
}
.confir{
	background-color: #D3A35C;
	width: 680rpx;
	margin: 100rpx auto;
	height: 47px;
	color: #fff;
	border-radius: 46rpx; 
}
.mes{
	margin-top: 6rpx;
}
</style>
