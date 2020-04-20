<template>
	<view class="l-container">
		
		<view class="l-status-bar"></view>

		<view class="l-body-view l-body-view-1">
			<video class="l-video" @play="onPlay" objectFit="contain"
			:src="dataInfo.videoUrl" controls >
				<cover-image @tap="$back()" class="l-img-back" src="../../../static/mine/back@2x.png"></cover-image>
			</video>
		</view>
		
		<view class="l-tab">
			<view class="l-tab-item" @tap="tabIndex = 0">
				<span class="l-tab-span" :class="{ 'l-tab-active': tabIndex == 0 }" >简介</span>
			</view>
			<view class="l-tab-item"  @tap="tabIndex = 1">
				<span class="l-tab-span" :class="{ 'l-tab-active': tabIndex == 1 }">旗下基金</span>
			</view>
		</view>

		<swiper class="l-swiper" :current="tabIndex" @change="changeSwiper">
			<swiper-item>
				<scroll-view scroll-y="true"  class="l-scroll">
					<view class="swiper-item">
						<view class="l-body-view l-body-view-2 ">
							<view class="l-bv2-head">{{ dataInfo.title }}</view>
							<view class="l-bv-item">机 构：{{ dataInfo.orgName }}</view>
							<view class="l-bv-item">主讲人：{{ dataInfo.presenter }}</view>
							<view class="l-bv-item">时 间：{{ dataInfo.showDate }}</view>
						</view>
						
						<view class="l-body-view l-body-view-4">
							<view class="l-bv4-item" @tap="$nav({ url: '/pages/company-details/company-details?id=' + dataInfo.orgId })">
								<view class="l-siv-avatar l-siv-avatar-company">
									<image class="l-siv-img" src="../../../static/gongsi@2x.png" mode="aspectFill"></image>
								</view>
								<view class="l-bv4-txt">
									<view class="l-bv4-txt-item l-txt-hidden">{{ dataInfo.orgName }}</view>
									<view class="l-bv4-txt-item l-bv4-txt-sub l-txt-hidden">{{ dataInfo.showCount || '' }}场路演</view>
								</view>
							</view>
							<view class="l-bv4-item">
								<view class="l-siv-avatar ">
									<image class="l-siv-img" src="../../../static/ren@2x.png" mode="aspectFill"></image>
								</view>
								<view class="l-bv4-txt">
									<view class="l-bv4-txt-item l-txt-hidden">{{ dataInfo.legalRep || ''}}</view>
									<view class="l-bv4-txt-item l-bv4-txt-sub l-txt-hidden">法定代表人</view>
								</view>
							</view>
						</view>
						
						<view class="l-body-view l-body-view-3 l-body-text">
							<view class="l-bv-head">
								路演介绍
							</view>
							<view class="l-bv-body " :class="{ 'l-txt-overflow8': dataInfo.isDetail }" v-html="dataInfo.detail">
								{{ dataInfo.detail }}
							</view>
							<view class="l-bv-more" v-if="dataInfo.isDetail" @tap="dataInfo.isDetail = false">
								查看更多 <text class="l-icon l-icon-down"></text>
							</view>
						</view>
						
						<view class="l-body-view l-body-view-3 l-body-text" v-if="dataInfo.presenterIntroduce">
							<view class="l-bv-head">
								主讲介绍
							</view>
							<view class="l-bv-body" :class="{ 'l-txt-overflow8': dataInfo.isPresenter }">
								{{ dataInfo.presenterIntroduce }}
							</view>
							<view class="l-bv-more" v-if="dataInfo.isPresenter" @tap="dataInfo.isPresenter = false">
								查看更多 <text class="l-icon l-icon-down"></text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="l-scroll" @scrolltolower="loadingFundFn">
					<view class="l-sv-view">
						<!-- s.securityId -->
						<product-list @onClick="$nav({ url: '/pages/product-details/product-details?id='+s.securityId })" 
						v-for="(s,i) in dataList" :dataInfo="s" :key="i"></product-list>
						<view class="example-body" v-if="status != 'noMore'">
							<uni-load-more :status="status" />
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<view class="l-body-foot">
			<view class="l-bf-left">
				<view class="l-bfl-left" @tap="dataInfo.fav ? onRoadRemove() : onRoadAdd()">
					<span class="l-icon l-icon-collected" v-if="dataInfo.fav"></span>
					<span class="l-icon l-icon-collect" v-else></span>
					<view class="l-bfl-text">
						{{ dataInfo.fav ? '取消收藏' : '收藏' }}
					</view>
				</view>
				<view class="l-bfl-right" @tap="isShare = true">
					<span class="l-icon l-icon-share"></span>
					<view class="l-bfl-text">
						分享
					</view>
				</view>
			</view>
			<view class="l-bf-right">
				<!-- #ifdef APP-PLUS -->
				<view class="l-bfr-left" @tap="$store.dispatch('onChat',{ userId: dataInfo.uploadUserId })">
					直聊TA
				</view>
				<!-- #endif -->
				
				<view class="l-bfr-right" @tap="$nav({ url: '/pages/company-details/company-details?id=' + dataInfo.orgId })">
					进店
				</view>
			</view>
		</view>
		<share-pop @close="isShare = false" v-if="isShare" :dataInfo="dataInfo"></share-pop>
	</view>
