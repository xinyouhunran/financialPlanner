<template>
	<view class="l-container">
		<view class="l-tab">
			<view class="l-tab-item" 
			@tap="selectTabFn(s, i)"
			:class="{ 'l-tab-active': tabIndex == i }"
			v-for="(s, i) in tabList" :key="i">
				{{ s.title }}
			</view>
		</view>
		
		<swiper class="l-swiper" :current="tabIndex" @change="changeSwiper">
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" @scrolltolower="scrolltolower">
					<product :dataInfo="s" v-for="(s, i) in productList" :key='i'></product>
					<view class="example-body">
						<uni-load-more :status="status[0]" />
					</view>
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" @scrolltolower="scrolltolower">
					<company :dataInfo="s" v-for="(s, i) in companyList" :key='i'></company>
					<view class="example-body">
						<uni-load-more :status="status[1]" />
					</view>
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" @scrolltolower="scrolltolower">
					<manager :dataInfo="s" v-for="(s, i) in managerList" :key='i'></manager>
					<view class="example-body">
						<uni-load-more :status="status[2]" />
					</view>
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" @scrolltolower="scrolltolower">
					<money :dataInfo="s" v-for="(s, i) in moneyList" :key='i'></money>
					<view class="example-body">
						<uni-load-more :status="status[3]" />
					</view>
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y class="swiper-item" @scrolltolower="scrolltolower">
					<road :dataInfo="s" v-for="(s, i) in roadList" :key='i'></road>
					<view class="example-body">
						<uni-load-more :status="status[4]" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import product from './product.vue';
	import company from './company.vue';
	import manager from './manager.vue';
	import money from './money.vue';
	import road from './road.vue';
	
	export default {
		components:{
			road,
			money,
			manager,
			company,
			product
		},
		data(){
			let tabList = [
				{ 
					title: '产品',
					key: 'productList',
					url: 'user/fav/funds/list'
				},
				{ 
					title: '公司',
					key: 'companyList',
					url: 'user/fav/org/list'
				},
				{ 
					title: '经理' ,
					key: 'managerList',
					url: 'user/fav/manager/list'
				},
				{ 
					title: '理财师' ,
					key: 'moneyList',
					url: 'user/fav/manager/list'
				},
				{ 
					title: '路演' ,
					key: 'roadList',
					url: 'user/fav/roadShow/list'
				}
			];
			let length = tabList.length;
			let list = [...Array(length).keys()];
			let total = list.map(e => 0);
			let status = list.map(e => 'loading');
			let params = list.map(e => {
				return {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				}
			});
			return {
				productList: [],
				companyList: [],
				managerList: [],
				moneyList: [],
				roadList: [],
				tabIndex: 0,
				total: total,
				params: params,
				tabList: tabList,
				status: status,
				statusOption: {
					loading:'loading',
					more: 'more',
					noMore: 'noMore'
				},
			}
		},
		onLoad() {
			this.init()
		},
		methods:{
			init(){
				this.getListsFn();
			},
			selectTabFn(s, i){
				this.tabIndex = i;
			},
			changeSwiper(e){
				if(e.detail.source === "touch"){
					this.tabIndex = e.detail.current;
				}
			},
			getListsFn(){
				let _this = this;
				let tabList = _this.tabList;
				
				tabList.forEach((e, i) => {
					_this.getListFn(i + '')
				})
			},
			scrolltolower(){
				let _this = this;
				let tabIndex = _this.tabIndex;
				let tabList = _this.tabList[tabIndex];
				let params = _this.params[tabIndex];
				let total = _this.total[tabIndex];
				let key = tabList.key;
				let list = _this[key];
				let pageIndex = params['pageInfo.pageIndex'];
				let pageSize = params['pageInfo.pageSize'];
				let length = pageIndex * pageSize;
				if(length < total && list.length === length){
					++_this.params[tabIndex]['pageInfo.pageIndex']
					_this.getListFn();
				}
			},
			getListFn(i){
				let _this = this;
				let tabIndex = i ? i : _this.tabIndex;
				let tabList = _this.tabList[tabIndex];
				let params = _this.params[tabIndex];
				let key = tabList.key;
				let url = tabList.url;
				
				_this.status[tabIndex] = _this.statusOption.loading;
				
				_this.$get(url, params)
				.then(res => { 
					let info = res.content || {};
					
					_this.total[tabIndex] = info.pageInfo && info.pageInfo.recordCount || 0;
					
					let data = info.list || [];
					
					if(tabIndex == 0){
						data.forEach(e => {
							if(e.navDate){
								let d = new Date(e.navDate);
								e.endDateDay = [d.getMonth() + 1, d.getDay()].map(e => e > 9 ? e : '0' + e).join('-');
							}else{
								e.endDateDay = ''
							}
						})
					}else if(tabIndex == 4){
						data.forEach(e => {
							e.duration = e.showDuration ? _this.$getDuration(e.showDuration) : '00:00:01';
						})
					}
					
					_this[key] = _this[key].concat(data);
					if(key == 'moneyList'){
						_this.total[tabIndex] = 0;
						_this[key] = [];
					}
					if(_this[key].length == _this.total[tabIndex]){
						_this.status[tabIndex] = _this.statusOption.noMore;
					}
				}).catch(err=>{
					console.log(err);
					_this.$toast(err,{
						fn:()=>{
							setTimeout(()=>{
								_this.$nav({url:'/pages/index/index'},'switchTab');
							},2000)
						}
					});
				})
			}
		}
	}
</script>

<style scoped>
	@import url("./attention.css");
</style>
