<template>
	<view class="l-product-item l-flex l-flex-ai_c" >
		<text class="l-text l-txt-hidden">{{ dataInfo.secShortName || '--' }}</text>
	</view>
</template>

<script>
	export default {
		props:{
			dataInfo:{
				type: Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			ontap(){
				this.$emit('ontap',this.dataInfo, this.index, this.type)
			}
		}
	}
</script>

<style scoped>
	.l-product-item{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
	}
	
	.l-text{
		width: calc(100% - 80rpx);
	}
	
	.l-icon-checked{
		width: 36rpx;
		height: 36rpx;
		margin-right: 19rpx;
		background-image: url('~@/static/handle/xuanze@2x.png');
	}
	
	.l-icon-check{
		width: 36rpx;
		height: 36rpx;
		margin-right: 19rpx;
		background-image: url('~@/static/xuan@2x.png');
	}
</style>
