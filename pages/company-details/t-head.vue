<template>
	<view class="l-module" >
		<view class="l-module-head l-flex l-flex-ai_c">
			<view class="l-module-head-user l-flex l-flex-ai_c  l-flex-1">
				<view class="l-module-head-user-avatar">
					<image class="l-img-avatar" src="../../static/gongsi@2x.png" mode="aspectFill"></image>
				</view>
				<view class="l-module-head-user-name  l-flex-1">
					{{ dataInfo.partyShortName }}
				</view>
			</view>
			<view class="l-module-head-handle">
				<button class="l-btn l-module-head-handle-btn" @tap="onFollow()">{{ dataInfo.fav ? '已关注' : '+关注' }}</button>
			</view>
		</view>
		<view class="l-module-foot l-flex">
			<view class="l-module-foot-item">
				<view>核心策略：{{ dataInfo.investStrategy || '宏观策略' }}</view>
				<view>备案：<text class="l-color-AC9472">{{ dataInfo.regCd ? dataInfo.regCd + ' &gt;' : '--' }} </text></view>
			</view>
			<view class="l-module-foot-item">
				<view>管理规模：{{ dataInfo.scale || '--' }}</view>
				<view>所在地区：{{ dataInfo.regCity || '--' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataInfo:{
				type: Object,
				default(){
					return {};
				}
			},
			partyId: [String,Number]
		},
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin;
			}
		},
		methods:{
			onFollow(){
				let _this = this;
				if(!_this.hasLogin) {
					_this.$toast('您还未登录，请先登录');
					return
				}
				let params = { partyId: this.partyId };
				let url = _this.dataInfo.fav ? 'user/fav/org/remove' : 'user/fav/org/add';
				this.$post(url, params)
					.then(res => {
						if (res.code == 200) {
							_this.$set(_this.dataInfo,'fav', !_this.dataInfo.fav)
						}
					})
			}
		}
	}
</script>

<style scoped lang="scss">
	.l-module{
		padding: 30rpx 30rpx 40rpx;
		background-color: #FFFFFF;
	}
	
	.l-module-head{
		padding-bottom: 39rpx;
		
		&-user{
			&-avatar{
				width: 116rpx;
				height: 116rpx;
				margin-right: 21rpx;
				border-radius: 20rpx;
			}
			
			.l-img-avatar{
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
			}
			
			&-name{
				font-size: 36rpx;
				font-weight: bold;
			}
		}
		
		&-handle{
			&-btn {
				width: 130rpx;
				height: 50rpx;
				color: #FFFFFF;
				border-radius: 25rpx;
				line-height: 50rpx;
				background-color: #AC9472;
			}
		}
	}

	.l-module-foot{
		width: 100%;
		
		&-item {
			width: 50%;
			
			view,div{
				padding-top: 11rpx;
			}
		}
		
		.l-color-AC9472{
			color: #AC9472;
		}
	}
	
	.l-display-none{
		display: none;
	}
	
</style>
