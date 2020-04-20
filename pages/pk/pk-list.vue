<template>
	<view class="l-product-item l-flex l-flex-ai_c" @tap="ontap">
		<text class="l-icon l-icon-checked"  v-if="dataInfo.isCheck"></text>
		<text class="l-icon l-icon-check" v-else></text>
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
			},
			index:{
				type: [String,Number]
			},
			type: {
				type: String,
				default: ''
			},
			type1: {
				type: String,
				default: ''
			},
			isClick: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			ontap(){
				if(this.isClick && !this.dataInfo.isCheck){
					this.$toast('最多可以添加五只产品进行pk对比');
					return
				}
				this.dataInfo.isCheck = !this.dataInfo.isCheck;
				this.$emit('ontap', this.dataInfo,this.index,this.type,this.type1)
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