</template>

<script>
	import productList from '../../company-details/product-list.vue';
	import sharePop from '@/components/share-pop/share-pop.vue';
	
	export default {
		components: {
			productList,
			sharePop
		},
		data() {
			return {
				tabIndex: 0,
				isShare:false,
				id: '',
				dataInfo: {},
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
				dataList: [],
				total: 0
			}
		},
		onLoad(e) {
			this.id = e.id || '';
			this.init();
		},
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin;
			}
		},
		methods: {
			init() {
				this.roadDetailFn();
			},
			/*
			 * 滑动tab
			 */
			changeSwiper(e){
				if(e.detail.source === "touch"){
					this.tabIndex = e.detail.current;
				}
			},
			/*
			 * 播放
			 */
			onPlay(){
				if(!this.hasLogin) return
				let params = { roadShowId: this.id };
				let url = 'user/center/roadShow/view';
				this.$post(url, params)
					.then(res => {
						if (res.code == 200) {}
					})
			},
			/*
			 * 收藏
			 */
			onRoadAdd(){
				if(!this.hasLogin) {
					this.$toast('您还未登录，请先登录');
					return
				}
				let _this = this;
				let params = { roadShowId: this.id };
				let url = 'user/fav/roadShow/add';
				this.$post(url, params)
					.then(res => {
						if (res.code == 200) {
							_this.$set(_this.dataInfo,'fav', !0)
						}
					})
			},
			/*
			 * 收藏
			 */
			onRoadRemove(){
				if(!this.hasLogin) {
					this.$toast('您还未登录，请先登录');
					return
				}
				let _this = this;
				let params = { roadShowId: this.id };
				let url = 'user/fav/roadShow/remove';
				this.$post(url, params)
					.then(res => {
						if (res.code == 200) {
							_this.$set(_this.dataInfo,'fav', !1)
						}
					})
			},
			/*
			 * 分享
			 */
			onShare(){
				uni.share({
					title: this.dataInfo.title,
					provider:'weixin',
					imageUrl: this.dataInfo.coverImageUrl
				})
			},
			/*
			 * 获取路演详情
			 */
			roadDetailFn() {
				let _this = this;
				let params = {
					id: _this.id
				};
				let url = 'roadShow/detail';
				_this.$get(url, params)
					.then(res => {
						if (res.code == 200) {
							let info = res.content || {};
							if(info.detail && info.detail.length > 300){
								info.isDetail = true;
							}
							if(info.presenterIntroduce && info.presenterIntroduce.length > 300){
								info.isPresenter = true;
							}
							
							_this.dataInfo = info;
							if(_this.dataInfo.orgId){
								_this.getFundFn();
							}
						}
					})
			},
			loadingFundFn(){
				let pageInfo = this.params;
				let list = this.dataList;
				let pageIndex = pageInfo['pageInfo.pageIndex'];
				let pageSize = pageInfo['pageInfo.pageSize'];
				let total = this.total;
				let length = pageIndex * pageSize;
				if(length < total && list.list.length === length){
					++this.pageInfo['pageInfo.pageIndex']
					this.getFundFn();
				}
			},
			/*
			 * 获取机构下面基金
			 */
			getFundFn() {
				let _this = this;
				let params = _this.params;
				let url = 'org/fund/list';
				params.partyId = _this.dataInfo.orgId;
				_this.status = _this.statusOption.more;
				_this.$get(url, params)
					.then(res => {
						if (res.code == 200) {
							let info = res.content || {};
							let data = info.list || [];
							_this.total = info.pageInfo && info.pageInfo.recordCount || 0;
							
							_this.dataList = _this.dataList.concat(data);
							
							if(_this.total == _this.dataList.length){
								_this.status = _this.statusOption.noMore;
							}
						}
					})
			}
		}
	}
</script>

