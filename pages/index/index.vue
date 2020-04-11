<template>
	<view class="l-container">
		<view class="l-posi-parent" :class="{ 'l-posi-ab': isTitleNav }" @tap="$nav({ url: '/pages/search/search' })">
			<view class="l-posi-static">
				<span class="l-icon l-icon-search"></span>
				<view class="l-input">
					<span class="l-input-1">复胜富盛一号</span>
					<span class="l-input-2">累计收益</span>
					<span class="l-input-3">80.53%</span>
				</view>
				<span class="l-icon l-icon-go"></span>
			</view>
		</view>
		
		<view class="l-titleNView">
			<view class="l-titleNView-bg">
				<span class="l-icon l-icon-message" @tap="$nav({url:'/pages/notification/notification'})">
					<view class="ubt">{{ubt}}</view>
				</span>
			</view>
			<view class="l-titleNView-place"></view>
		</view>
		
		<view class="l-flex l-flex-jc_c" @tap="$nav({ url: '/pages/search/search' })">
			<view class="l-posi-static l-posi-search">
				<span class="l-icon l-icon-search"></span>
				<view class="l-input l-flex l-flex-ai_c">
					<span class="l-input-1">复胜富盛一号</span>
					<span class="l-input-2">累计收益</span>
					<span class="l-input-3">80.53%</span>
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
					<view @tap="$nav({url:'/pages/finance-report/finance-report'})">
						<image src="../../static/22@2x.png" mode="aspectFill"></image>
						<text>财经早报</text>
					</view>
					<view @tap="$nav({url:'/pages/ranking/ranking'})">
						<image src="../../static/11@2x.png" mode=""></image>
						<text>产品排行</text>
					</view>
					<view>
						<image src="../../static/666@2x.png" mode=""></image>
						<text>路演直播</text>
					</view>
					<view @tap="$nav({url:'/pages/personal-card/personal-card'})">
						<image src="../../static/44@2x.png" mode=""></image>
						<text>我的名片</text>
					</view>
				</view>
				<view class="uni-flex l-tab l-flex-jc_sa l-mt">
					<view @tap="$nav({url:'/pages/feedback/feedback'})">
						<image src="../../static/66@2x.png" mode="aspectFill"></image>
						<text>私募学堂</text>
					</view>
					<view @tap="$nav({url:'/pages/approve/approve'})">
						<image src="../../static/77@2x.png" mode=""></image>
						<text>资产助手</text>
					</view>
					<view @tap="$nav({url:'/pages/cash-baby/cash-baby'})">
						<image src="../../static/88@2x.png" mode=""></image>
						<text>活期理财</text>
					</view>
					<view @tap="$nav({url:'/pages/attention/attention'})">
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
							王老师分享财经早报，获得5个关注
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
						<view class="subao">
							速报
						</view>
						<view class="subaoc">
							王老师分享财经早报，获得4个关注
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
						<view class="subao">
							速报
						</view>
						<view class="subaoc">
							王老师分享财经早报，获得3个关注
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- <view class="l-flex l-flex-jc_c l-flex-ai_c subaoh">
				<view class="subao">
					速报
				</view>
				<view class="subaoc">
					王老师分享财经早报，获得5个关注
				</view>
			</view> -->
			<view class="l-view">
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
			</view>
			
			<view class="l-view">
				<view class="product_all pl pr">
					<view class="l-flex l-flex-jc_sb l-flex-ai_c product_all_t">
						<view class="titleleft">
							产品精选
						</view>
						<view class="titlemore">
							更多
						</view>
					</view>
				</view>
				
				<view class="product_all_list">
					<view v-for="(item,index) in productFeature" :key='index'>
						<view class="l-flex top" :class="{topmt:index!=0}">
							<view class="l">
								{{item.name}}
							</view>
							<view class="m" v-if="item.tag1">
								{{item.tag1}}
							</view>
							<view class="r" v-if="item.tag2">
								{{item.tag2}}
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
							<text>{{item.netchange}}</text>
							<text>{{item.latestnet}}</text>
							<text :class="{'red':item.earnings>0,'green':item.earnings<0}">{{item.earnings}}%</text>
						</view>
						<view class="l-flex l-flex-jc_sb bottom l-bb">
							<text>理财师</text>
							<text>净值(03-27)</text>
							<text>近一年涨幅</text>
						</view>
					</view>
				</view>
				<view class="hyp" @click="getProductfeature(2)">
					换一批
				</view>
			</view>
			
			<view class="l-view">
				<view class="zxzk pl pr">
					<view class="uni-flex l-flex-jc_sb">
						<view class="titleleft">
							总管精选
						</view>
						<view class="uni-flex">
							<view class="l-ib" v-for="(v,i) in zxzklabelList" :key="i" :class="{'l-ib-actived': zxzklabelListIndex == i}" @tap="zxzkTab(v.id,i)">{{v.name}}</view>
						</view>
					</view>
					<view class="uni-flex l-zb l-flex-jc_sb l-bb zxzkpb" v-for="(v,i) in mainFeature" :key='i'>
						<view class="l-flex l-flex-direction l-flex-jc_sb">
							<view class="lt-zx">{{v.content}}</view>
							<view class="lh"><text class="ltmr">{{v.title}}</text><text>{{v.time}}</text></view>
						</view>
						<image :src="v.img" mode="aspectFill"></image>
					</view>
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
				
				productFeature:[{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'+6.88',
				latestnet:'1.4530',
				netchange:'风车车',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'-99.90',
				latestnet:'1.4530',
				netchange:'风车车',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'0.00',
				latestnet:'1.4530',
				netchange:'汤姆',
				time:'03-24 12:00'
				}],//产品精选
				
				title: '首页',
				//总管精选tab
				zxzklabelList:[
					{name:'独家解读',id:0},
					{name:'大咖专访',id:1},
					{name:'总管商学院',id:2},
					/* {name:'全部',id:3}, */
					],
				zxzklabelListIndex:0,
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
				
				popupShow:false
			}
		},
		onLoad() {
			//console.log('开启');
		},
		created() {
			this.getSwiper();
			this.getProductfeature();
			this.getMainfeature(3);
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
		methods: {
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
			//总管精选切换
			zxzkTab(id,index){
				this.zxzklabelListIndex = index;
				this.getMainfeature(id)
			},
			//获取产品精选
			getProductfeature(page){
				this.$post('getProductFeature',{
					page
				}).then(data=>{
					//this.productFeature = data;
				}).catch(err=>{
					this.$toast(JSON.stringify(err));
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
			}
			
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>
