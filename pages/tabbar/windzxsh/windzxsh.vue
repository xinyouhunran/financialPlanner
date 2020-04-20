<template>
	<view class="l-container">
		<view class="l-thead">
			<view class="l-titleNView">
				<view class="l-titleNView-content">
					<view class="l-t-form">
						资讯
					</view>
					<text class="l-icon l-icon-search" @tap="$nav({ url: '/pages/tabbar/windzxsh/windzxsh-search' })"></text>
					<!-- <text class="l-icon l-icon-shu" @tap="$nav({ url: '/pages/tabbar/windzxsh/windzxsh-history' })"></text> -->
				</view>
			</view>
			<view class="l-titleNView-place"></view>
		</view>
		
		<view class="l-scroll-tag-posi" >
			<scroll-view class="l-scroll-item" scroll-x="true" >
				
				<view class="l-si-item" @tap="selectTag(s,i)"
				:class="{ 'l-si-active': tagIndex == i }" v-for="(s, i) in labelList" :key="i">
					{{ s.name }}
				</view>
			</scroll-view>
		</view>
		<view style="opacity: 0;">
			<scroll-view class="l-scroll-item" scroll-x="true" >
				
				<view class="l-si-item" @tap="selectTag(s,i)"
				:class="{ 'l-si-active': tagIndex == i }" v-for="(s, i) in labelList" :key="i">
					{{ s.name }}
				</view>
			</scroll-view>
		</view>
		
		
		<view class="l-body-view l-body-view-3">
			<image class="l-img-body-banners"  src="../../../static/zixun.669c3cc3.jpg" mode="aspectFill"></image>
			<windzxsh v-for="(s,i) in windzxshList" :dataInfo="s"  :key="i"></windzxsh>
		</view>
		<view class="example-body">
			<uni-load-more :status="status" />
		</view>
		
		<!-- #ifdef H5 -->
		<navgo-login keys="bottom" :value="navLoginBottom"></navgo-login>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<navgo-login keys="bottom" value="0"></navgo-login>
		<!-- #endif -->
	</view>
</template>

<script>
	import navgoLogin from '@/components/navgo-login/navgo-login.vue'
	import windzxsh from '../componens/windzxsh.vue';
	
	export default{
		components:{
			navgoLogin,windzxsh
		},
		data(){
			return {
				tagIndex: 0,
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
				tagInterval: null,
				windzxshList: [],
				labelList: ['全部', '研究报告','行业报告','独家报道','大咖专访','总管商学院']
			}
		},
		onLoad() {
			this.init();
		},
		computed:{
			navLoginBottom(){
				return this.$store.getters.navLoginBottom
			}
		},
		onReachBottom() {
			let pageInfo = this.params;
			let list = this.windzxshList;
			let pageIndex = pageInfo['pageInfo.pageIndex'];
			let pageSize = pageInfo['pageInfo.pageSize'];
			let total = this.total;
			let length = pageIndex * pageSize;
			if(length < total && list.length === length){
				++this.params['pageInfo.pageIndex']
				this.windzxshFn();
			}
		},
		methods:{
			/*
			* 
			*/
			init(){
				this.windzxshLabelFn();
			},
			previewImage(url){
				uni.previewImage({
					urls:[url]
				})
			},
			/*
			* 
			*/
			selectTag(s, i){
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.tagInterval = null;
				this.tagIndex = i;
				this.params['pageInfo.pageIndex'] = 1;
				this.windzxshList = [];
				this.windzxshFn();
			},
		
			/*
			* 
			*/
			windzxshLabelFn(){
				let _this = this;
				let params = {};
				let url = 'news/newsCate';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						
						_this.labelList = info;
						_this.windzxshFn();
					}
				})
			},
			
			/*
			* 
			*/
			windzxshFn(){
				let _this = this;
				let params = JSON.parse(JSON.stringify(_this.params));
				let label = this.labelList[this.tagIndex] || {}
				if(label.cateId){
					params.cateId = label.cateId
				}
				let url = 'news/pageList';
				
				_this.status = _this.statusOption.loading;
				_this.$get(url, params)
				.then(res => { 
					uni.hideLoading()
					if(res.code == 200){
						let info = res.content || {};
						
						_this.total = info.pageInfo && info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						
						_this.windzxshList = _this.windzxshList.concat(data);
						
						if(_this.windzxshList.length == _this.total){
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
	@import url("./windzxsh.css");
</style>
