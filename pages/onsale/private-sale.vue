<template>
	<view>
		<view class="private-sale">
			<view class="l-flex header l-flex-ai_c">
				<view class="school-tab l-flex l-flex-jc_sa">
					<view class="school-ib" v-for="(v,i) in schoolTab" :key="i" :class="{'school-ib-actived': schoolTabIndex == i}" @tap="changeTab(v.value,i)">{{v.name}}</view>
				</view>
				<view class="shai" @tap="showMask">
					筛选
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
							<!-- {{item.time}} -->
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
			
			<view class="private-mask" @touchmove.stop.prevent :class="isShow ? 'transY' : firstflag?'untransY':''">
				<view class="tag" v-if="isShow">
					<view class="tag-item">
						<view class="title">
							产品类别
						</view>
						<view class="tag-list l-flex">
							<view v-for="(v,i) in productType" :key="i" :class="{'tag-active':productTypeIndex==v.value}" @tap="changeProductType(v.value)">
								{{v.name}}
							</view>
						</view>
					</view>
					<view class="buttongroup l-flex">
						<view class="">
							重置
						</view>
						<view class="">
							确定
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				firstflag:false,
				
				productTypeIndex:0,
				productType:[
					{
						name:'不限',
						value:0	
					},{
						name:'股票策略',
						value:1
					},{
						name:'宏观策略',
						value:2
					},{
						name:'固定收益',
						value:3
					},{
						name:'事件驱动',
						value:4
					},{
						name:'组合策略',
						value:5	
					},{
						name:'管理期货',
						value:6	
					},{
						name:'保险理财',
						value:7
					},{
						name:'复合策略',
						value:8
					},				
				],
				
				schoolTab:[
					{name:'全部',value:0},
					{name:'股票策略',value:1},
					{name:'宏观策略',value:2},
					{name:'管理策略',value:3}
				],
				schoolTabIndex:0,
				
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
		created() {
			this.isShow = false;
			this.firstflag = false;
		},
		methods: {
			changeTab(id,index){
				this.schoolTabIndex = index;
			},
			showMask(){
				this.isShow = !this.isShow;
				this.firstflag = true;
			},
			changeProductType(v){
				this.productTypeIndex = v; 
			}
		}
	}
</script>

<style scoped lang="scss">

.private-sale{
	position: relative;
	.header{
		position: fixed;
		width: 100%;
		top: calc(88rpx + var(--status-bar-height));
		height: 100rpx;
		border-bottom: 1px solid #ABABAB;
		font-size: 16px;
		background-color: #FFFFFF;
		.shai{
			width: 104rpx;
			color: #D3A35C;
			background: url(~@/static/product/sx@2x.png) 5rpx 0 no-repeat;
			background-size: 14px 16px;
			display: flex;
			justify-content: flex-end;
			padding-right: 24rpx;
			border-left: 1px solid #D4D2D2;
		}
	}
}
.school-tab{
	flex: 1;
	color: #242424;
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
	//margin-left: -25%;
	bottom: -34rpx;
}
.private-mask{
	position: fixed;
	height: 0;
	background: #FFFFFF;
	//opacity: 0.5; 
	width: 100%;
	z-index: 1;
	top: calc(188rpx + var(--status-bar-height));
	.tag{
		width: 100%;
		/* #ifdef APP-PLUS */
		height: 100%;
		/* #endif */
		/* #ifndef APP-PLUS */
		height: calc(100% - 100rpx);
		/* #endif */
		background-color: #FFFFFF;
		position: relative;
		overflow: hidden;
		.buttongroup{
			position: absolute;
			bottom: 0;
			height: 100rpx;
			width: 100%;
			view{
				width: 50%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			view:nth-of-type(2){
				background-color: #E70012;
				color: #FFFFFF;
			}
		}
		.tag-item{
			padding: 0 24rpx;
			margin-top: 32rpx;
			.title{
				color: #828282;
			}
			.tag-list{
				margin-top: 20rpx;
				flex-wrap: wrap;
				view{
					width: 150rpx;
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #E70012;
					color: #E70012;
					border-radius: 8rpx;
					margin-left: 20rpx;
					margin-top: 12rpx;
				}
				.tag-active{
					background-color: #E70012;
					color: #FFFFFF;
				}
			}
		}
	}
}
.transY{
	animation: moveY 0.8s;
	height: calc(100vh - 188rpx - var(--status-bar-height));;
}
.untransY{
	animation: moveYreverse 0.8s; 
	height: 0;
}
@keyframes moveY{
	0%{
		height: 0px;
	}
	100%{
		height: calc(100vh - 188rpx - var(--status-bar-height));
	}
} 
@keyframes moveYreverse{
	0%{
		height: calc(100vh - 188rpx - var(--status-bar-height));
	}
	100%{
		height: 0px;
	}
} 

.product_all_list{
	padding: 40rpx 24rpx 0;
	background-color: #FFFFFF;
	margin-top: 188rpx;
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
