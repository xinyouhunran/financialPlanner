<template>
	<view class="l-container">
		<view class="l-scroll l-scroll-tag-posi" >
			<scroll-view class="l-scroll-item " scroll-x="true" >
				<view class="l-si-item" @tap="selectTag(i)"
				:class="{ 'l-si-active': tagIndex == i }" v-for="(s, i) in labelList" :key="i">
					{{ s[keys] }}
				</view>
			</scroll-view>
		</view>
		
		<view class="l-body-view">
			<road-list v-for="(s,i) in dataList" :dataInfo="s" @tap="$nav({url: '/pages/tabbar/road/road-details?id=' + s.id})" :key="i"></road-list>
		</view>
		<view class="example-body">
			<uni-load-more :status="status" />
		</view>
	</view>
</template>

<script>
	import roadList from '../componens/road-list.vue';
	export default {
		components:{
			roadList
		},
		data(){
			return {
				dataList:[],
				tagIndex: 0,
				labelList:[],
				id: '',
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
				event: 'hotUsers',
				type: 'presenter',
				keys: 'presenter'
			}
		},
		onLoad(e) {
			if(e.type == 1){
				this.type =  'partyId';
				this.event = 'hotOrgs';
				this.keys = 'partyShortName';
				uni.setNavigationBarTitle({
					title: '机构专场'
				})
			}
			this.id = e.id || '';
			this[this.event]();
		},
		onReachBottom() {
			let pageInfo = this.params;
			let list = this.dataList;
			let pageIndex = pageInfo['pageInfo.pageIndex'];
			let pageSize = pageInfo['pageInfo.pageSize'];
			let total = this.total;
			let length = pageIndex * pageSize;
			if(length < total && list.list.length === length){
				++this.pageInfo['pageInfo.pageIndex']
				this.roadListFn();
			}
		},
		methods:{
			selectTag(i){
				this.tagIndex = i;
				this.dataList = [];
				this.roadListFn();
			},
			hotUsers(){
				let _this = this;
				let params = {  };
				let url = 'roadShow/hotUsers';
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || [];
						
						_this.labelList = info;
						_this.tagIndex = info.map(e => e.id + '').indexOf(_this.id) || 0;
						
						_this.roadListFn();
					}
				})
			},
			hotOrgs(){
				let _this = this;
				let params = {  };
				let url = 'roadShow/hotOrgs';
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || [];
						
						_this.labelList = info;
						_this.tagIndex = info.map(e => e.partyId).indexOf(_this.id) || 0;
						
						_this.roadListFn();
					}
				})
			},
			
			/*
			* 路演列表
			*/
			roadListFn(){
				let _this = this;
				let params = _this.params;
				let url = 'roadShow/list';
				if(_this.type === 'partyId'){
					params.partyId = _this.labelList[_this.tagIndex].partyId;
				}else{
					params.presenter = _this.labelList[_this.tagIndex].presenter;
				}
				_this.status = _this.statusOption.loading;
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						
						_this.total = info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						
						data.forEach(e => {
							e.duration = _this.$getDuration(e.showDuration);
						})
						
						_this.dataList = _this.dataList.concat(data);
						
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.l-container {
		width: 100%;
	}
	
	.l-scroll{
		width: 100%;
	}
	
	.l-scroll-item{
		box-sizing: border-box;
		display: flex;
		width: 100%;
		padding: 30rpx 30rpx 31rpx;
		white-space: nowrap;
		background-color: #FFFFFF;
	}
	
	.l-scroll-tag-posi{
		position: sticky;
		top: 0;
		left: 0;
		z-index: 666;
	}
	
	.l-si-item{
		display: inline-block;
		text-align: center;
		line-height: 60rpx;
		padding: 0 26rpx;
		height: 60rpx;
		font-size: 16px;
		text-align: center;
		margin-right: 32rpx;
		color: #000000;
		border-radius:30rpx;
	}
	
	.l-si-item:last-of-type{
		margin-right: 0;
	}
	
	.l-si-active{
		color: #E70012;
		background:rgba(254,243,244,1);
	}
</style>
