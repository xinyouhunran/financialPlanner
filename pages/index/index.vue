<template>
	<view class="l-container">
		<view class="l-posi-parent" :class="{ 'l-posi-ab': isTitleNav }" @tap="goSearch">
			<view class="l-posi-static">
				<span class="l-icon l-icon-search"></span>
				<view class="l-input">
					<span class="l-input-2">搜索基金产品</span>
					<!-- <span class="l-input-2">累计收益</span>
					<span class="l-input-3">80.53%</span> -->
				</view>
				<span class="l-icon l-icon-go"></span>
			</view>
		</view>
		
		<view class="l-titleNView">
			<view class="l-titleNView-bg">
				<!-- <span class="l-icon l-icon-message" @tap="$nav({url:'/pages/notification/notification'})">
					<view class="ubt">{{ubt}}</view>
				</span> -->
			</view>
			<view class="l-titleNView-place"></view>
		</view>
		
		<view class="l-flex l-flex-jc_c" @tap="goSearch">
			<view class="l-posi-static l-posi-search">
				<span class="l-icon l-icon-search"></span>
				<view class="l-input l-flex l-flex-ai_c">
					<span class="l-input-2">搜索基金产品</span>
					<!-- <span class="l-input-2">累计收益</span>
					<span class="l-input-3">80.53%</span> -->
				</view>
				<span class="l-icon l-icon-go"></span>
			</view>
		</view>
		
		<view class="l-flex l-flex-jc_c l-swiper">
			<uni-swiper-dot :info="info" :current="current" :dotsStyles="dotsStyles" :mode="mode">
			    <swiper class="swiper-box" @change="change" autoplay="true" interval="3000">
			        <swiper-item v-for="(item ,index) in info" :key="index">
			            <view class="swiper-item">
			               <image :src="item.picUrl" mode="aspectFill"></image>
			            </view>
			        </swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view>
		
		<view class="l-view l-view-mt">	
			
			<view class="uni-flex uni-column ptb">
				<view class="uni-flex l-tab l-flex-jc_sa">
					<view @tap="goCashBaby">
						<image src="../../static/88@2x.png" mode=""></image>
						<text>活期理财</text>
					</view>
					<view @tap="goFinanceReport">
						<image src="../../static/22@2x.png" mode="aspectFill"></image>
						<text>财经早报</text>
					</view>
					<view @tap="goProductRank">
						<image src="../../static/11@2x.png" mode=""></image>
						<text>基金排行</text>
					</view>
					<view @tap="$toast('暂未开放此功能')">
						<image src="../../static/44@2x.png" mode=""></image>
						<text>我的名片</text>
					</view>
				</view>
				<view class="uni-flex l-tab l-flex-jc_sa l-mt">
					<view @tap="goPrivateSchool">
						<image src="../../static/66@2x.png" mode="aspectFill"></image>
						<text>高端理财</text>
					</view>
					<view @tap="$nav({ url: '/pages/earnings/earnings' })">
						<image src="../../static/77@2x.png" mode=""></image>
						<text>资产助手</text>
					</view>
					<view @tap="$nav({url:'/pages/road/road'})">
						<image src="../../static/666@2x.png" mode=""></image>
						<text>路演直播</text>
					</view>
					<view @tap="goMyChioce">
						<image src="../../static/10@2x.png" mode=""></image>
						<text>我的自选</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="featured_products">
			<swiper class="swiper subaoh" :autoplay="true" interval="3000" :vertical="true" :circular="true">
				<swiper-item>
					<view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
						<view class="subao">
							速报
						</view>
						<view class="subaoc">
							王**分享财经早报，获得6个关注
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
						<view class="subao">
							速报
						</view>
						<view class="subaoc">
							刘**分享财经早报，获得8个关注
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
						<view class="subao">
							速报
						</view>
						<view class="subaoc">
							李**分享财经早报，获得5个关注
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
						<view class="subao">
							速报
						</view>
						<view class="subaoc">
							张**分享财经早报，获得4个关注
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
						<view class="subao">
							速报
						</view>
						<view class="subaoc">
							赵**分享财经早报，获得9个关注
						</view>
					</view>
				</swiper-item>
			</swiper>

			<!-- <view class="l-view">
				<view class="sentiment-all pl pr">
					<view class="l-flex l-flex-jc_sb l-flex-ai_c product_all_t">
						<view class="titleleft">
							人气爆款
						</view>
						<view class="titlemore">
							刷新
						</view>
					</view>
				</view>
				
				<view class="sentiment">
					<view class="l-flex l-flex-jc_sb l-flex-ai_c l-bb sentiment-item">
						<view class="sentiment-l">
							<image src="../../static/zhexian@2x.png" mode=""></image>
						</view>
						<view class="sentiment-m">
							<view class="">
								+6.88%
							</view>
							<view class="">
								近一年收益率
							</view>
						</view>
						<view class="sentiment-r">
							<view class="">
								<span>收益加倍</span>
							</view>
							<view class="">
								<span>国连安基金</span>
							</view>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb l-flex-ai_c l-bb sentiment-item">
						<view class="sentiment-l">
							<image src="../../static/zhexian@2x.png" mode=""></image>
						</view>
						<view class="sentiment-m">
							<view class="">
								+6.88%
							</view>
							<view class="">
								近一年收益率
							</view>
						</view>
						<view class="sentiment-r">
							<view class="">
								<span>收益加倍</span>
							</view>
							<view class="">
								<span>广发稳健长…</span>
							</view>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb l-flex-ai_c l-bb sentiment-item">
						<view class="sentiment-l">
							<image src="../../static/zhexian@2x.png" mode=""></image>
						</view>
						<view class="sentiment-m">
							<view class="">
								+6.88%
							</view>
							<view class="">
								近一年收益率
							</view>
						</view>
						<view class="sentiment-r">
							<view class="">
								<span>收益兼备</span>
							</view>
							<view class="">
								<span>广发稳健长大</span>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			
			<view class="l-view">
				<view class="thezone-all pl pr">
					<view class="l-flex l-flex-jc_sb l-flex-ai_c product_all_t">
						<view class="titleleft">
							iFund专区
						</view>
						<view class="titlemore">
							
						</view>
					</view>
				</view>
				<view class="thezone">
					<view class="l-flex l-flex-ai_c l-bb thezone-item" @tap="goCastSurely">
						<view class="thezone-l">
							<image src="../../static/dtzq.png" mode=""></image>
						</view>
						<view class="thezone-r">
							<view class="">
								定投专区
							</view>
							<view class="">
								每次小投入，终身大收益
							</view>
						</view>
					</view>
					<view class="l-flex l-flex-ai_c thezone-item" @tap="goSteady">
						<view class="thezone-l">
							<image src="../../static/wjzq.png" mode=""></image>
						</view>
						<view class="thezone-r">
							<view class="">
								稳健专区
							</view>
							<view class="">
								稳健理财，安心享收益
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="l-view">
				<view class="product_all pl pr">
					<view class="l-flex l-flex-jc_sb l-flex-ai_c product_all_t">
						<view class="titleleft">
							产品精选
						</view>
						<view class="titlemore" @tap="goPrivateSchool">
							更多
						</view>
					</view>
				</view>
				
				<view class="product_all_list">
					<view v-for="(item,index) in productFeature" :key='index' @tap="$nav({url:`/pages/product-details/product-details?id=${item.securityId}`})">
						<view class="l-flex top" :class="{topmt:index!=0}">
							<view class="l">
								{{item.secShortName}}
							</view>
							<view class="m" v-if="item.fav">
								精选
							</view>
							<view class="r" v-if="item.investStrategy">
								{{item.investStrategy}}
							</view>
						</view>
						<view class="l-flex middle">
							<!-- <template v-if="item.earnings>0">
								<text class="red">{{item.earnings}}%</text>
							</template>
							<template v-else-if="item.earnings<0">
								<text class="green">{{item.earnings}}%</text>
							</template>
							<template v-else>
								<text>{{item.earnings}}%</text>c
							</template> -->
							<text>{{item.userName}}</text>
							<text>{{item.nav}}</text>
							<text :class="{'red':Number(item.returnRateYtd)>0,'green':Number(item.returnRateYtd)<0}">{{item.returnRateYtd=='认证可'?'认证可见':item.returnRateYtd+'%'}}</text>
						</view>
						<view class="l-flex l-flex-jc_sb bottom l-bb">
							<text>理财师</text>
							<text>净值{{item.endDateDay}}</text>
							<text>近一年涨幅</text>
						</view>
					</view>
				</view>
				<view class="hyp" @click="getProductfeature()">
					换一批
				</view>
			</view>
			
			<view class="l-view">
				<view class="zxzk pl pr">
					<view class="uni-flex l-flex-jc_sb">
						<view class="titleleft">
							iFund精选
						</view>
						<scroll-view class="my-scroll" scroll-x="true">
							<view class="l-ib" v-for="(v,i) in zxzklabelList" :key="i" :class="{'l-ib-actived': zxzklabelListIndex == v.cateId}" @tap="zxzkTab(v.cateId,i)">{{v.name}}</view>
						</scroll-view>
					</view>
					<view class="uni-flex l-zb l-flex-jc_sb l-bb zxzkpb" v-for="(v,i) in windzxshList" :key='i' @tap="$nav({ url: '/pages/tabbar/windzxsh/windxsh-details?id='+ v.id + '&type='+ v.type })">
						<view class="l-flex l-flex-direction l-flex-jc_sb">
							<view class="lt-zx">{{v.title}}</view>
							<view class="lh"><text class="ltmr">{{v.source}}</text><text>{{v.publishTime}}</text></view>
						</view>
						<image src="../../static/1577935511@2x.png" mode="aspectFill"></image>
					</view>
					<uni-load-more :status="status" />
					<!-- <view class="watch-more">
						点击查看更多
					</view> -->
				</view>
			</view>
			
		</view>	
		
		<compliance-certification v-if="popupShow"></compliance-certification>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {geth5} from '@/utils/geth5.js'	
	export default {
		data() {
			return {
				isTitleNav:false,//控制吸顶显示
				ubt:'7',//未读消息数
				//控制轮播图
				info: [{
					content: '../../static/banner@2x.png'
				}, {
					content: '../../static/banner@2x.png'
				}, {
					content: '../../static/banner@2x.png'
				}],
				current: 0,
				mode: 'round',
				dotsStyles:{
					width:5,
					selectedBackgroundColor:'#fff',
					height:5,
					border:'none',
					selectedBorder:'none',
					bottom:10
				},
				
				productFeature:[],//产品精选
				productPageIndex:1,
				
				title: '首页',
				//总管精选tab
				zxzklabelList:[
					{name:'独家解读',id:15},
					{name:'大咖专访',id:16},
					{name:'ifund商学院',id:17},
					/* {name:'全部',id:3}, */
					],
				zxzklabelListIndex:15,
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
				tagInterval: null,
				total:0,
				windzxshList: [],
				
				mainFeature:[{
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'一小时前',
				img:'../../static/1577935511@2x.png',
				},{
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'一小时前',
				img:'../../static/1577935511@2x.png',
				},{
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'一小时前',
				img:'../../static/1577935511@2x.png',
				}],
				
				popupShow:false,
				
				userId:'',
				pageInfo:{
					pageIndex:1,
					pageSize:10
				},
			}
		},
		computed:{
			...mapState({
				hasLogin:'hasLogin',
				qualified:'qualified',
				user:'user'
			})
		},	
		onLoad() {
			if(typeof this.$getStorage('user')==='object'){
				let user = this.$getStorage('user').userInfo;
				this.userId = user.id;				
			}else{
				this.userId = ''
			}
			console.log(this.userId);
			this.init();
		},
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin
			},
			qualified(){
				return this.$store.getters.qualified
			}
		},
		watch:{
			qualified(){
				this.productPageIndex = 1;
				this.getProductfeature();
			}
		},
		onPageScroll(e) {
			let top = e.scrollTop;
			if (top > 48) {
				if (!this.isTitleNav) {
					this.isTitleNav = !this.isTitleNav
				}
			} else {
				if (this.isTitleNav) {
					this.isTitleNav = !this.isTitleNav
				}
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
		methods: {
			init(){
				this.getSwiper();
				this.getProductfeature();
				this.windzxshLabelFn();
				//this.windzxshFn(this.zxzklabelListIndex)
			},
			//获取轮播
			getSwiper(){
				let url = "/recourse/banner/list";
				this.$get(url,{
					pageType:8,
				}).then(data=>{
					this.info = data && data.content;
				}).catch(err=>{
					this.$toast(JSON.stringify(err));
				})
			},
			//轮播切换
			change(e) {
				this.current = e.detail.current;
			},
			windzxshLabelFn(){
				let _this = this;
				let params = {};
				let url = 'news/newsCate';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						
						_this.zxzklabelList = info;
						_this.zxzklabelListIndex = info[0].cateId;
						console.log(_this.zxzklabelList);
						_this.windzxshFn(_this.zxzklabelListIndex);
					}
				})
			},
			//总管精选切换
			zxzkTab(id){
				this.zxzklabelListIndex = id;
				//this.getMainfeature(id)
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.tagInterval = null;
				this.tagIndex = id;
				this.params['pageInfo.pageIndex'] = 1;
				this.windzxshList = [];
				this.windzxshFn(id);
			},
			windzxshFn(id){
				let _this = this;
				let params = JSON.parse(JSON.stringify(_this.params));
				/* let label = this.labelList[this.tagIndex] || {}
				if(label.cateId){
					params.cateId = label.cateId
				} */
				params.cateId = id;
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
			},
			//获取产品精选
			getProductfeature(){
				
				let params = { 
					'pageInfo.pageSize': 3,
					'pageInfo.pageIndex': this.productPageIndex,
					labelId : 13
				};
				let url = 'business/superProduce';
				uni.showLoading({
					title:'加载中...'
				})
				this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list.map(item=>{
							item.nav = item.nav!='认证可见'?item.nav.padEnd(6,'0'):item.nav;
							item.returnRateYtd = item.returnRateYtd.slice(0,-1);
							if(item.endDate&&item.endDate!='认证可见'){
								let d = new Date(item.endDate);
								item.endDateDay = [d.getMonth() + 1, d.getDay()].map(e => e > 9 ? e : '0' + e).join('-');
							}else{
								item.endDateDay = ''
							}
							return item;
						}) || [];
						
						if(data.length){
							this.productFeature = data;
							++this.productPageIndex;
						}else{
							this.$toast('没有更多数据了')
						}
						uni.hideLoading();
					}
				})
			},
			//获取总管精选
			getMainfeature(id){
				this.$post('getMainFeature',{
					id
				}).then(data=>{
					//this.mainFeature = data;
				}).catch(err=>{
					this.$toast(JSON.stringify(err));
				})
			},
			
			goH5(flag,gourl){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;				
				}else{
					this.userId = ''
				}
				if(this.userId){
					geth5(flag,this.userId
					).then(data=>{
						this.$nav({url:`${gourl}?webSrc=${data}`})
					}).catch(err=>{
						/* if(err=='307'){
							this.$nav({url:'/pages/register/register'})
						} */
					})
				}else{				
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({url:'/pages/register/register'})
							},3000)
						}
					});
				}	
			},
			goCashBaby(){
				this.goH5('8','/pages/cash-baby/cash-baby')		
			},
			goProductRank(){
				this.goH5('17','/pages/product-rank/product-rank')		
			},
			goPrivateSchool(){
				this.goH5('5','/pages/private-school/private-school')	
			},
			goMyChioce(){
				this.goH5('7','/pages/my-choice/my-choice')	
			},
			goCastSurely(){
				this.goH5('15','/pages/cast-surely/cast-surely')	
			},
			goSteady(){
				this.goH5('4','/pages/steady/steady')
			},
			goSearch(){
				this.goH5('6','/pages/search/search')
			},
			goMinePage(gourl){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;				
				}else{
					this.userId = ''
				}
				if(this.userId){
					geth5('5',this.userId
					).then(data=>{
						this.$nav({url:`${gourl}`})
					}).catch(err=>{
						/* if(err=='307'){
							this.$nav({url:'/pages/register/register'})
						} */
					})
				}else{				
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({url:'/pages/register/register'})
							},3000)
						}
					});
				}	
			},
			goFinanceReport(){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;				
				}else{
					this.userId = ''
				}
				if(this.userId){
					this.$post('cms/dailyFinanceNews',{
						userId:this.userId,
						pageInfo:this.pageInfo
					}).then(data=>{
						//console.log(data);
						if(data.code=='309'){
							this.$nav({url:'/pages/personal-card/person-edit?personalFlag=1'})	
						}else{
							this.$nav({url:'/pages/finance-report/finance-report'}); 
						}
					}).catch(err=>{
						this.$toast(JSON.stringify(err));
					})
				}else{				
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({url:'/pages/register/register'})
							},3000)
						}
					});
				}	
				
			}
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>