<style scoped>
	page,
	body,
	html,
	.l-container {
		width: 100%;
		font-size: 30rpx;
		min-height: 100vh;
		background-color: #F1F1F1;
	}
	
	.l-body-foot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 117rpx;
		display: flex;
		font-size: 28rpx;
		background-color: #FFFFFF;
	}
	
	.l-bf-right,
	.l-bf-left{
		flex: 1;
		display: flex;
		height: 100%;
	}
	
	.l-bf-left{
		justify-content: center;
	}
	
	.l-bfl-right{
		margin-top: 14rpx;
		width: 60rpx;
		text-align: center;
	}
	
	.l-bfl-left{
		min-width: 60rpx;
		white-space: nowrap;
		margin-top: 14rpx;
		text-align: center;
		margin-right: 93rpx;
	}
	
	.l-bfl-text{
		margin-top: 20rpx;
	}
	
	.l-icon-collect{
		width: 36rpx;
		height: 36rpx;
		background-image: url('~@/static/guanzhu@2x.png');
	}
	
	.l-icon-collected{
		width: 36rpx;
		height: 36rpx;
		background-image: url('~@/static/guanzhu@2x-active.png');
	}
	
	.l-icon-share{
		width: 36rpx;
		height: 36rpx;
		background-image: url('~@/static/fenxiang@2x.png');
	}
	
	.l-bfr-right,
	.l-bfr-left{
		flex: 1;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.l-bfr-right{
		background-color: #4A4A4A;
	}
	
	.l-bfr-left{
		background-color: #D8D8D8;
	}
	
	.l-status-bar{
		width: 100%;
		height: calc(var(--status-bar-height) + 50rpx);
		background-color: #000000;
	}
	
	.l-body-view-1 {
		width: 100%;
		height: 422rpx;
		position: relative;
	}
	
	.l-video{
		width: 100%;
		height: 422rpx;
		position: relative;
	}
	
	.l-img-back{
		position: absolute;
		width: 21rpx;
		height: 37rpx;
		top: 31rpx;
		left: 40rpx;
		z-index: 33;
	}
	
	.l-tab{
		display: flex;
		height: 84rpx;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #EDEDED;
	}
	
	.l-tab-item{
		flex: 1;
		display: flex;
		justify-content: center;
		height: 100%;
	}
	
	.l-tab-span{
		font-size: 30rpx;
		display: inline-block;
		line-height: 78rpx;
		height: 100%;
		box-sizing: border-box;
		border-bottom: 6rpx solid transparent;
	}
	
	.l-tab-active{
		color: #927751;
		border-bottom: 6rpx solid;
	}
	
	.l-swiper{
		height: calc(100vh - 673rpx - var(--status-bar-height));
	}
	
	.swiper-item{
		padding-bottom: 20rpx;
	}
	
	.l-scroll{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	
	.l-sv-view{
		padding:0 69rpx 0 30rpx;
	}
	
	.l-foot {
		padding: 24rpx;
	}
	
	.l-body-view-4{
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		height: 182rpx;
		border-top: 1rpx solid #EDEDED;
	}
	
	.l-bv4-item{
		width: 48%;
		display: flex;
		font-size: 32rpx;
		align-items: center;
	}
	
	.l-bv4-item:first-of-type{
		margin-right: 4%;
	}
	
	.l-bv4-txt-sub{
		font-size: 26rpx;
		color: #828282;
		margin-top: 14rpx;
	}
	
	.l-siv-avatar{
		width: 120rpx;
		height: 120rpx;
		display: flex;
		margin-right: 20rpx;
		align-items: center;
		justify-content: center;
	}
	
	.l-bv4-txt{
		width: calc(100% - 140rpx);
	}
	
	.l-bv4-txt-item{
		width: 100%;
	}
	
	.l-siv-avatar-company{
		background: url('~@/static/tuoyuan@2x.png') center/ cover no-repeat;
	}
	
	.l-siv-img{
		width: 116rpx;
		height: 116rpx;
		border-radius: 50%;
	}

	.l-img-road {
		width: 100%;
		height: 348rpx;
	}

	.l-body-view-2 {
		padding: 27rpx 29rpx 31rpx;
		background-color: #FFFFFF;
	}

	.l-bv2-head {
		font-size: 36rpx;
		font-weight: bold;
		line-height: 1.2;
		margin-bottom: 14rpx;
	}

	.l-bv-item {
		margin-top: 22rpx;
	}

	.l-body-view-3 {
		margin-top: 24rpx;
		background-color: #FFFFFF;
	}

	.l-bv-head {
		font-weight: bold;
		padding: 0 29rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1rpx solid #EDEDED;
	}

	.l-bv-body {
		line-height: 1.7;
		padding: 10rpx 29rpx;
	}
	
	.l-txt-overflow8{
		overflow: hidden;
		height: 420rpx;
	}

	.l-bv-more {
		margin: 0 29rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1rpx solid #C1C1C1;
	}

	.l-icon-down {
		width: 26rpx;
		height: 16rpx;
		margin-left: 11rpx;
		background-image: url('~@/static/down@2x.png');
	}

	.l-list {
		margin-top: 24rpx;
		padding: 0 30rpx 0 34rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 14rpx 30rpx 10rpx rgba(231, 231, 231, 0.6);
	}

	.l-head {
		width: 100%;
		height: 80rpx;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 88rpx;
		background-color: #FFFFFF;
	}


	.l-list-more {
		width: 100%;
		height: 98rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.l-icon-date {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.l-icon-date {
		display: inline-block;
		width: 38rpx;
		height: 38rpx;
		margin-right: 13rpx;
	}

	.l-icon-date {
		background-image: url('~@/static/road/shijian@2x.png');
	}
	
	.controls-play{
		z-index: 999;
	}
</style>
