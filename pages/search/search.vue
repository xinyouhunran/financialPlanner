<template>
	<view>
		<view class="search">
			<view class="l-flex l-view rank-search l-flex-ai_c l-flex-jc_sb">
				<!-- <view class="backwhite" @tap="$back(1)">
					<image src="../../static/backwhite@2x.png" mode=""></image>
				</view> -->
				<!-- <view class="rank-input l-flex">
					<span class="l-icon l-icon-search"></span>
					<view class="af">
						搜产品/人脉/资讯
					</view>
				</view> -->
				<input ref="sea" type="text" v-model="keyword" placeholder="搜产品" placeholder-style="color:#afafaf;" class="rank-input" 
				@confirm="confirm()" :confirm-hold="true"
				@blur="blurSearch()"/>
				<view class="cancel" @tap="$back(1)">
					取消
				</view>
				<view class="clear" v-if="keyword" @tap="clear">
					<image src="../../static/clear@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="l-status"></view>
		<view class="search-zhanwei"></view>
		
		<view class="l-view" v-if="alreadySearch">
			<template v-if="fundList.length">
				<view class="l-flex l-flex-ai_c l-flex-jc_sb searchList" v-for="(v,i) in fundList" :key="i" @tap="$nav({url:`/pages/product-details/product-details?id=${v.securityId}`})">
					<view v-html="v.secFullName" class="l-flex-1">
					</view>
					<view class="color82">
						私募
					</view>
				</view>
			</template>
			<template v-if="fundListCon.length">
				<view class="l-flex l-flex-ai_c l-flex-jc_sb searchList" v-for="(v,i) in fundListCon" :key="i" @tap="$nav({url:`/pages/product-details/product-details?id=${v.securityId}`})">
					<view v-html="v.secFullName" class="l-flex-1">
					</view>
					<view class="color82">
						公募
					</view>
				</view>
			</template>
			<template v-if="!(fundList.length||fundListCon.length)">
				<view class="l-flex l-flex-ai_c l-flex-jc_sb searchList">
					<view class="color82">
						未搜索到您要的结果
					</view>
				</view>
			</template>
		</view>
		
		<view class="history-sea l-view">
			<view class="l-flex l-flex-jc_sb">
				<text class="tit">历史搜索</text>
				<image src="../../static/delete@2x.png" mode=""></image>
			</view>
			<view class="tag-list l-flex">
				<view class="tag">私募证券</view>
				<view class="tag">信托</view>
				<view class="tag">过期信托-信德38号</view>
			</view>
		</view>
		<view class="hot-sea l-view">
			<view class="l-flex l-flex-jc_sb">
				<text class="tit">热门搜索</text>
			</view>
			<view class="tag-list l-flex">
				<view class="tag">私募证券</view>
				<view class="tag">信托</view>
				<view class="tag">过期信托-信德38号</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alreadySearch:false,
				keyword:'',
				online:true,

				pageInfo: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 65535
				},
				fundList: [],
				fundListCon: [],
				// 私募产品搜索
				searchFundInfo: 'business/searchFundInfo',
				// 公募产品搜索
				searchFundClassInfo: 'business/searchFundClassInfo',

				isLoad: false,
				isMore: false
			}
		},
		onLoad() {
			this.isLoad = false;
		},
		computed:{
			
		},
		methods: {
			search(){
				let reg = new RegExp(`${this.keyword}`,'gi');
				let res = [{
					name:'龙鳞儿',
					birth:'1971-12-30',
					addTime:'2020-02-20'
				}];
				this.customerList.push(...res.map(v => {
					v.name = v.name.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.keyword}</text>`)
					return v;
				}))
				let res1 = [{
					name:'龙鳞儿1',
					birth:'1971-12-30',
					addTime:'2020-02-20'
				}];
				res1.map(v => {
					v.name = v.name.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.keyword}</text>`)
					return v;
				});
				this.customerList.push(...res1);
				this.alreadySearch = true;
			},
			showMore(){
				this.$get(
				'getPrivateFunds'
				).then(res => {
						console.log(res);
						this.privatefundsList.push(...res);
					}).catch(err =>{
						console.log(err);
					})
			},
			confirm(){
				uni.hideKeyboard();
				this.getKeyword();
			},
			blurSearch(){

			},
			clear(){
				this.keyword = '';
				this.alreadySearch = false;
			},
			/**
			* 基金产品搜索
			*/
		   getKeyword(){
		   	this.fundList =  [];
		   	this.fundListCon = []
		   	this.searchFun();
		   },
		   
		   async searchFun(){
		   	uni.showLoading({
		   		title:'搜索中...'
		   	});
		   	if(!this.isLoad){
		   		this.isLoad = !this.isLoad;
		   	}
		   	this.isMore = false;
		   	let fundList = await this.searchFundInfoFun();
		   	let fundListCon = await this.searchFundClassInfoFun();
			uni.hideLoading();
			this.alreadySearch = true;
		   },
		   //私募
			async searchFundInfoFun(){
				let reg = new RegExp(`${this.keyword}`,'gi');
				let url = this.searchFundInfo;
				let pageInfo = this.pageInfo;
				let params = {
					key: this.keyword,
				};
				Object.assign(params, pageInfo);
				
				return new Promise((resolve,reject)=>{
					this.$get(url,params)
					.then(res => {
						//uni.hideLoading()
						if(res.code === '200'){
							let data = res.content || {};
							this.fundList = data.list.map(v => {
								v.secFullName = v.secFullName.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.keyword}</text>`)
								return v;
							});
							resolve(this.fundList)
						}
						setTimeout(() => {
							this.isMore = true;
						},500)
					}).catch(e => {
						reject('err')
						uni.hideLoading()
					})
				})	
			},
			//公募
			async searchFundClassInfoFun(){
				let reg = new RegExp(`${this.keyword}`,'gi');
				let url = this.searchFundClassInfo;
				let pageInfo = this.pageInfo;
				let params = {
					key: this.keyword,
				};
				Object.assign(params, pageInfo);
				return new Promise((resolve,reject)=>{
					this.$get(url,params)
					.then(res => {
						//uni.hideLoading()
						if(res.code === '200'){
							let data = res.content || {};
							this.fundListCon = data.list.map(v => {
								v.secFullName = v.secFullName.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.keyword}</text>`)
								return v;
							})
							resolve(this.fundListCon)
						}
					}).catch(e => {
						reject('err')
						uni.hideLoading()
					})
				})		
			},
		}
	}
