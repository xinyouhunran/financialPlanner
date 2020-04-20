<template>
	<view class="l-module-table">
		<view class="l-module-thead">
			<view class="l-module-tr">
				<view class="l-td-first">
					时间
				</view>
				<view class="l-module-td">
					区间收益
				</view>
				<view class="l-module-td">
					同类平均
				</view>
				<view class="l-module-td">
					同类排行
				</view>
			</view>
		</view>
		<view class="l-module-tbody">
			<view class="l-module-tr" v-for="(s,i) in dataList" :key="i">
				<view class="l-td-first">
					<text class="l-txt-ov">{{ s.date }}</text>
				</view>
				<view class="l-module-td">
					{{ s.data }}
				</view>
				<view class="l-module-td">
					--
				</view>
				<view class="l-module-td">
					--
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['dataList']
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
		display: inline-block;
		width: 80%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-module-td{
		flex: 1;
		text-align: center;
	}
	
	.l-td-first{
		width: 180rpx;
	}
</style>
