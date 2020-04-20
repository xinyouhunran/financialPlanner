<template>
	<view class="l-container">
		<text space="nbsp" decode >
			
			公司地址：深圳市福田区金田路卓越世纪1号楼18层
			联系方式：0755 8255 2163
			
		</text>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		onLoad(e) {
			if(e.type){
				uni.setNavigationBarTitle({
					title: '公司介绍'
				})
			}
		}
	}
</script>

<style scoped>
	.l-container{
		width: 100%;
		font-size: 30rpx;
		line-height: 1.4;
		padding: 0 30rpx 30rpx;
		box-sizing: border-box;
	}
</style>
