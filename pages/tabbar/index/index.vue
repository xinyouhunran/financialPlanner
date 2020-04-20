<template>
	<view class="l-container">
		<view class="l-titleNView">
			<view class="l-titleNView-bg"></view>
			<view class="l-titleNView-fixed" :style="'background-color: rgba('+ rgba +');'">
				<view class="l-status"></view>
				<view class="l-titleNView-content l-flex l-flex-ai_c">
					<view class="l-titleNView-nav l-flex l-flex-ai_c" >
						<text class="l-icon l-icon-gth" @tap="$nav({ url: '/pages/regards/regards' })"></text>
						<view @tap="$nav({ url: '/pages/search/search' })"
						class="l-titleNView-form l-flex l-flex-ai_c l-flex-1" >
							<text class="l-icon l-icon-search"></text>
							<input disabled class="l-titleNView-input l-flex-1" type="text" placeholder="请输入基金/经理/公司名称搜索" />
						</view>
						<text class="l-icon l-icon-mine" @tap="$nav({url:'/pages/mine/mine'})"></text>
					</view>
				</view>
			</view>
			<view class="l-titleNView-place"></view>
			<view class="l-flex l-flex-ai_c-jc_c" >
				<swiper class="l-swiper" indicator-active-color="#ffffff" indicator-color="#9A999E" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(s, i) in bannerList" :key="i" >
						<view class="swiper-item" @tap="bannerNav(s, i)">
							<image class="l-swiper-img" :src="s.picUrl ? s.picUrl : '../../../static/index/20200113093940.png'" mode="scaleToFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="l-menu l-flex l-flex-jc_sa l-flex-ai_c" >
			<view class="l-menu-item" @tap="$nav({ url: '/pages/tabbar/direct/direct' }, 'switchTab')">
				<view class="">
					<image class="l-menu-icon" src="../../../static/index/zhitui@2x.png" mode="aspectFill"></image>
				</view>
				<view class="l-menu-title">
					官方直推
				</view>
			</view>
			
			<view class="l-menu-item" @tap="$nav({ url: '/pages/tabbar/pred/pred' }, 'switchTab')">
				<view class="">
					<image class="l-menu-icon" src="../../../static/index/ranking@2x.png" mode="aspectFill"></image>
				</view>
				<view class="l-menu-title">
					排行
				</view>
			</view>
			<view class="l-menu-item" @tap="$nav({ url: '/pages/tabbar/road/road' }, 'switchTab')">
				<view class="">
					<image class="l-menu-icon" src="../../../static/index/roadShow@2x.png" mode="aspectFill"></image>
				</view>
				<view class="l-menu-title">
					路演
				</view>
			</view>
			<view class="l-menu-item" @tap="$nav({ url: '/pages/tabbar/windzxsh/windzxsh' }, 'switchTab')">
				<view class="">
					<image class="l-menu-icon" src="../../../static/index/windzxsh@2x.png" mode="aspectFill"></image>
				</view>
				<view class="l-menu-title">
					资讯动态
				</view>
			</view>
		</view>
		
		<view class="l-body">
			
			<view class="l-content">
				<view class="l-head">
					<span class="l-head-text">
						最新排行 <span class="l-head-text-sub">| 近30天</span>
					</span>
					<span class="l-menu-mask"></span>
				</view>
				<view class="l-list l-list-padding-top">
					<ranking :dataList="predList"></ranking>
					
					<view class="l-list-more" @tap="$nav({ url: '/pages/tabbar/pred/pred' }, 'switchTab')">
						<text>更多排行</text>
						<text class="l-icon-more"></text>
					</view>
				</view>
			</view>
			
			<view class="l-content">
				<view class="l-head">
					<text class="l-head-text">优选基金</text>
					<span class="l-menu-mask"></span>
				</view>
				<view class="l-list">
					<fund :dataInfo="s" v-for="(s,i) in superList" :key="i"></fund>
					
					<view class="l-list-more" @tap="$nav({ url: '/pages/tabbar/pred/pred' }, 'switchTab')">
						<text>更多基金</text>
						<text class="l-icon-more"></text>
					</view>
				</view>
			</view>
			
			<view class="l-content">
				<view class="l-head">
					<text class="l-head-text">最新路演</text>
					<span class="l-menu-mask"></span>
				</view>
				<view class="l-list l-list-padding-top">
					<road-show v-for="(s,i) in roadList" :dataInfo="s" :key="i"></road-show>
					
					<view class="l-list-more" @tap="$nav({ url: '/pages/tabbar/road/road' }, 'switchTab')">
						<text>更多路演</text>
						<text class="l-icon-more"></text>
					</view>
				</view>
			</view>
			
			<view class="l-content">
				<view class="l-head">
					<text class="l-head-text">资讯快报</text>
					<span class="l-menu-mask"></span>
				</view>
				<view class="l-list l-list-padding-top">
					<windzxsh v-for="(s,i) in windzxshList" :isImg="true" :dataInfo="s"  :key="i"></windzxsh>
					
					<view class="l-list-more" @tap="$nav({ url: '/pages/tabbar/windzxsh/windzxsh' }, 'switchTab')">
						<text>更多资讯</text>
						<text class="l-icon-more"></text>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="l-foot">
			<project-footer></project-footer>
		</view>
	</view>
