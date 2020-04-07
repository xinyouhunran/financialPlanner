<template>
	<view class="l-module" @tap="$nav({ url: '/pages/people-details/people-details?id=' + dataInfo.personId })">
		<view class="l-module-left">
			<image class="l-img-company" src="../../static/ren@2x.png" mode="aspectFill"></image>
		</view>
		<view class="l-module-right">
			<view class="l-product-name">
				<view class="l-product-name-title">
					{{ dataInfo.name }}
				</view>
				<view class="l-product-name-button" @tap.stop="onChat" v-if="dataInfo.userId">
					<span class="l-icon-circle"></span>
					<span>直聊TA</span>
				</view>
			</view>
			<view class="l-module-content">
				<view class="l-module-item l-txt-left">
					<view class="l-module-value l-color-E70012">
						{{ dataInfo.returnAccum }}
					</view>
					<view class="l-module-label">
						累计收益
					</view>
				</view>
				<view class="l-module-item l-txt-right">
					<view class="l-module-value l-color-E70012">
						1.42%
					</view>
					<view class="l-module-label">
						今年收益
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataInfo: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods:{
			onChat(){
				//  #ifdef H5
				this.$store.dispatch('downloadApp');
				// #endif
				//  #ifdef APP-PLUS
				let _this = this;
				var chatUser = this.dataInfo.userId;
				_this.jpushIM.skipToSingleChat(chatUser, (res) => {
					// console.log(JSON.stringify(res));
					var data = res.data;
					_this.$nav({
						url: '/pages/im-chat/im-chat?title=' + data.title + '&fromUser=' + JSON.stringify(data.fromUser)
					})
				}, (err) => {
					uni.showToast({
						title: "创建会话失败:" + err.errorMsg,
						icon: "none"
					});
				})
				// #endif
			}
		}
	}
</script>

<style scoped>
	.l-module {
		width: calc(100% - 60rpx);
		box-sizing: border-box;
		padding: 30rpx 0;
		margin: 0 30rpx;
		font-size: 14px;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #EDEDED;
	}
	
	.l-module-left{
		width: 136rpx;
		height: 136rpx;
		margin-right: 29rpx;
	}

	.l-img-company{
		width: 136rpx;
		height: 136rpx;
		border-radius: 20rpx;
	}

	.l-module-right{
		width: calc(100% - 165rpx);
	}
	
	.l-product-name{
		font-size: 16px;
		padding-bottom: 29rpx;
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.l-product-name-title{
		flex: 1;
		color: #000000;
		font-size: 16px;
		font-weight: bold;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-product-name-button{
		width:132rpx;
		height:52rpx;
		color: #836438;
		font-size: 13px;
		border:1rpx solid;
		border-radius:26rpx;
		display: flex;
		margin-left: 32rpx;
		align-items: center;
		justify-content: center;
	}
	
	.l-icon-circle{
		display: inline-block;
		width:10rpx;
		height:10rpx;
		margin-right: 4rpx;
		background:rgba(131,100,56,1);
		border-radius:50%;
	}
	
	.l-module-content{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-module-value {
		font-size: 16px;
	}

	.l-module-label {
		margin-top: 13rpx;
		white-space: nowrap;
		color: #828282;
	}

	.l-color-E70012 {
		color: #E70012;
	}

	.l-txt-left {
		text-align: left;
	}

	.l-txt-right {
		text-align: right;
	}
</style>
