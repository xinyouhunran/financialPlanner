<template>
	<view class="l-container">
		<!-- <view class="l-thead">
			<view class="l-titleNView">
				<view class="l-titleNView-content">
					<view class="l-t-form">
						热门路演
					</view>
					<text class="l-icon l-icon-search" @tap="$nav({ url: '/pages/tabbar/road/road-search' })"></text>
					<text class="l-icon l-icon-shu" @tap="$nav({ url: '/pages/tabbar/road/road-history' })"></text>
				</view>
			</view>
			<view class="l-titleNView-place"></view>
		</view> -->
		<!-- @tap="$nav({url: '/pages/tabbar/road/road-details?id=' + s.id})" -->
		<swiper class="l-swiper" indicator-active-color="#ffffff" v-if="bannerList.length"
		indicator-color="#9A999E" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(s, i) in bannerList" :key="i" >
				<view class="l-body-view l-body-view-1" >
					<image class="l-img-road" :src="s.picUrl" mode="aspectFit"></image>
					<!-- <view class="l-view-posi">
						<text class="l-icon l-icon-stop"></text>
						<text class="l-mt-date">{{ s.duration }}</text>
					</view> -->
				</view>
			</swiper-item>
		</swiper>
		
		<!-- <view class="l-tab">
			<view class="l-tab-item" :class="{ 'l-tab-active': hotIndex == 0 }" @tap="hotIndex = 0">
				热门嘉宾
			</view>
			<view class="l-tab-item" :class="{ 'l-tab-active': hotIndex == 1 }" @tap="hotIndex = 1">
				热门机构
			</view>
		</view>
		<view class="l-scroll" :class="{ 'l-display-block': hotIndex == 0 }">
			<scroll-view class="l-scroll-item" scroll-x="true" >
				<view class="l-si-view" v-for="(s,i) in presenterList" :key="i" @tap="$nav({ url: '/pages/tabbar/road/road-guest?id='+ s.id })">
					<view class="l-siv-avatar">
						<image class="l-siv-img" :src="s.headPortrait" mode="aspectFill"></image>
					</view>
					<view class="l-siv-name">
						{{ s.presenter }}
					</view>
				</view>
			</scroll-view>
		</view> -->
		<view class="l-scroll" :class="{ 'l-display-block': hotIndex == 1 }">
			<scroll-view class="l-scroll-item" scroll-x="true" >
				<view class="l-si-view" v-for="(s,i) in orgList" :key="i"  @tap="$nav({ url: '/pages/tabbar/road/road-guest?type=1&id='+ s.partyId })">
					<view class="l-siv-avatar l-siv-avatar-company">
						<image class="l-siv-img" src="../../../static/gongsi@2x.png" mode="aspectFill"></image>
					</view>
					<view class="l-siv-name">
						{{ s.partyShortName }}
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="l-scroll-tag-posi" :class="{ 'l-scroll-tag-fixed': isFixed }">
			<scroll-view class="l-scroll-item l-scroll-tag" scroll-x="true" >
				<view class="l-si-item" @tap="selectTag(null, 0)"
				:class="{ 'l-si-active': tagIndex == 0 }" >
					全部
				</view>
				<view class="l-si-item" @tap="selectTag(s,i + 1)"
				:class="{ 'l-si-active': tagIndex == i + 1 }" v-for="(s, i) in labelList" :key="i">
					{{ s.name }}
				</view>
			</scroll-view>
		</view>
		
		
		<view class="l-body-view l-body-view-3">
			<road-list v-for="(s,i) in dataList" :dataInfo="s" @tap="$nav({url: '/pages/tabbar/road/road-details?id=' + s.id})" :key="i"></road-list>
		</view>
		<view class="example-body">
			<uni-load-more :status="status" />
		</view>
		
		<!-- #ifdef H5 -->
		<!-- <navgo-login keys="bottom" :value="navLoginBottom"></navgo-login> -->
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<!-- <navgo-login keys="bottom" value="0"></navgo-login> -->
		<!-- #endif -->
	</view>
