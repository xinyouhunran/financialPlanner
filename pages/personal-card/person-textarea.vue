<template>
	<view class="person-textarea">
		<view class="person-textarea-t">
			{{title}}
		</view>
		<view class="person-textarea-text">
			<textarea v-model="descripe" placeholder="描述文字（限制150字）" placeholder-style="color:#afafaf;" class="mytext" maxlength="150" :disabled="disableFlag"/>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
			}
		},
		data() {
			return {
				descripe:'',
				disableFlag:false
			}
		},
		methods: {
			setValue(v,flag){
				this.descripe = v;
				this.disableFlag = flag;
			}
		}
	}
</script>

<style scoped lang="scss">
.person-textarea{
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
		padding-left: 20rpx;
		padding-top: 20rpx;
		.mytext{
			width: calc(100% - 20rpx);
			height: 260rpx;
		}
	}
}
</style>
