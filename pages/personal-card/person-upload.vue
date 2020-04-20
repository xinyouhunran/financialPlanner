<template>
	<view class="person-upload">
		<view class="person-upload-t">
			{{title}}
		</view>
		<view class="person-upload-text l-flex l-flex-direction l-flex-ai_c" @tap="add">
			<view class="">
				<image src="../../static/person/tj@2x.png" mode=""></image>
			</view>
			<view class="addText">
				{{addText}}
			</view>
			<view class="addTip">
				{{addTip}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
			},
			addText:{
				type:String,
			},
			addTip:{
				type:String,
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			add(){
				this.$emit('selectPro')
			}
		}
	}
</script>

<style scoped lang="scss">
.person-upload{
	background-color: #FFFFFF;
	padding-bottom: 24rpx;
	overflow: hidden;
	&-t{
		margin-left: 30rpx;
		margin-top: 28rpx;
		font-size: 36rpx;
	}
	&-text{
		margin: 32rpx 20rpx 0;
		background-color: #F7F7F7;
		height: 306rpx;
		image{
			width: 66rpx;
			height: 66rpx;
			margin-top: 60rpx;
		}
		.addText{
			color: #3481F2;
			margin-top: 18rpx;
		}
		.addTip{
			color: #afafaf;
			margin-top: 32rpx;
			width: 502rpx;
			text-align: center;
			line-height: 32rpx;
		}
	}
}
</style>
