<template>
	<view class="l-module-item" @tap="$nav({ url: '/pages/tabbar/windzxsh/windxsh-details?id='+ dataInfo.id + '&type='+ dataInfo.type })">
		<view class="l-module-left" v-if="isImg">
			<image class="l-img-banner" :src="dataInfo.picUrl || ''" mode="aspectFill"></image>
		</view>
		<view class="l-module-right">
			<view class="l-mr-name" v-html="dataInfo.title">{{ dataInfo.title || '--' }}</view>
			<view class="l-mr-works l-flex l-flex-jc_sb">
				<text>{{ dataInfo.source  || '--' }}</text>
				<text>{{ dataInfo.publishTime || '--' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataInfo: {
				type: Object,
				default(){
					return {}
				}
			},
			isImg: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.l-module-item{
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15rpx 0;
		border-bottom:1rpx solid #EDEDED ;
	}
	
	.l-module-left{
		margin-right: 20rpx;
	}
	
	.l-img-banner{
		width: 200rpx;
		height: 160rpx;
		background-color: #828282;
	}
	
	.l-module-right{
		flex: 1;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.l-mr-name{
		line-height: 1.5;
		font-size: 30rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.l-mr-works{
		width: 100%;
		font-size: 24rpx;
		color: #828282;
	}
</style>
