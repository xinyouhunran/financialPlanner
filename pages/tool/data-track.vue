<template>
	<view class="container">
		<view class="l-view data-track">
			<view class="l-flex l-flex-jc_sa l-flex-ai_c">
				<view class="item">
					<view class="colore70012">
						8
					</view>
					<view class="">
						本周查看
					</view>
				</view>
				<view class="item">
					<view class="colore70012">
						32
					</view>
					<view class="">
						今日查看
					</view>
				</view>
				<view class="item">
					<view class="colore70012 ss">
						<view class="">
							8
						</view>
						<image src="../../static/tool/ss@2x.png" mode=""></image>
					</view>
					<view class="">
						较上周
					</view>
				</view>
			</view>
		</view>
		<view class="backf4">
			
		</view>
		<view class="l-view">
			<view class="sharelog l-bb">
				分享记录
			</view>
			<view class="share-item l-bb" @tap="$nav({url:'/pages/tool/data-track-detail'})">
				<view class="l-flex l-flex-jc_sb t">
					<view class="">
						财经早报
					</view>
					<view class="">
						12小时前
					</view>
				</view>
				<view class="m">
					4.7财经早报《证券行业点评报告:首批并表监管点券商公布未来风险管理将成为券商核心竞争力》
				</view>
				<view class="b">
					<view class="l-flex">
						<view class="">
							<image src="../../static/tool/r@2x.png" mode=""></image>
						</view>
						<view class="">
							8
						</view>
					</view>
					<view class="l-flex">
						<view class="">
							<image src="../../static/tool/k@2x.png" mode=""></image>
						</view>
						<view class="">
							8
						</view>
					</view>
					<view class="l-flex">
						<view class="">
							<image src="../../static/tool/zf@2x.png" mode=""></image>
						</view>
						<view class="">
							8
						</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.data-track{
	margin-top: 20rpx;
	padding-bottom: 28rpx;
	.item{
		display: flex;
		flex-direction: column;
		align-items: center;
		view:nth-of-type(1){
			font-size: 18px;
		}
		view:nth-of-type(2){
			font-size: 13px;
			color: #828282;
			margin-top: 28rpx;
		}
		.ss{
			display: flex;
			align-items: center;
			image{
				width: 16rpx;
				height: 28rpx;
				margin-left: 16rpx;
			}
		}
	}
}
.backf4{
	height: 20rpx;
	background-color: #F4F4F4;
}
.sharelog{
	height: 47px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	font-weight: bold;
}
.share-item{
	color: #828282;
	padding-bottom: 26rpx;
	.t{
		margin-top: 28rpx;
		view:nth-of-type(1){
			font-size: 16px;
			color: #242424;
		}
	}
	.m{
		margin-top: 26rpx;
		font-size: 15px;
		line-height: 38rpx;
	}
	.b{
		margin-top: 24rpx;
		display: flex;
		justify-content: flex-end;
		font-size: 15px;
		image{
			width: 28rpx;
			height: 28rpx;
			margin-left: 48rpx;
			margin-right: 8rpx;
		}
		
	}
}
</style>
