<template>
	<view>
		<view class="l-view sale-t l-flex l-flex-jc_c">
			<view class="sale-search l-flex">
				<span class="l-icon l-icon-search"></span>
				<view class="af">
					请输入产品
				</view>
			</view>
		</view>
		
		<view class="screen l-flex l-flex-jc_sa l-flex-ai_c">
			<view class="screen-item">
				<view class="l-flex l-flex-ai_c">
					<view class="" @tap="tab=1">
						智能推荐
					</view>
					<image src="../../static/down@2x.png" mode=""></image>
				</view>
				<view class="recom" :class="{'recom-active':tab==1}">
					
				</view>
			</view>
			<view class="screen-item">
				<view class="l-flex l-flex-ai_c">
					<view class="" @tap="tab=2">
						筛选
					</view>
					<image src="../../static/down@2x.png" mode=""></image>
				</view>
				<view class="recom1" :class="{'recom1-active':tab==2}">
					
				</view>
			</view>
		</view>
		
		<view class="product_all_list">
			<view v-for="(item,index) in productFeature" :key='index'>
				<view class="l-flex top l-flex-jc_sb" :class="{topmt:index!=0}">
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
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="l-flex middle">
					<text>{{item.netchange}}</text>
					<text class="danwei">{{item.latestnet}}</text>
					<text :class="{'red':item.earnings>0,'green':item.earnings<0}">{{item.earnings}}%</text>
				</view>
				<view class="l-flex l-flex-jc_sb bottom l-bb">
					<text>净值日期</text>
					<text>单位净值</text>
					<text>净值变动</text>
				</view>
			</view>
		</view>
		
		<view class="onsale-mask">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab:1,
				productFeature:[{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'+6.88',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'-6.88',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'0.00',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'+6.88',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'-6.88',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'0.00',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'+6.88',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'-6.88',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				},{
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'0.00',
				latestnet:'1.4530',
				netchange:'2020-03-20',
				time:'03-24 12:00'
				}],
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.sale-t{
	top: 0;
	padding: 16rpx 0;
	padding-top: calc(16rpx + var(--status-bar-height));
	background-color: #EDEDED;
	color: #afafaf;
	font-size: 12px;
	position: fixed;
	width: 100%;
}
.sale-search{
	width: 700rpx;
	background-color: #FFFFFF;
	line-height: 29px;
	height: 29px;
	border-radius: 30rpx;
}
.l-icon-search{
		width: 30rpx;
		height: 30rpx;
		margin: 14rpx 20rpx;
		background-image: url('~@/static/sousuo@2x.png');
}
.screen{
	background-color: #FFFFFF;
	position: fixed;
	top: calc(90rpx + var(--status-bar-height));
	width: 100%;
	font-size: 15px;
	border-bottom: 1px solid #ABABAB;
	image{
		width: 24rpx;
		height: 13rpx;
		margin-left: 15rpx;
	}
	.screen-item{
		margin-top: 36rpx;
		margin-bottom: 4px;
	}
	.recom,.recom1{
		width: 76rpx;
		height: 9rpx;
		margin-top: 21rpx;
		margin-left: 21rpx;
	}
	.recom-active,.recom1-active{
		background-image: url(../../static/saledown.png);
		background-size: cover;
	}
	.recom1{
		margin-left: -6rpx;
	}
}
.product_all_list{
	padding: 40rpx 24rpx 0;
	background-color: #FFFFFF;
	margin-top: calc(190rpx + var(--status-bar-height));
}
.product_all_list .top{
	margin-bottom: 50rpx;
}
.product_all_list .time{
	font-size: 12px;
	color: #828282;
	align-self: flex-end;
}
.topmt{
	margin-top: 40rpx;
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
.product_all_list .middle .red{
	color: #e70012;
}
.product_all_list .middle .green{
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
	padding-bottom: 40rpx;
}
/* .product_all_list .bottom text:nth-of-type(3){
	display: flex;
	flex: 1;
	justify-content: flex-end;
}
.product_all_list .bottom text:nth-of-type(2){
	margin-left: 200rpx;
} */
.l-bb{
	border-bottom: 2rpx solid #F4F4F4;
}
</style>
