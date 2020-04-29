<template>
	<view class="container">
		<view class="select-attachment l-view">
			<view class="item l-flex l-flex-ai_c l-flex-jc_sb l-bb">
				<view class="l-flex l l-flex-ai_c">
					<view class="">
						<image src="../../static/tool/PDF@2x.png" mode=""></image>
					</view>
					<view class="name">
						<view class="">
							龙鳞资本介绍.pdf
						</view>
						<view class="">
							2020-04-06  12:16:35
						</view>
					</view>
				</view>
				<view class="r" @tap="changeRadio(1)">
					<image src="../../static/tool/gxx@2x.png" mode="" v-if="radiovalue!=1"></image>
					<image src="../../static/tool/gx@2x.png" mode="" v-else></image>
				</view>
			</view>
		</view>
		<view class="mybtn confirm">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radiovalue:2
			}
		},
		methods: {
			changeRadio(index){
				this.radiovalue = index;
			}
		}
	}
</script>

<style scoped lang="scss">
.select-attachment{
	.item{
		padding: 30rpx 0;
		.l{
			image{
				width: 64rpx;
				height: 66rpx;
			}
			.name{
				font-size: 15px;
				margin-left: 30rpx;
				view:nth-of-type(2){
					font-size: 12px;
					color: #828282;
					margin-top: 16rpx;
				}
			}
		}
		.r{
			image{
				width: 44rpx;
				height: 44rpx;
			}
		}
	}
}
.confirm{
	margin: 400rpx auto 0;
}
</style>
