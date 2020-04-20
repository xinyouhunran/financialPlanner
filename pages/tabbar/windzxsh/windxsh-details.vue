<template>
	<!-- #ifdef APP-PLUS -->
	<web-view :src="dataInfo.url" v-if="dataInfo.url && type == 1"></web-view>
	<!-- #endif -->
	<!-- #ifndef APP-PLUS -->
	<web-view :src="dataInfo.s3Url" v-if="dataInfo.s3Url && type == 1"></web-view>
	<!-- #endif -->
	<view class="l-container" v-else>
		<view class="l-head">
			<view class="l-title" >
				{{ dataInfo.title || '--' }}
			</view>
			<view class="l-sub">
				<span>{{ dataInfo.source  || '--' }}</span>
				<span>{{ dataInfo.publishTime || '--' }}</span>
			</view>
		</view>
		
		<view class="l-main">
			<view class="l-content" >
				<text selectable decode v-if="type == 1">
					{{ dataInfo.body || '--' }}
				</text>
				<text v-else v-html="dataInfo.body" >
					{{ dataInfo.body || '--' }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	let pattern = /\s+\↵+/g;
	export default {
		data(){
			return {
				id: '',
				type: '1',
				dataInfo: {}
			}
		},
		onLoad(e) {
			this.id = e.id || '';
			this.type = e.type || '1';
			this.init();
		},
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin;
			}
		},
		methods:{
			init(){
				this.windxshInfo()
			},
			windxshInfo(){
				let _this = this;
				let params = { id: _this.id };
				let url = _this.type == 1 ? 'news/detail' : 'news/detailSelf';
				uni.showLoading({
					title:'加载中'
				})
				_this.$get(url, params)
				.then(res => { 
					uni.hideLoading()
					if(res.code == 200){
						let info = res.content || {};
						if(info.body){
							info.body = info.body.replace(pattern, '\\n').replace(/\<img/g, '<img style="max-width:100%;" ')
						}
						_this.dataInfo = info;
					}
				}).catch(e => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped>
	
	.l-head{
		box-sizing: border-box;
		padding:30rpx;
		background-color: #FFFFFF;
	}
	
	.l-title{
		text-align: center;
		line-height: 1.3;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 26rpx;
	}
	
	.l-sub{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 24rpx;
		color: #828282;
	}
	
	.l-main{
		box-sizing: border-box;
		padding: 30rpx;
		border-top: 20rpx solid #F6F6F6;
	}
	
	.l-content{
		font-size: 30rpx;
		line-height: 1.5;
		overflow: auto;
	}
	
	.l-content img,
	.l-content image{
		max-width: 100%;
	}
</style>
