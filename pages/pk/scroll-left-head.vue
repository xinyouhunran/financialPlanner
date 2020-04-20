<template>
	<view class="l-content-1">
		<view class="l-posi-view">
			<view class="l-posi-label">
				产品名称
			</view>
			<view class="l-posi-value" >
				<scroll-view scroll-x="true" class="l-scroll-module"  >
					<view class="l-view-item" 
					:style="{ 'borderBottom': !dataBgColor[i] ? '1rpx solid #EDEDED' : '3px solid '+ dataBgColor[i] }"
					v-for="(s, i) in dataList" :key="i">
						<view class="l-view-item-txt">
							{{ s.secShortName || '--' }}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="l-posi-place"></view>
	</view>
</template>

<script>
	export default {
		props:{
			dataBgColor: {
				type: Array,
				default(){
					return []
				}
			},
			dataList: {
				type: [ Array, Object],
				default(){
					return []
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.l-content-1{
		width: 100%;
		height: 150rpx;
	}
	
	.l-content-1 .l-posi-view{
		position: fixed;
		left: 0;
		top: 44px;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		width: 100%;
		height: 150rpx;
		display: flex;
	}
	
	.l-content-1 .l-posi-place{
		width: 100%;
		height: 150rpx;
	}
	
	.l-content-1 .l-posi-label{
		min-width: 136rpx;
		height: 100%;
		box-sizing: border-box;
		z-index: 1;
		display: flex;
		align-items: center;
		color: #828282;
		font-size: 26rpx;
		border-right: 1rpx solid #EDEDED;
		border-bottom: 1rpx solid #EDEDED;
		justify-content: center;
		background-color: #F6F6F6;
	}
	
	.l-content-1 .l-posi-value{
		width: calc(100% - 136rpx);
		height: 100%;
	}
	
	.l-content-1 .l-scroll-module{
		width: 100%;
		height: 100%;
		overflow: hidden;
		white-space: nowrap;
		background-color: #FFFFFF;
	}
	
	.l-content-1 .l-view-item{
		display: inline-block;
		white-space: normal;
		box-sizing: border-box;
		padding: 0 12rpx;
		width: 200rpx;
		font-size: 24rpx;
		height: 150rpx;
		vertical-align: top;
		color: #89622F;
		border-right: 1rpx solid #EDEDED;
		border-bottom: 1rpx solid #EDEDED;
		background-color: #FFFFFF;
	}
	
	.l-content-1 .l-view-item-txt{
		width: 100%;
		height: 100%;
		display: flex;
		box-sizing: border-box;
		line-height: 1.3;
		vertical-align: middle;
		align-items: center;
		justify-content: center;
	}
</style>
