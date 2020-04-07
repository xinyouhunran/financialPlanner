<template>
	<view class="l-share">
		<view class="l-share-view l-share-view-1">
			<!-- #ifdef APP-PLUS -->
			<view class="l-share-item" >
				<span class="l-icon l-icon-share l-icon-wx"></span>
				<view class="l-share-type">
					微信好友
				</view>
			</view>
			<view class="l-share-item"  >
				<span class="l-icon l-icon-share l-icon-pyq"></span>
				<view class="l-share-type">
					朋友圈
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="l-share-item"  @tap="open_share('qzone')">
				<span class="l-icon l-icon-share l-icon-qqkj"></span>
				<view class="l-share-type">
					QQ空间
				</view>
			</view>
			<!-- #endif -->
			<view class="l-share-item" @tap="open_share('qq')">
				<span class="l-icon l-icon-share l-icon-qq"></span>
				<view class="l-share-type">
					QQ好友
				</view>
			</view>
			<view class="l-share-item" @tap="open_share('weibo')">
				<span class="l-icon l-icon-share l-icon-wb"></span>
				<view class="l-share-type">
					新浪微博
				</view>
			</view>
		</view>
		<view class="l-share-view l-share-view-2" @tap="$emit('close')">
			取消
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
		data() {
			return {}
		},
		methods: {
			// #ifdef H5
			open_share(type) {
				var shareUrl = 'www.baidu.com';
				var shareTitle = this.dataInfo.title || '';
				var shareImg = this.dataInfo.coverImageUrl || '';
				var shareDesc = '';
				var openUrl = '';
				switch (type) {
					case 'qzone':
						openUrl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + shareUrl + '&title=' + shareTitle +
							'&pics=' + shareImg;
						break;
					case 'qq':
						openUrl = 'https://connect.qq.com/widget/shareqq/index.html?url=' + shareUrl+ '&title='+ shareTitle+ '&desc=' + shareDesc + '&summary=' + '&site=' + shareUrl + '&pics=' + shareImg;
						break;
				
					case 'weibo':
						openUrl = 'http://service.weibo.com/share/share.php?title=' + shareTitle + '&source=' + shareUrl + '&sourceUrl=' +
							shareUrl + '&content=' + '&pic=' + shareImg;
						break;
				}
				window.open(openUrl);
			}
			// #endif
		}
	}
</script>

<style scoped>
	.l-share {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 778;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.l-share-view {
		position: absolute;
		display: flex;
		align-items: center;
		width: 718rpx;
		border-radius: 16rpx;
		left: 16rpx;
		color: #000000;
		background-color: #FFFFFF;
	}

	.l-share-view-1 {
		font-size: 11px;
		height: 230rpx;
		bottom: 202rpx;
		box-sizing: border-box;
		padding: 53rpx 69rpx 65rpx 58rpx;
		justify-content: space-between;
	}

	.l-share-view-2 {
		bottom: 84rpx;
		height: 100rpx;
		font-size: 16px;
		justify-content: center;
	}

	.l-share-item {
		text-align: center;
	}

	.l-share-type {
		margin-top: 27rpx;
	}

	.l-icon-share {
		width: 70rpx;
		height: 70rpx;
	}

	.l-icon-wx {
		background-image: url('~@/static/wx@2x.png');
	}

	.l-icon-qq {
		background-image: url('~@/static/QQ@2x.png');
	}

	.l-icon-pyq {
		background-image: url('~@/static/pyq@2x.png');
	}

	.l-icon-wb {
		background-image: url('~@/static/wb@2x.png');
	}
	
	.l-icon-qqkj {
		background-image: url('~@/static/qqkj@2.png');
	}
</style>
