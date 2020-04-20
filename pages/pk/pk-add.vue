<template>
	<view class="l-container">
		<view class="l-titleNView">
			<view class="l-text-back" @tap="cancel">取消</view>
			<view class="l-search">
				<text class="l-icon l-icon-search"></text>
				<input class="l-search-input" :focus="true" type="text" placeholder="请输入基金搜索" v-model="key" />
			</view>
			<view class="l-text-search" @tap="confirm">完成</view>
		</view>
		<view class="l-titleNView-place"></view>
		
		<view v-if="dataList.length">
			<view class="l-search-num">
				共为您搜索出{{ total }}条
			</view>
			<view class="l-search-num-place"></view>
			
			
			<view class="l-main">
				<pk-select-item @ontap="ontap" :dataInfo="s" v-for="(s, i) in dataList" :key="i"></pk-select-item>
				<view class="example-body">
					<uni-load-more :status="status" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pkSelectItem from './pk-select-item.vue';
	
	export default {
		components:{
			pkSelectItem
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
				myList: [{}],
				hostList: [{}],
				interval: null,
				confirmList: [],
				storageList:[]
			}
		},
		onLoad() {
			this.init()
		},
		watch:{
			key(n){
				if(this.interval){
					clearTimeout(this.interval)
				}
				this.interval = setTimeout(() => {
					this.interval = null;
					if(n){
						uni.showLoading({
							title:'搜索中'
						})
						this.getKeyword()
					}else{
						this.params['pageInfo.pageIndex'] = 1;
						this.dataList = [];
					}
				},500)
				
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
				++this.params['pageInfo.pageIndex']
				this.searchFundInfoFun();
			}
		},
		methods:{
			init(){
				// this.getListFn()
				this.storageList = this.$getStorage('storageList') || [];
			},
			cancel(){
				this.$back();
			},
			ontap(s, i){
				if(s.isCheck){
					this.confirmList.push(s);
				}else{
					let index = this.confirmList.map(e => e.securityId).indexOf(s.securityId);
					if(index !== -1){
						this.confirmList.splice(index, 1);
					}
				}
			},
			confirm(){
				let confirmList = this.confirmList;
				let storageList = this.storageList;
				
				confirmList.forEach(e => {
					if(storageList.map(e => e.id).indexOf(e.securityId) === -1){
						storageList.push({
							id: e.securityId + '',
							secShortName: e.secShortName,
							secFullName: e.secFullName,
							returnAccum: e.accumNav,
							isCheck: false
						})
					}
				})
				this.$setStorage('storageList', storageList)
				let page = this.$pageList();
				page.storageList = storageList;
				this.$back()
			},
			getKeyword(){
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
					uni.hideLoading()
					if(res.code == '200'){
						let info = res.content || {};
						
						_this.total = info.pageInfo && info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						let storageList = _this.storageList;
						data.forEach(e => {
							e.isCheck = storageList.map(e => e.id).indexOf(e.securityId) !== -1;
						})
						
						this.dataList = this.dataList.concat(data);
						
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				}).catch(res => {
					uni.hideLoading()
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
		height: 90rpx;
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
