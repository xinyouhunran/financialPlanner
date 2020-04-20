<template>
	<view class="l-pk-item" @tap="ontap">
		<view class="l-pki-left">
			<view class="l-pki-icon">
				<text class="l-icon l-icon-checked"  v-if="dataInfo.isCheck"></text>
				<text class="l-icon l-icon-check" v-else></text>
			</view>
			<view class="l-pki-name">
				<view class="l-text-1">
					<!-- <text class="l-text-red">免认购费</text> -->
					{{ dataInfo.secShortName || '--' }}
				</view>
			</view>
		</view>
		<view class="l-pki-right">
			{{ dataInfo.accumNav || '--' }}
			<span class="l-text-3">
				累计收益
			</span>
		</view>
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
				this.dataInfo.isCheck = !this.dataInfo.isCheck;
				this.$emit('ontap', this.dataInfo)
			}
		}
	}
</script>

<style scoped>
	.l-pk-item {
		display: flex;
		padding-bottom: 57rpx;
	}
	
	.l-pki-left{
		flex: 1;
		line-height: 1.4;
		display: flex;
	}
	
	.l-pki-name{
		width: 405rpx;
	}
	
	.l-text-1{
		display: block;
		width: calc(100% - 56rpx);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.l-pki-icon{
		line-height: 1.4;
	}
	
	.l-pki-right{
		color: #E70012;
		white-space: nowrap;
		text-align: right;
		min-width: 120rpx;
		margin-left: 24rpx;
		line-height: 1.4;
	}
	
	.l-text-3 {
		display: block;
		font-size: 28rpx;
		color: #828282;
	}
	
	.l-text-red {
		display: inline-block;
		padding: 0 4rpx;
		vertical-align: middle;
		height: 30rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 30rpx;
		font-size: 20rpx;
		color: rgba(231, 0, 18, 1);
		border: 1px solid;
		border-radius: 4px;
		margin-right: 8rpx;
	}
	
	.l-icon-checked {
		vertical-align: middle;
		min-width: 36rpx;
		height: 36rpx;
		margin-right: 19rpx;
		background-image: url('~@/static/handle/xuanze@2x.png');
	}
	
	.l-icon-check {
		vertical-align: middle;
		min-width: 36rpx;
		height: 36rpx;
		margin-right: 19rpx;
		background-image: url('~@/static/xuan@2x.png');
	}
</style>
