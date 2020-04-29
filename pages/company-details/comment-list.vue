<template>
	<view class="l-module">
		<view class="l-module-left">
			<image class="l-ml-avatar" src="../../static/ren@2x.png" mode="aspectFill"></image>
		</view>
		<view class="l-module-right">
			<view class="l-mr-title">
				{{ dataInfo.realName || dataInfo.commentUserName }}
			</view>
			<view class="l-mr-sub" v-if="false">
				#森瑞投资#
			</view>
			<view class="l-mr-content">
				{{ dataInfo.content }}
			</view>
			<view class="l-mr-date">
				{{ dataInfo.createDate }}
			</view>
			
			<view class="l-mr-reply" v-for="(s, i) in replyList" :key="i">
				<view class="l-mrr-title">
					<text class="l-icon-mrr l-icon"></text>
					<text class="l-font-w">店主回复</text>
				</view>
				<view class="l-mrr-content">
					{{ s.content }}
				</view>
				<view class="l-mrr-date">
					{{ s.createDate }}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataInfo: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data(){
			return {
				replyList: []
			}
		},
		watch:{
			dataInfo(n){
				if(n.id){
					this.getComment();
				}
			}
		},
		methods: {
			getComment(){
				let params = { commentId: this.dataInfo.id };
				let url = 'comment/reply/list';
				
				this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						let data = info.list || [];
						
						this.replyList = data;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.l-module{
		display: flex;
		padding-bottom: 54rpx;
	}
	
	.l-module-left{
		width: 72rpx;
		margin-right: 24rpx;
	}
	
	.l-module-right{
		flex: 1;
	}
	
	.l-font-w{
		font-weight: bold;
	}
	
	.l-ml-avatar{
		width: 72rpx;
		height: 72rpx;
	}
	
	.l-mr-reply{
		padding: 0 26rpx;
		background-color: #F6F6F6;
	}
	
	.l-mr-title{
		color: #828282;
		padding-bottom: 28rpx;
	}
	
	
	.l-mr-sub{
		font-size: 32rpx;
		color: #49A6E9;
	}
	
	.l-mrr-title{
		display: flex;
		align-items: center;
		color: #5E5E5E;
		padding: 27rpx 0;
	}
	
	.l-mr-content{
		font-size: 30rpx;
		padding-top: 15rpx;
		line-height: 1.3;
	}
	
	.l-mrr-content{
		color: #676767;
		line-height: 1.2;
	}
	
	.l-mr-date{
		font-size: 22rpx;
		padding: 38rpx 0;
	}
	
	.l-mrr-date{
		font-size: 22rpx;
		color: #828282;
		padding: 38rpx 0;
	}
	
	.l-icon-mrr{
		width: 32rpx;
		height: 32rpx;
		margin-right: 12rpx;
		background-image: url('~@/static/l-icon-renm.png');
	}
</style>
