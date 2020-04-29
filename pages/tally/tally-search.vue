<template>
	<view class="l-container">
		<view class="l-titleNView">
			<view class="l-text-back" @tap="cancel">取消</view>
			<view class="l-search">
				<text class="l-icon l-icon-search"></text>
				<input class="l-search-input" :focus="true" type="text" placeholder="请输入基金搜索" v-model="key"/>
			</view>
			<view class="l-text-search" @tap="getKeyword">搜索</view>
		</view>
		<view class="l-titleNView-place"></view>
		
		<view v-if="isSearch">
			<view class="l-search-num">
				为您搜索出{{ total }}条
			</view>
			<view class="l-search-num-place"></view>
			
			
			<view class="l-main">
				<tally-item :dataInfo="s" v-for="(s, i) in dataList" :key="i"></tally-item>
				<view class="example-body">
					<uni-load-more :status="status" />
				</view>
			</view>
		</view>
		
		<view class="l-main-1" v-else>
			<view class="l-content l-content-1" v-if="myList.length">
				<view class="l-head-title">
					我的收藏基金
				</view>
				<tally-item :dataInfo="s" v-for="(s, i) in myList" :key="i"></tally-item>
			</view>
			<view class="l-content" v-if="superList.length">
				<view class="l-head-title">
					热门搜索
				</view>
				<tally-item :dataInfo="s" v-for="(s, i) in superList" :key="i"></tally-item>
			</view>
		</view>
	</view>
</template>

<script>
	import tallyItem from './tally-item.vue';
	
	export default {
		components:{
			tallyItem
		},
		data(){
			return {
				params: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				status: 'loading',
				statusOption: {
					loading:'loading',
					more: 'more',
					noMore: 'noMore'
				},
				total: 0,
				key: '',
				isSearch: false,
				dataList: [],
				myList: [],
				superList: []
			}
		},
		onLoad() {
			this.init()
		},
		onReachBottom() {
			let pageInfo = this.params;
			let list = this.dataList;
			let pageIndex = pageInfo['pageInfo.pageIndex'];
			let pageSize = pageInfo['pageInfo.pageSize'];
			let total = this.total;
			let length = pageIndex * pageSize;
			if(length < total && list.length === length){
				++this.params['pageInfo.pageIndex']
				this.searchFundInfoFun();
			}
		},
		methods:{
			init(){
				this.getListFn()
				this.superProduceFn()
			},
			cancel(){
				this.$back();
			},
			getListFn(){
				let _this = this;
				let params = {
					'pageInfo.pageSize': 10000
				};
				let url = 'user/fav/funds/list';
				
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						let data = info.list || [];
						
						data.forEach(e => {
							if(!e.isCheck){
								e.isCheck = false;
							}
						})
						
						_this.myList = data;
					}
				})
			},
			getKeyword(){
				if(!this.key) return
				if(!this.isSearch){
					this.isSearch = !this.isSearch
				}
				this.params['pageInfo.pageIndex'] = 1;
				this.dataList = [];
				this.searchFundInfoFun();
			},
			searchFundInfoFun(){
				let _this = this;
				let url = 'business/searchFundInfo';
				let params = this.params;
				params.key = this.key,
				_this.status = _this.statusOption.loading;
				this.$get(url,params)
				.then(res => {
					if(res.code == '200'){
						let info = res.content || {};
						
						_this.total = info.pageInfo && info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						this.dataList = this.dataList.concat(data);
						
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				})
			},
			superProduceFn(){
				let _this = this;
				let params = { 
					'pageInfo.pageSize': 10,
					'pageInfo.pageIndex': 1,
					labelId :34
				};
				let url = 'business/superProduce';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list || [];
						
						_this.superList = data;
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
	
	.l-titleNView-place{
		padding: var(--status-bar-height) 32rpx 0;
		height: 44px;
	}
	
	.l-search-num{
		position: fixed;
		top: calc(44px + var(--status-bar-height));
		left: 0;
		box-sizing: border-box;
		width: 100%;
		height: 70rpx;
		display: flex;
		color: #E60012;
		align-items: center;
		justify-content: center;
		background-color: #FFF5F6;
	}
	
	.l-search-num-place{
		padding: var(--status-bar-height) 32rpx 0;
		height: 70rpx;
	}
	
	.l-main{
		padding: 0 32rpx;
	}
	
	.l-search-input{
		flex: 1;
		font-size: 24rpx;
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
	
	.l-icon-search{
		width: 30rpx;
		height: 30rpx;
		margin-right: 12rpx;
		background-image: url('~@/static/windzxsh/sousuo@2x.png');
	}
	
	
	.l-main-1{
		width: 100%;
	}
	
	.l-content{
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: #FFFFFF;
	}
	
	.l-head-title{
		width: 100%;
		display: flex;
		align-items: center;
		height: 104rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #828282;
	}
	
	.l-content-1{
		border-bottom: 20rpx solid #F6F6F6;
	}
</style>
