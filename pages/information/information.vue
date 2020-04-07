<template>
	<view>
		<view class="l-view">
			<view class="information_list">
				<view class="title">
					<view>华夏银行违规放贷于波：男子莫名负债两千多万难...</view>
				</view>
				<view class="l-flex l-flex-jc_sb">
					<view class="infor_b">
						<template v-if="before">
							<text>一小时前</text>
						</template>
						<template v-else>
							<text>03-20&nbsp;19:30</text>
						</template>
						<text class="mlmr">|</text>
						<text>大咖专访</text>
					</view>
					<view class="seeall">
						查看全部
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				before:false
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.information_list{
	padding: 30rpx 0;
	border-bottom: 1px solid #F4F4F4;
	.title{
		width: 686rpx;
		font-size: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre;
		margin-bottom: 35rpx;
	}
	.infor_b{
		color: #828282;
		font-size: 12px;
		.mlmr{
			margin: 0 10rpx;
		}
	}
	.seeall{
		color: #D3A35C;
		font-size: 12px;
	}
}
</style>
