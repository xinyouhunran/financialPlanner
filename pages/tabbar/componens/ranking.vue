<template>
	<view class="l-module-table">
		<view class="l-module-thead">
			<view class="l-module-tr">
				<view class="l-td-first">
					基金名称
				</view>
				<view class="l-module-td">
					最新净值
				</view>
				<view class="l-module-td">
					收益率
				</view>
			</view>
		</view>
		<view class="l-module-tbody">
			<view class="l-module-tr" v-for="(s,i) in dataList" :key="i" @tap="$nav({url: '/pages/product-details/product-details?id='+ s.securityId})">
				<view class="l-td-first">
					<text class="l-icon-paihang" :class="[i < icon ? 'l-icon-paihang-' + (i + 1) : '']"></text>
					<text class="l-txt-ov">{{ s.secShortName }}</text>
				</view>
				<view class="l-module-td">
					{{ s.nav }}
				</view>
				<view class="l-module-td">
					{{ s.returnRate }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataList:{
				type: Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				icon:5
			}
		}
	}
</script>

<style scoped>
	.l-module-table{
		width: 100%;
		background-color: #FFFFFF;
	}
	
	.l-module-thead{
		font-size: 30rpx;
	}
	
	.l-module-thead .l-module-tr{
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.l-module-tbody{
		font-size: 30rpx;
	}
	
	.l-module-tbody .l-module-tr{
		height: 118rpx;
		line-height: 118rpx;
	}
	
	.l-module-tbody .l-module-td{
		color: #E70012;
	}
	
	.l-module-tr{
		padding: 0 30rpx;
		display: flex;
	}
	
	.l-txt-ov{
		display: inline-block;
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-module-td{
		flex: 1;
		text-align: center;
	}
	
	.l-td-first{
		width: calc(100% / 2);
		display: flex;
		align-items: center;
	}
	
	.l-icon-paihang{
		display: inline-block;
		width: 38rpx;
		height: 35rpx;
		margin-right: 15rpx;
		background-color: #FFFFFF;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.l-icon-paihang-1{
		background-image: url('~@/static/index/1@2x.png');
	}
	.l-icon-paihang-2{
		background-image: url('~@/static/index/2@2x.png');
	}
	.l-icon-paihang-3{
		background-image: url('~@/static/index/3@2x.png');
	}
	.l-icon-paihang-4{
		background-image: url('~@/static/index/4@2x.png');
	}
	.l-icon-paihang-5{
		background-image: url('~@/static/index/5@2x.png');
	}
</style>
