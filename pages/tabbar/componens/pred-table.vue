<template>
	<view class="l-module-table">
		<view class="l-module-thead">
			<view class="l-module-tr">
				<view class="l-td-first">
					序号
				</view>
				<view class="l-module-td l-td-text">
					基金简称
				</view>
				<view class="l-module-td">
					单位净值
				</view>
				<view class="l-module-td">
					收益率
				</view>
			</view>
		</view>
		<view class="l-module-tbody">
			<view class="l-module-tr" v-for="(s,i) in dataList" :key="i" @tap="$nav({url: '/pages/product-details/product-details?id='+ s.securityId})">
				<view class="l-td-first">
					{{ s.no }}
				</view>
				<view class="l-module-td l-td-text">
					<text class="l-txt-ov">{{ s.secShortName || '--' }}</text>
				</view>
				<view class="l-module-td">
					{{ s.nav || '--' }}
				</view>
				<view class="l-module-td">
					{{ s.returnRate || '--' }}
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
		}
	}
</script>

<style scoped>
	.l-module-table{
		width: 100%;
		background-color: #FFFFFF;
	}
	
	.l-module-thead{
		color: #795728;
		font-size: 30rpx;
	}
	
	.l-module-thead .l-module-tr{
		height: 80rpx;
		line-height: 80rpx;
		background-color: #F4F4F4;
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
		background-color: #FFFFFF;
	}
	
	.l-module-tr:nth-of-type(2n){
		background-color: #F4F4F4;
	}
	
	.l-txt-ov{
		color: #000000;
		display: inline-block;
		width: 95%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-module-td{
		flex: 1;
		text-align: center;
	}
	
	.l-td-first{
		flex: 1;
	}
	
	.l-td-text{
		text-align: left;
		min-width: 278rpx;
	}
</style>
