<template>
	<view class="container">
		<view class="product_all_list">
			<view v-for="(item,index) in productFeature" :key='index' class="pro-item l-view" :class="{'topmt':index!=0}">
				<view class="l-flex top l-flex-jc_sb toppt">
					<view class="l-flex">
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
					<view class="time" @tap="item.flag=!item.flag">
						<template v-if="item.flag">
							<image src="../../static/product/gx1@2x.png" mode=""></image>
						</template>
						<template v-else>
							<image src="../../static/product/gx@2x.png" mode=""></image>
						</template>
					</view>
				</view>
				<view class="l-flex l-flex-jc_sb">
					<view class="l-flex l-flex-direction pro-item-l">
						<text :class="{'red':item.earnings>0,'green':item.earnings<0}" class="middle">{{item.earnings}}%</text>
						<text class="bottom">预期收益</text>
					</view>
					<view class="l-flex l-flex-direction pro-item-m">
						<text class="danwei middle">{{item.latestnet}}</text>
						<text class="bottom">起投金额</text>
					</view>
					<view class="l-flex l-flex-direction pro-item-r">
						<text class="middle">{{item.netchange}}</text>
						<text class="bottom">期限</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="my-btn">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productFeature:[{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'+6.88',
				latestnet:'1.4530',
				netchange:'12个月',
				time:'03-24 12:00',
				flag:false
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'-6.88',
				latestnet:'1.4530',
				netchange:'12个月',
				time:'03-24 12:00',
				flag:false
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'0.00',
				latestnet:'1.4530',
				netchange:'12个月',
				time:'03-24 12:00',
				flag:false
				}],
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.product_all_list{
	overflow: hidden;
}
.product_all_list .top{
	margin-bottom: 50rpx;
}
.product_all_list .time{
	align-self: flex-end;
	image{
		width: 44rpx;
		height: 44rpx;
	}
}
.toppt{
	padding-top: 24rpx;
}
.topmt{
	margin-top: 20rpx;
}
.product_all_list .top .l{
	font-size: 16px;
}
.product_all_list .m{
	width: 88rpx;
	height: 34rpx;
	background-color:#D3A35C ;
	color: #FFFFFF;
	line-height: 34rpx;
	text-align: center;
	font-size: 28rpx;
	margin: 0 10rpx;
	border-radius: 4rpx;
}
.product_all_list .r{
	border: 1px solid #e70012;
	color: #e70012;
	font-size: 20rpx;
	border-radius: 8rpx;
	text-align: center;
	line-height: 30rpx;
	height: 30rpx;
	padding: 0 3px;
}
.product_all_list .middle{
	font-size: 18px;
	margin-bottom: 24rpx;
}
.product_all_list .red{
	color: #e70012;
}
.product_all_list .green{
	color: green;
}
.product_all_list .middle text:nth-of-type(1){
	width: 280rpx;
}
.product_all_list .middle text:nth-of-type(3){
	display: flex;
	flex: 1;
	justify-content: flex-end;
}
.product_all_list .middle .danwei{
	margin-left: 16rpx;
}
.product_all_list .bottom{
	font-size: 13px;
	color: #828282;
	padding-bottom: 22rpx; 
}
.pro-item{
	background-color: #FFFFFF;
}
.pro-item-l{
	width: 166rpx;
}
.pro-item-m{
	text-align: center;
}
.pro-item-r{
	text-align: right;		
}
.my-btn{
	background-color: #D3A35C;
	width: 680rpx;
	//margin: 30rpx auto;
	height: 47px;
	color: #fff;
	border-radius: 46rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 30rpx;
	left: 50%;
	margin-left: -340rpx; 
}
</style>