</script>

<style scoped lang="scss">
.color82{
	color: #828282;
}
.searchList{
	height: 88rpx;
	border-bottom: 1px solid #F4F4F4;
}
.clear{
	width: 28rpx;
	height: 28rpx;
	position: absolute;
	right: 136rpx;
}
.cancel{
	font-size: 16px;
}
.search{
	background-color: #EDEDED;
	overflow: hidden;
	position: fixed;
	width: 100%;
	top: 0;
	padding-top: var(--status-bar-height);
}
.search-zhanwei{
	height: 90rpx;
}
.backwhite{
	width: 21rpx;
	height: 37rpx;
}
.rank-search{
	padding: 16rpx 24rpx;
}
.rank-input{
	width: 528rpx;
	background: url(~@/static/sousuo@2x.png) 10px center no-repeat;
	background-color: #FFFFFF;
	background-size: 30rpx 30rpx;
	border-radius: 30rpx;
	padding: 8rpx 20rpx;
	padding-left: 60rpx;
	font-size: 12px;
	.af{
		color: #afafaf;
		font-size: 12px;
	}
}
.l-icon-search{
	width: 30rpx;
	height: 30rpx;
	margin-right: 11rpx;
	background-image: url('~@/static/sousuo@2x.png');
}
.l-body-view-1{
	position: fixed;
	top: 192rpx;
}
.l-body-view-2{
	margin-top: 292rpx;
}
.history-sea,.hot-sea{
	padding: 30rpx 24rpx;
	image{
		width: 27rpx;
		height: 29rpx;
	}
	
}
.tit{
	font-size: 16px;
	color: #828282;	
}
.tag-list{
	margin-top: 30rpx;
}
.tag{
	padding: 8rpx 17rpx;
	border: 1px solid #E70012;
	border-radius: 18rpx;
	color: #E70012;
	font-size: 12px;
	margin-right: 20rpx;
}
</style>
