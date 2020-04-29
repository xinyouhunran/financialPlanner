<template>
	<view class="container">
		<view class="l-status"></view>
		<view class="l-toptitle l-view">
			<view class="" @tap="$back()">
				<image src="../../static/backwhite@2x.png" mode=""></image>
			</view>
		</view>
		<view class="tool-top">
			<view class="mine l-flex l-flex-ai_c">
				<view class="l">
					<image src="../../static/finance/tx@3x.png" mode=""></image>
				</view>
				<view class="r">
					<view class="tag">
						未认证
					</view>
					<view class="">
						13686118706
					</view>
				</view>
			</view>
			<view class="l-flex l-flex-jc_sa mes">
				<view class="item">
					<view class="">
						3665
					</view>
					<view class="">
						粉丝
					</view>
				</view>
				<view class="item">
					<view class="">
						3665
					</view>
					<view class="">
						客户
					</view>
				</view>
				<view class="item">
					<view class="">
						3665
					</view>
					<view class="">
						今日访客
					</view>
				</view>
			</view>
		</view>
		
		<view class="tool-bottom l-view">
			<view class="manager l-flex l-flex-ai_c">
				<view class="left-boder">
					
				</view>
				<view class="">
					展业获客
				</view>
			</view>
			<view class="l-flex l-flex-wrap">
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/mp@2x.png" mode=""></image>
					</view>
					<view class="">
						我的名片
					</view>
				</view>
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/hb@2x.png" mode=""></image>
					</view>
					<view class="">
						展业海报
					</view>
				</view>
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/rm@2x.png" mode=""></image>
					</view>
					<view class="">
						人脉
					</view>
				</view>
			</view>
			
			<view class="manager l-flex l-flex-ai_c">
				<view class="left-boder">
					
				</view>
				<view class="">
					工作管理
				</view>
			</view>
			<view class="l-flex l-flex-wrap">
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/kh@2x.png" mode="" @tap="$nav({url:'/pages/tool/customer-manager'})"></image>
					</view>
					<view class="">
						客户管理
					</view>
				</view>
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/gz@2x.png" mode="" @tap="$nav({url:'/pages/tool/data-track'})"></image>
					</view>
					<view class="">
						数据跟踪
					</view>
				</view>
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/gl@2x.png" mode="" @tap="$nav({url:'/pages/tool/product-manage'})"></image>
					</view>
					<view class="">
						产品管理
					</view>
				</view>
			</view>
			
			<view class="manager l-flex l-flex-ai_c">
				<view class="left-boder">
					
				</view>
				<view class="">
					学习工具
				</view>
			</view>
			<view class="l-flex l-flex-wrap">
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/ks@2x.png" mode=""></image>
					</view>
					<view class="">
						从业考试
					</view>
				</view>
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/zb@2x.png" mode=""></image>
					</view>
					<view class="">
						培训直播
					</view>
				</view>
				<view class="tool-item">
					<view class="">
						<image src="../../static/tool/tvm@2x.png" mode=""></image>
					</view>
					<view class="">
						TVM
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
		onLoad() {
			uni.report('opentool');
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background:url(../../static/tool/toolback.png)#FFFFFF no-repeat;
	background-size: 100% 312rpx;
	min-height: 100vh;
}
.tool-top{
	background-color: #FFFFFF; 
	width: 700rpx;
	height: 300rpx;
	margin: 0 auto;
	border-radius: 10rpx;
	box-shadow: 6rpx 6rpx 20rpx #CCCCCC;
	overflow: hidden;
	.mine{
		margin: 40rpx 40rpx 30rpx;
		image{
			width: 120rpx;
			height: 120rpx;
			margin-right: 40rpx;
		}
		.r{
			font-size: 15px;
			.tag{
				width: 110rpx;
				height: 42rpx;
				background: linear-gradient(to right,#FFBE00,#FE9900);
				color: #FFFFFF;
				font-size: 12px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 30rpx;
			}
		}
	}
	.mes{
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			view:nth-of-type(1){
				font-size: 18px;
				font-weight: bold;
			}
			view:nth-of-type(2){
				color: #828282;
				font-size: 12px;
				margin-top: 20rpx;
			}
		}
	}
}
.manager{
	height: 80rpx;
	margin: 30rpx 0;
	font-size: 16px;
	.left-boder{
		width: 8rpx;
		height: 40rpx;
		border-radius: 4rpx;
		background: linear-gradient(#FEBC00,#FE9B00);
		margin-right: 20rpx;
	}
}
.tool-item{
	width: 230rpx;
	height: 166rpx;
	border-top: 1px solid #EBEBEB;
	border-bottom: 1px solid #EBEBEB;
	border-right: 1px solid #EBEBEB;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image{
		width: 52rpx;
		height: 52rpx;
		
	}
	view:nth-of-type(2){
		font-size: 12px;
		margin-top: 26rpx;
	}
}
.tool-item:nth-of-type(3n){
	border-right: none;
}
</style>
