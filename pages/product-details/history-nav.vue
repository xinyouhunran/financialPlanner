<template>
	<view class="l-module-table">
		<view class="l-module-thead">
			<view class="l-module-tr">
				<view class="l-td-first">
					净值日期
				</view>
				<view class="l-module-td">
					单位净值
				</view>
				<view class="l-module-td l-flex l-flex-ai_c">
					<view class="l-mt-view">
						<span class="l-mt-span">累计净值</span><br />
						<span class="l-mt-span l-mt-span-1">(分红{{ isNav === 'accumNav' ? '不' : '再' }}投资)</span>
					</view>
					<span @tap="isNav = isNav === 'accumNav' ? 'adjNav' : 'accumNav'" class="l-icon l-icon-transfrom"></span>
				</view>
				<view class="l-module-td">
					同类排行
				</view>
			</view>
		</view>
		<view class="l-module-tbody">
			<view class="l-module-tr" v-for="(s,i) in dataList" :key="i">
				<view class="l-td-first">
					{{ s.endDate }}
				</view>
				<view class="l-module-td">
					{{ s.nav || '--'}}
				</view>
				<view class="l-module-td">
					{{ s[isNav] || '--'}}
				</view>
				<view class="l-module-td">
					{{ s.returnRate || '--'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['dataList'],
		data(){
			return {
				isNav: 'adjNav'
			}
		}
	}
</script>

<style scoped>
	.l-mt-view{
		flex: 1;
		height: 100%;
		line-height: 1.2;
	}
	
	.l-mt-span-1{
		font-size: 24rpx;
		color: #828282;
		white-space: nowrap;
	}
	
	.l-icon-transfrom{
		width: 20rpx;
		height: 20rpx;
		margin-left: 4rpx;
		background-image: url('~@/static/transfrom.png');
	}
	
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
		width: 100%;
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
