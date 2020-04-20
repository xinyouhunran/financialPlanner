<template>
	<view>
		<!-- <view class="l-view sale-t l-flex l-flex-jc_c">
			<view class="sale-search l-flex">
				<span class="l-icon l-icon-search"></span>
				<view class="af">
					请输入产品
				</view>
			</view>
		</view> -->
		<view class="l-status"></view>
		<view class="public-private l-flex l-flex-ai_c l-flex-jc_sb l-view">
			<view class="l" @tap="$back(1)">
				<image src="../../static/back@2x.png" mode=""></image>
			</view>
			<view class="m l-flex">
				<view :class="{'m-active':productTag==0}" @tap="changeProduct(0)">
					公募
				</view>
				<view :class="{'m-active':productTag==1}" @tap="changeProduct(1)">
					私募
				</view>
			</view>
			<view class="r">
				<image src="../../static/ss@2x.png" mode=""></image>
			</view>
		</view>
		
		<!-- <view class="screen l-flex l-flex-jc_sa l-flex-ai_c">
			<view class="screen-item">
				<view class="l-flex l-flex-ai_c">
					<view class="" @tap="tab=1">
						智能推荐
					</view>
					<image src="../../static/down@2x.png" mode=""></image>
				</view>
				<view class="recom" :class="{'recom-active':tab==1}">
					
				</view>
			</view>
			<view class="screen-item">
				<view class="l-flex l-flex-ai_c">
					<view class="" @tap="tab=2">
						筛选
					</view>
					<image src="../../static/down@2x.png" mode=""></image>
				</view>
				<view class="recom1" :class="{'recom1-active':tab==2}">
					
				</view>
			</view>
		</view> -->
		
		<private-sale></private-sale>

	</view>
</template>

<script>
	import privateSale from "./private-sale";
	export default {
		components:{
			privateSale
		},
		data() {
			return {
				productTag:1,
				
				tab:1,
				
			}
		},
		methods: {
			changeProduct(tag){
				this.productTag = tag;
			},
		}
	}
</script>

<style scoped lang="scss">
.sale-t{
	top: 0;
	padding: 16rpx 0;
	padding-top: calc(16rpx + var(--status-bar-height));
	background-color: #EDEDED;
	color: #afafaf;
	font-size: 12px;
	position: fixed;
	width: 100%;
}
.sale-search{
	width: 700rpx;
	background-color: #FFFFFF;
	line-height: 29px;
	height: 29px;
	border-radius: 30rpx;
}
.l-icon-search{
		width: 30rpx;
		height: 30rpx;
		margin: 14rpx 20rpx;
		background-image: url('~@/static/sousuo@2x.png');
}
.screen{
	background-color: #FFFFFF;
	position: fixed;
	top: calc(90rpx + var(--status-bar-height));
	width: 100%;
	font-size: 15px;
	border-bottom: 1px solid #ABABAB;
	image{
		width: 24rpx;
		height: 13rpx;
		margin-left: 15rpx;
	}
	.screen-item{
		margin-top: 36rpx;
		margin-bottom: 4px;
	}
	.recom,.recom1{
		width: 76rpx;
		height: 9rpx;
		margin-top: 21rpx;
		margin-left: 21rpx;
	}
	.recom-active,.recom1-active{
		background-image: url(../../static/saledown.png);
		background-size: cover;
	}
	.recom1{
		margin-left: -6rpx;
	}
}

.public-private{
	z-index: 1;
	height: 88rpx;
	position: fixed;
	width: calc(100% - 48rpx);
	padding-top: var(--status-bar-height);
	top: 0;
	height: 88rpx;
	background-color: #FFFFFF;
	.l{
		width: 10px;
		height: 17px;
	}
	.m{
		font-size: 17px;
		color: #828282;
		view:nth-of-type(1){
			margin-right: 48rpx;
		}
	}
	.m-active{
		color: #242424;
	}
	.r{
		width: 34rpx;
		height: 34rpx;
	}
}
</style>
