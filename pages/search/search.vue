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
				<input type="text" value="" placeholder="搜产品/人脉/资讯" placeholder-style="color:#afafaf;" class="rank-input"/>
				<view class="cancel">
					取消
				</view>
			</view>
		</view>
		<view class="l-status"></view>
		<view class="search-zhanwei"></view>
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
				}]
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
			}
		}
	}
</script>

<style scoped lang="scss">
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
