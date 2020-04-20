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
				<input ref="sea" type="text" v-model="searchText" placeholder="搜产品" placeholder-style="color:#afafaf;" class="rank-input" 
				@confirm="confirm()" :confirm-hold="true"
				@blur="blurSearch()"/>
				<view class="cancel" @tap="$back(1)">
					取消
				</view>
				<view class="clear" v-if="searchText" @tap="clear">
					<image src="../../static/clear@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="l-status"></view>
		<view class="search-zhanwei"></view>
		
		<view class="l-view" v-if="alreadySearch">
			<template v-if="customerList.length">
				<view class="l-flex l-flex-ai_c l-flex-jc_sb searchList" v-for="(v,i) in customerList" :key="i">
					<view v-html="v.name">
					</view>
					<view class="color82">
						私募
					</view>
				</view>
			</template>
			<template v-else>
				<view class="l-flex l-flex-ai_c l-flex-jc_sb searchList">
					<view class="color82">
						未搜索到您要的结果
					</view>
				</view>
			</template>
		</view>
		
		<view class="school-tab l-flex l-flex-jc_sa l-flex-ai_c">
			<view class="school-ib" v-for="(v,i) in schoolTab" :key="i" :class="{'school-ib-actived': schoolTabIndex == i}" @tap="changeTab(v.value,i)">{{v.name}}</view>
		</view>
		
		<view class="hot-sea l-view">
			<view class="l-flex l-flex-jc_sb">
				<text class="tit">热门搜索</text>
			</view>
			<view class="hot-list">		
				<view class="product-item l-bb">
					<view class="one itembg">
						1
					</view>
					<view class="name">
						<view class="">
							<span>建泓绝对收益一</span>
						</view>
						<view class="">
							指数型
						</view>
					</view>
					<view class="newvalue">
						<!-- <view class="">
							1.5345
						</view>
						<view class="">
							03-26
						</view> -->
					</view>
					<view class="time" >
						<view :class="{'red':value>0,'green':value<0}">
							+15.68%
						</view>
						<view class="">
							成立来
						</view>				
					</view>
					<view class="focuson">
						<image src="../../static/product/xx@2x.png" mode="" v-if="focusvalue"></image>
						<image src="../../static/product/xxx@2x.png" mode="" v-else></image>
					</view>
				</view>
				
				<view class="product-item l-bb">
					<view class="two itembg">
						1
					</view>
					<view class="name">
						<view class="">
							<span>建泓绝对收益一</span>
						</view>
						<view class="">
							指数型
						</view>
					</view>
					<view class="newvalue">
						<!-- <view class="">
							1.5345
						</view>
						<view class="">
							03-26
						</view> -->
					</view>
					<view class="time" >
						<view :class="{'red':value>0,'green':value<0}">
							+15.68%
						</view>
						<view class="">
							成立来
						</view>				
					</view>
					<view class="focuson">
						<image src="../../static/product/xx@2x.png" mode="" v-if="focusvalue"></image>
						<image src="../../static/product/xxx@2x.png" mode="" v-else></image>
					</view>
				</view>
			</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alreadySearch:false,
				searchText:'',
				customerList:[],
				online:true,
				privatefundsList:[{
					name:'中战龙鳞1号私募证券投资基金',
					earnings:'42.35%'
				},{
					name:'中战龙鳞1号私募证券投资基金',
					earnings:'42.35%'
				},{
					name:'中战龙鳞1号私募证券投资基金',
					earnings:'42.35%'
				}],
				publicfundsList:[{
					name:'中战龙鳞基金',
					earnings:'42.35%'
				}],
				companyList:[{
					imgSrc:'../../static/logo.png',
					name:'深圳市龙鳞资本管理有限公司',
					setTime:'2014',
					product:'中战宏观对冲2号'
				}],
				schoolTab:[
					{name:'全部',value:0},
					{name:'公募',value:1},
					{name:'私募',value:2}
				],
				schoolTabIndex:0,
				value:1,
				focusvalue:1
			}
		},
		onLoad() {
			
		},
		computed:{
			
		},
		methods: {
			search(){
				let reg = new RegExp(`${this.searchText}`,'gi');
				let res = [{
					name:'龙鳞儿',
					birth:'1971-12-30',
					addTime:'2020-02-20'
				}];
				this.customerList.push(...res.map(v => {
					v.name = v.name.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.searchText}</text>`)
					return v;
				}))
				let res1 = [{
					name:'龙鳞儿1',
					birth:'1971-12-30',
					addTime:'2020-02-20'
				}];
				res1.map(v => {
					v.name = v.name.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.searchText}</text>`)
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
				this.search();
			},
			blurSearch(){

			},
			clear(){
				this.searchText = '';
			},
			changeTab(id,index){
				this.schoolTabIndex = index;
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

.school-tab{
	height: 100rpx;
	color: #242424;
	font-size: 17px;
	background-color: #FFFFFF;
	border-bottom: 1px solid #ABABAB;
}
.school-ib-actived{
	font-weight: bold;
	position: relative;
}
.school-ib-actived::after{
	content: '';
	width: 100%;
	height: 2px;
	position: absolute;
	background-color:#242424;
	left: 0;
	bottom: -34rpx;
}
.hot-list{
	margin-top: 30rpx;
}
.product-item{
	height: 60px;
	display: flex;
	align-items: center;
	.itembg{
		width: 38rpx;
		height: 36rpx;
		color: #FFFFFF;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url(../../static/product/777@2x.png);
	}
	.one{
		background-image: url(../../static/product/77@2x.png);	
	}
	.two{
		background-image: url(../../static/product/8@2x.png);
	}
	.three{
		background-image: url(../../static/product/99@2x.png);
	}
	.name{
		margin-left: 14rpx;
		view:nth-of-type(1){
			width: 256rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre;
			font-size: 15px;
		}
		view:nth-of-type(2){
			width: 100rpx;
			height: 34rpx;
			background-color: #D6D5D5;
			border-radius: 4rpx;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 14rpx;
		}
	}
	.newvalue{
		width: 132rpx;
		text-align: center;
		view:nth-of-type(1){
			font-size: 15px;
		}
		view:nth-of-type(2){
			font-size: 12px;
			color: #828282;
			margin-top: 20rpx;
		}
	}
	.time{
		margin-left: 72rpx;
		view:nth-of-type(1){
			font-size: 15px;
		}
		view:nth-of-type(2){
			font-size: 12px;
			color: #828282;
			margin-top: 20rpx;
			display: flex;
			justify-content: flex-end;
		}
	}
	.focuson{
		flex: 1;
		display: flex;
		justify-content: flex-end;
		image{
			width: 38rpx;
			height: 38rpx;
		}
	}
}
</style>
