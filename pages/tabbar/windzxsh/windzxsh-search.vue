<template>
	<view class="l-container">

		<view class="l-titleNView">
			<view class="l-icon-back" @tap="$back()"></view>
			<view class="l-search">
				<input class="l-search-input" :focus="true" type="text" placeholder="请输入资讯标题" v-model="keyword"/>
			</view>
			<view class="l-icon-search" @tap="getKeyword"></view>
		</view>

		<view class="l-status"></view>

		<view class="l-body">

			<template v-if="!isSearch">
				<view class="l-content" v-if="dataList.length">
					<view class="l-ctn-head" >
						（共为您找到{{ total }}个结果）
					</view>
					<view class="l-ctn-body">
						<windzxsh v-for="(s,i) in dataList" :dataInfo="s"  :key="i"></windzxsh>
					</view>
					<view class="example-body">
						<uni-load-more :status="status" />
					</view>
				</view>
				<view class="l-content" v-if="!dataList.length && status === 'noMore'">
					<view class="l-hint">
						抱歉，没有找到匹配信息，换个关键词试试或向我们<span @tap="$nav({ url: '/pages/feedback/feedback' })" style="color: #E60012;">反馈意见</span>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="l-content" >
					<view class="l-cc-head">“资讯”热门搜索</view>
					<view class="l-c-content">
						<windzxsh v-for="(s,i) in hotList" :dataInfo="s"  :key="i"></windzxsh>
					</view>
				</view>
			</template>
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
				keyword: '',
				params: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				dataList: [],
				hotList: [],
				recList: [],
				total: 0,
				status: 'loading',
				statusOption: {
					loading: 'loading',
					more: 'more',
					noMore: 'noMore'
				},
				isSearch: true
			}
		},
		onLoad() {
			this.hotWindFun();
			this.init();
		},
		onReachBottom() {
			if(!this.keyword && this.isSearch) return
			let pageInfo = this.params;
			let list = this.dataList;
			let pageIndex = pageInfo['pageInfo.pageIndex'];
			let pageSize = pageInfo['pageInfo.pageSize'];
			let total = this.total;
			let length = pageIndex * pageSize;
			if(length < total && list.length === length){
				++this.params['pageInfo.pageIndex']
				this.searchWindFun();
			}
		},
		methods: {
			getKeyword(){
				if(this.keyword){
					uni.showLoading({
						title:'搜索中...'
					})
					if(this.isSearch){
						this.isSearch = false;
					}
					this.init();
				}else{
					this.$toast('请输入查询内容')
				}
			},
			init(){
				this.params['pageInfo.pageIndex'] = 1;
				this.dataList = [];
				this.searchWindFun();
			},
			/**
			 * 基金产品搜索
			 */
			searchWindFun() {
				let _this = this;
				let params = JSON.parse(JSON.stringify(_this.params));
				let url = 'news/search';
				let reg = null;
				if(_this.keyword){
					params.key = _this.keyword;
					reg = new RegExp("(" + this.$escape(this.keyword) + ")","g");
				}else{
					delete params.key;
				}
				_this.status = _this.statusOption.loading;
				_this.$get(url, params)
				.then(res => { 
					uni.hideLoading()
					if(res.code == 200){
						let info = res.content || {};
						
						_this.total = info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						
						data.forEach(e => {
							if(reg){
								if(e.title){
									e.title = e.title
									.replace(reg, `<span style="color:#E70012;">${ this.keyword }</span>`);
								}
							}
						})
						
						_this.dataList = _this.dataList.concat(data);
						
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				}).catch(res => {uni.hideLoading()})
			},
			
			/**
			 * 热门路演
			 */
			hotWindFun() {
				let _this = this;
				let params = {};
				let url = 'news/hotSearch';
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						
						_this.hotList = info;
					}
				})
			},
			
		
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
