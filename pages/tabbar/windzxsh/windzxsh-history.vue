<template>
	<view class="l-container">
		<view class="l-content">
			<view class="l-cc-head">“路演”历史记录</view>
			<view class="l-ctn-body"  v-if="dataList.length">
				<windzxsh v-for="(s,i) in dataList" :dataInfo="s"  :key="i"></windzxsh>
			</view>
			<view class="example-body">
				<uni-load-more :status="status" />
			</view>
		</view>
	</view>
</template>

<script>
	import windzxsh from '../componens/windzxsh.vue';
	export default {
		components:{
			windzxsh
		},
		data() {
			return {
				params: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				dataList: [],
				ids: [],
				total: 0,
				status: 'noMore',
				statusOption: {
					loading: 'loading',
					more: 'more',
					noMore: 'noMore'
				},
				isSearch: true
			}
		},
		onLoad() {
			if(this.hasLogin){
				this.ids = this.$getStorage('windzxshIds') || [];
				this.total = this.ids.length;
				this.init();
			}else{
				this.$toast('您还未登录')
			}
		},
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin;
			}
		},
		onReachBottom() {
			let pageInfo = this.params;
			let list = this.dataList;
			let pageIndex = pageInfo['pageInfo.pageIndex'];
			let pageSize = pageInfo['pageInfo.pageSize'];
			let total = this.total;
			let length = pageIndex * pageSize;
			if(length < total && list.length === length){
				++this.pageInfo['pageInfo.pageIndex']
				this.searchWindFun();
			}
		},
		methods: {
			
			init(){
				this.searchWindFun();
			},
			/**
			 * 基金产品搜索
			 */
			searchWindFun() {
				let _this = this;
				let params = _this.params;
				let url = 'news/pageList';
				params.ids = this.ids;
				_this.status = _this.statusOption.loading;
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list || [];
						
						_this.dataList = _this.dataList.concat(data);
						
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				}).catch(res => {
					_this.status = _this.statusOption.noMore;
				})
			}
		}
	}
</script>

<style scoped>
	.l-titleNView{
		width: calc(100% - 64rpx);
		height: 44px;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		padding: var(--status-bar-height) 32rpx 0;
		background-color: #EDEDED;
		z-index: 777;
	}
	
	.l-search-input{
		flex: 1;
		font-size: 24rpx;
	}
	
	.l-icon-back{
		width: 21rpx;
		height: 37rpx;
		background: url('~@/static/back@2x.png')center/cover no-repeat;
	}
	
	.l-icon-search{
		width: 41rpx;
		height: 41rpx;
		background: url('~@/static/search@2x.png')center/cover no-repeat;
	}
	
	.l-search{
		flex: 1;
		margin: 0 31rpx;
		font-size: 26rpx;
		height:60rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
	}
	
	.l-status {
		width: 100%;
		height: calc(44px + var(--status-bar-height));
	}

	.l-container {
		min-height: 100vh;
	}
	
	.l-hint{
		box-sizing: border-box;
		width: 100%;
		padding: 100rpx 91rpx;
		line-height: 1.7;
		font-size: 30rpx;
		color: #828282;
		text-align: center;
	}
	
	.l-c-head{
		border-top: 24rpx solid #F6F6F6;
		padding: 30rpx 0 7rpx;
		font-size: 32rpx;
		color: #828282;
	}
	
	.l-cc-head{
		box-sizing: border-box;
		height: 90rpx;
		line-height: 90rpx;
		color: #828282;
		padding: 0 30rpx;
		font-size: 32rpx;
		background-color: #f6f6f6;
		font-weight: bold;
	}

	.l-ctn-head {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		font-size: 26rpx;
		height: 70rpx;
		color: #E60012;
		display: flex;
		background-color: #FFF5F6;
		align-items: center;
		justify-content: center;
	}

	.l-c-content,
	.l-ctn-body {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: #FFFFFF;
	}

	.l-ctn-zx {
		padding: 30rpx 35rpx;
		background: #FFFFFF;
	}

	.l-ctn-load {
		width: 100%;
		height: 98rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #828282;
	}
	
	.l-ctn-head-sub{
		font-size: 24rpx;
		color: #999999;
		margin-left: 15rpx;
	}

	.l-icon-more {
		display: block;
		width: 26rpx;
		height: 26rpx;
		margin-left: 10rpx;
		background: url('~@/static/more@2x.png') center/cover no-repeat;
	}
	
	.l-icon-bofang {
		width: 26rpx;
		height: 26rpx;
		background-image: url('~@/static/road/bofang-1@2x.png');
	}
	
	.l-icon-look{
		width: 28rpx;
		height: 20rpx;
		margin-right: 4rpx;
		background-image: url('~@/static/road/liulan@2x.png');
	}
	
	
	.l-road-item{
		padding: 28rpx 0 31rpx;
	}
	
	.l-road-center,
	.l-road-top{
		display: flex;
		align-items: center;
	}
	
	.l-road-center{
		padding: 22rpx 0 31rpx;
	}
	
	.l-road-player{
		display: flex;
		align-items: center;
	}
	
	.l-road-content{
		color: #828282;
		font-size: 26rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.l-rc-title{
		font-size: 32rpx;
		color: #000000;
		display: block;
		overflow: hidden;
		span-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.l-road-player{
		min-width: 26rpx;
		margin-right: 11rpx;
	}
	
	.l-rcl-tag{
		display: flex;
		padding: 0 8rpx;
		height: 40rpx;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		border-radius: 18rpx;
		color: #E60012;
		border: 1rpx solid;
	}
</style>