</template>

<script>
	import fund from '../componens/fund.vue';
	import roadShow from '../componens/road-show.vue';
	import windzxsh from '../componens/windzxsh.vue';
	import ranking from '../componens/ranking.vue';
	import projectFooter from '@/components/project-footer/project-footer.vue'
	
	export default {
		components:{
			fund,roadShow,windzxsh,projectFooter,ranking
		},
		data() {
			return {
				rgbColor:[0,0,0,0],
				isRgba: false,
				roadList: [],
				predList: [],
				bannerList: [],
				superList: [],
				windzxshList: []
			}
		},
		onLoad() {
			this.init()
		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration:50
			})
		},
		watch:{
			qualified(){
				this.rankingSimple();
				this.superProduceFn();
			}
		},
		computed:{
			rgba(){
				return this.rgbColor.join(',')
			},
			hasLogin(){
				return this.$store.getters.hasLogin
			},
			qualified(){
				return this.$store.getters.qualified
			}
		},
		onPageScroll(e) {
			let top = e.scrollTop;
			if(top  > 20){
				if(!this.isRgba){
					this.$set(this.rgbColor, 3, 1);
					this.isRgba = !this.isRgba;
				}
			}else{
				if(this.isRgba){
					this.$set(this.rgbColor, 3, 0);
					this.isRgba = !this.isRgba;
				}
			}
			
		},
		methods: {
			init(){
				this.bannerListFn();
				this.roadListFn();
				this.hotWindFun();
				this.rankingSimple();
				this.superProduceFn();
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
						
						_this.windzxshList = info;
					}
				})
			},
			bannerListFn(){
				let _this = this;
				let params = { pageType: 8 };
				let url = 'recourse/banner/list';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						
						_this.bannerList = info;
					}
				})
			},
			superProduceFn(){
				let _this = this;
				let params = { 
					'pageInfo.pageSize': 3,
					'pageInfo.pageIndex': 1,
					labelId : 13
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
			/*
			* 获取排行榜数据
			*/
			rankingSimple(){
				let _this = this;
				let params = {
					'pageInfo.pageSize': 5,
					'pageInfo.pageIndex': 1
				}
				
				params.searchInterval = '1';
				
				let url = 'business/rankingSimple';
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list || [];
						
						_this.predList = data;
						
					}
				})
			},
			/*
			* 
			*/
			roadListFn(){
				let _this = this;
				let params = { 
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 3
				};
				let url = 'roadShow/list';
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						
						_this.total = info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						
						data.forEach(e => {
							if(e.showDate)
								e.date = _this.$dateDiff(+new Date(e.showDate.replace(/-/g,'/')));
						})
						
						_this.roadList = data;
						
					}
				})
			},
			bannerNav(s, i){
				if(s.link){
					window.location.href = s.link;
				}
			}
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>