</template>

<script>
	import roadList from '../tabbar/componens/road-list.vue';
	
	export default{
		components:{
			roadList
		},
		data(){
			return {
				tagIndex: 0,
				hotIndex: 0,
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
				dataList: [],
				bannerList: [],
				labelList: [],
				orgList:[],
				menuTop: 0,
				bottom: 100,
				isFixed:false,
				presenterList:[],
				tagInterval: null
			}
		},
		onLoad() {
			this.init();
		},
		onReady() {
			if(this.platform != 'android'){
				setTimeout(() => {
					this.getMenuTop()
				},500)
			}
		},
		computed:{
			navLoginBottom(){
				return this.$store.getters.navLoginBottom
			},
			platform(){
				return this.$platform
			}
		},
		onPageScroll(e) {
			if(this.platform != 'android'){
				let top = e.scrollTop;
				if(top >= this.menuTop){
					if(!this.isFixed){
						this.isFixed = !this.isFixed
					}
				}else{
					if(this.isFixed){
						this.isFixed = !this.isFixed
					}
				}
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
				this.roadListFn();
			}
		},
		methods:{
			/*
			* 
			*/
			init(){
				this.roadBannerFn();
				this.roadLabelFn();
				this.hotOrgListFn();
				this.hotPresenterListFn();
				this.roadListFn();
			},
			getMenuTop(){
				let _this = this;
				let query = uni.createSelectorQuery(_this);
				query
				.select('.l-scroll-tag-posi')
				.boundingClientRect(res => {
					if(res.top){
						_this.menuTop = res.top
					}
				}).exec()
			},
			/*
			* 
			*/
			selectTag(s, i){
				if(this.tagIndex == i){
					return
				}
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.tagInterval = null;
				this.tagIndex = i;
				this.dataList = [];
				this.selectTagRoadListFn();
			},
			/*
			* 
			*/
			roadBannerFn(){
				let _this = this;
				let params = { pageType: 11 };
				let url = 'recourse/banner/list';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						_this.bannerList = info;
					}
				})
			},
			/*
			* 
			*/
			hotPresenterListFn(){
				let _this = this;
				let params = {};
				let url = 'roadShow/hotUsers';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						info.forEach(e => {
							if(!e.headPortrait)
								e.headPortrait =  '../../../static/ren@2x.png';
						})
						_this.presenterList = info;
					}
				})
			},
			/*
			* 
			*/
			hotOrgListFn(){
				let _this = this;
				let params = {};
				let url = 'roadShow/hotOrgs';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						
						_this.orgList = info;
					}
				})
			},
			/*
			* 
			*/
			roadLabelFn(){
				let _this = this;
				let params = {};
				let url = 'roadShow/labels';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						
						_this.labelList = info;
					}
				})
			},
			/*
			* 
			*/
		   selectTagRoadListFn(){
			   this.params['pageInfo.pageIndex'] = 1;
			   this.roadListFn();
		   },
			/*
			* 
			*/
			roadListFn(){
				let _this = this;
				let params = _this.params;
				let url = 'roadShow/list';
				if(_this.tagIndex > 0){
					params.labelId = _this.labelList[_this.tagIndex - 1].id;
				}else{
					delete params.labelId;
				}
				_this.status = _this.statusOption.loading;
				_this.$get(url, params)
				.then(res => { 
					uni.hideLoading()
					if(res.code == 200){
						let info = res.content || {};
						
						_this.total = info.pageInfo && info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						
						data.forEach(e => {
							e.duration = e.showDuration ? _this.$getDuration(e.showDuration) : '00:00:01';
						})
						
						_this.dataList = _this.dataList.concat(data);
						
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				}).catch(res => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped>
	@import url("./road.css");
</style>
