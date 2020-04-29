<template>
	<view class="container">
		<view class="road-infor">
			<view class="l-view">
				<view class="top l-flex l-flex-jc_sb l-flex-ai_c">
					<view class="title l-flex">
						<view class="">
							<image src="../../static/road/144@2x.png" mode=""></image>
						</view>
						<view class="">
							精选路演
						</view>
					</view>
					<view class="" @tap="$nav({url:'/pages/road/road'})"> 
						更多>
					</view>
				</view>
				<view class="first" v-for="(v,i) in firstBanner" :key="v.id" @tap="$nav({url: '/pages/tabbar/road/road-details?id=' + v.id})">
					<view class="first-banner">
						<image :src="v.coverH5ImageUrl?v.coverH5ImageUrl:''" mode=""></image>
						<view class="tag">
								{{v.labelName?v.labelName:''}}
						</view>
						<!-- <view class="describe">
							
						</view> -->
						<!-- <view class="describe-m">
							<image src="../../static/road/sj@2x.png" mode=""></image>
							<view class="">
								离路演开始还有1天05小时40分
							</view>	
						</view> -->
					</view>
					<view class="first-message">
						<view class="t">
							{{v.title?v.title:''}}
						</view>
						<view class="b l-flex l-flex-ai_c l-flex-jc_sb">
							<view class="lytag">
								{{v.cateName?v.cateName:''}}
							</view>
							<view class="gz l-flex l-flex-ai_c">
								<view class="">
									<image src="../../static/road/liulan@2x.png" mode=""></image>
								</view>
								<view class="">
									{{v.viewUsers?v.viewUsers:'暂无'}}观看
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- <view class="middle">
					<view class="item">
						<view class="item-banner">
							<image src="../../static/1577935511@2x.png" mode=""></image>
							<view class="tag">
									直播中
							</view>
						</view>
						<view class="item-message">
							<view class="t">
								会议回顾：2020年资产配置需更132456798798
							</view>
							<view class="lytag">
								个人路演
							</view>
							<view class="gz l-flex l-flex-ai_c">
								<view class="">
									<image src="../../static/road/liulan@2x.png" mode=""></image>
								</view>
								<view class="">
									2.1W观看
								</view>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="item-banner">
							<image src="../../static/1577935511@2x.png" mode=""></image>
							<view class="tag">
									直播中
							</view>
						</view>
						<view class="item-message">
							<view class="t">
								会议回顾：2020年资产配置需更132456798798
							</view>
							<view class="lytag">
								个人路演
							</view>
							<view class="gz l-flex l-flex-ai_c">
								<view class="">
									<image src="../../static/road/liulan@2x.png" mode=""></image>
								</view>
								<view class="">
									2.1W观看
								</view>
							</view>
						</view>
					</view>
				</view> -->
				
				<view class="zxzk pl pr">
					<view class="uni-flex l-flex-jc_sb l-flex-1">
						<view class="title l-flex">
							<view class="">
								<image src="../../static/road/144@2x.png" mode=""></image>
							</view>
							<view class="">
								iFund精选
							</view>
						</view>
						<scroll-view class="my-scroll" scroll-x="true">
							<view class="l-ib" v-for="(v,i) in zxzklabelList" :key="i" :class="{'l-ib-actived': zxzklabelListIndex == v.cateId}" @tap="zxzkTab(v.cateId,i)">{{v.name}}</view>
						</scroll-view>
					</view>
					
					<!-- <view class="watch-more">
						点击查看更多
					</view> -->
				</view>
				<view class="bgffffff">
					<view class="uni-flex l-zb l-flex-jc_sb l-bb zxzkpb" v-for="(v,i) in windzxshList" :key='i' @tap="$nav({ url: '/pages/tabbar/windzxsh/windxsh-details?id='+ v.id + '&type='+ v.type })">
						<view class="l-flex l-flex-direction l-flex-jc_sb">
							<view class="lt-zx">{{v.title}}</view>
							<view class="lh"><text class="ltmr">{{v.source}}</text><text>{{v.publishTime}}</text></view>
						</view>
						<image src="../../static/1577935511@2x.png" mode="aspectFill"></image>
					</view>
					<uni-load-more :status="status" />
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//总管精选tab
				zxzklabelList:[
					{name:'独家解读',id:15},
					{name:'大咖专访',id:16},
					{name:'ifund商学院',id:17},
					/* {name:'全部',id:11}, */
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
				
				dataList:[],
				firstBanner:[]
			}
		},
		created() {
			this.windzxshLabelFn()
			//this.windzxshFn(this.zxzklabelListIndex)
			this.roadListFn()
		},
		methods: {
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
			roadListFn(){
				let _this = this;
				let params = _this.params;
				let url = 'roadShow/list';

				_this.status = _this.statusOption.loading;
				_this.$get(url,{
					'pageInfo.pageIndex':1,
					'pageInfo.pageSize':3
				})
				.then(res => { 
					uni.hideLoading()
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list || [];
						
						data.forEach(e => {
							e.duration = e.showDuration ? _this.$getDuration(e.showDuration) : '00:00:01';
						})
						
						_this.dataList = _this.dataList.concat(data);
						console.log(_this.dataList);
						_this.firstBanner = _this.dataList;
						console.log(_this.firstBanner)
					}
				}).catch(res => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.road-infor{
	.top{
		height: 90rpx;
	}
	.title{
		font-size: 18px;
		font-weight: bold;
		image{
			width: 32rpx;
			height: 32rpx;
			margin-right: 16rpx;
		}
	}
	.first{
		background-color: #FFFFFF;
		&-banner{
			width: 100%;
			height: 348rpx;
			overflow: hidden;
			position: relative;
		}
		.tag{
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			padding: 10rpx 21px;
			color: #FFFFFF;
			background-color: #000000;
			opacity: 0.7;
			font-size: 10px;
			border-radius: 8rpx;
		}
		.describe{
			position: absolute;
			width: 100%;
			height: 70rpx;
			bottom: 0;
			color: #FFFFFF;
			background: #000000;
			opacity: 0.7;
			font-size: 15px;
		}
		.describe-m{
			position: absolute;
			width: 100%;
			height: 70rpx;
			bottom: 0;
			display: flex;
			align-items: center;	
			color: #FFFFFF;
			font-size: 15px;
			image{
				width: 38rpx;
				height: 38rpx;
				margin: 0 12rpx 0 30rpx;
			}
		}
	}
	.first-message{
		padding: 24rpx;
		.t{
			font-size: 16px;
			line-height: 40rpx;
			width: 634rpx;
		}
		.b{
			margin-top: 20rpx;
			color: #828282;
			font-size: 13px;
			
		}
	}
	.middle{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.item{
			width: 340rpx;
			background-color: #FFFFFF;
			.item-banner{
				width: 100%;
				height: 320rpx;
				overflow: hidden;
				position: relative;
			}
			.tag{
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				padding: 10rpx 21px;
				color: #FFFFFF;
				background-color: #000000;
				opacity: 0.7;
				font-size: 10px;
				border-radius: 8rpx;
			}
			.item-message{
				padding: 20rpx 24rpx 32rpx;
				.t{
					width: 282rpx;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 16px;
					line-height: 20px;
				}
				.lytag{
					margin-top: 20rpx;
				}
				.gz{
					margin-top: 18rpx;
					image{
						width: 28rpx;
						height: 20rpx;
					}

				}
			}
		}
	}
	.lytag{
		padding: 8rpx 12rpx;
		border-radius: 22rpx;
		border: 1px solid #828282;
		//max-width: 110rpx;
		text-align: center;
		color: #828282;
		font-size: 13px;
	}
	.gz{
		color: #828282;
		image{
			width: 24rpx;
			height: 22rpx;
			margin-right: 6rpx;
		}
	}
	.zxzk{
		height: 90rpx;
		display: flex;
		align-items: center;
	}
	.zxzkpb{
		padding-bottom: 28rpx;
	}
	.l-ib{
		margin-left: 16rpx;
		font-size: 26rpx; 
		display: inline-block;
		padding-bottom: 10rpx;
	}
	.l-ib-actived{
		color: #D3A35C;
		position: relative;
	}
	.l-ib-actived::after{
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		background-color:#D3A35C;
		left: 0;
		bottom: 0;
	}
	.lt-zx{
		width: 468rpx; 
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 18px;
	}
	.watch-more{
		color: #497CE8;
		font-size: 28rpx;
		text-align: center;
		margin-top: 36rpx;
		margin-bottom: 36rpx;
	}
	.l-zb{
		background-color: #FFFFFF;
		padding: 30rpx 24rpx;
	}
	.lt{
		font-size: 30rpx;
		color: #242424;
		margin-top: 46rpx;
	}
	.ltmr{
		margin-right: 20rpx;
	}
	.lh{
		color:#828282;
		font-size: 20rpx;
	}
	.l-zb image{
		width: 166rpx;
		height: 132rpx;
	}
	.bgffffff{
		background-color: #FFFFFF;
	}
	.my-scroll{
		width: 400rpx;
		white-space: nowrap;
		height: 44rpx;
	}
}
</style>
