<template>
	<view class="container">
		<view class="l-view">
			<view class="customer-top l-bb">
				<view class="l-flex customer-list l-flex-jc_sb">
					<view class="l l-flex l-flex-ai_c">
						<view class="tx">
							<image src="../../static/tool/tx@2x.png" mode=""></image>
						</view>
						<view class="name">
							<view class="l-flex">
								<view class="">
									刘德华
								</view>
								<view class="">
									<image src="../../static/tool/n@2x.png" mode=""></image>
								</view>
							</view>
							<view class="b">
								昵称:四大天王
							</view>
						</view>
					</view>
					<view class="r">
						<view class="">
							11:25
						</view>
						<view class="time">
							04-07 
						</view>
					</view>
				</view>
				<view class="l-flex l-flex-jc_sb">
						<view class="">
							访问次数：<span class="colore70012">3次</span>
						</view>
						<view class="">
							访问时长：<span class="colore70012">1分40秒</span>
						</view>
				</view>
			</view>
			<view class="customer-bottom">
				<view class="tagname">
					个人标签
				</view>
				<view class="taglist">
					<view class="item">
						做生意的
					</view>
					<view class="item">
						企业高管
					</view>
					<view class="item">
						CEO
					</view>
					<view class="tagadd">
						<image src="../../static/tool/addtag.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="backf4">
			
		</view>
		
		<view class="l-view">
			<view class="access-path">
				<view class="name">
					访问轨迹
				</view>
				<view class="path">
					<view class="date">
						04-07
					</view>
					<uni-steps :options="options" direction="column" :active="active" active-color="#3481F2"></uni-steps>
					
					<!-- <view class="date">
						04-07
					</view>
					<uni-steps :options="options1" direction="column" :active="active" active-color="#3481F2"></uni-steps> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:[
					{title:'买家下单',desc:'浏览《财经早报》',time:'1分20秒'},
					{title:'卖家发货',desc:'浏览《财经早报》',time:'1分20秒'},
					{title:'买家签收',desc:'浏览《财经早报》',time:'1分20秒'},
					{title:'交易完成',desc:'浏览《财经早报》',time:'1分20秒'},
					],
				options1:[
					{title:'买家下单',desc:'浏览《财经早报》',time:'54秒'},
					],
				active:0,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.customer-top{
	padding-bottom: 30rpx;
}
.customer-list{
		padding: 30rpx 0;
		.tx{
			image{
				width: 94rpx;
				height: 94rpx;
			}
		}
		.name{
			margin-left: 28rpx;
			font-size: 17px;
			image{
				width: 30rpx;
				height: 30rpx;
				margin-left: 46rpx;
			}
			.b{
				font-size: 13px;
				color: #828282;
				margin-top: 26rpx;
			}
		}
		.r{
			text-align: right;
			font-size: 15px;
			color: #828282;
			margin-top: 6rpx;
			.time{
				font-size: 13px;
				margin-top: 32rpx;
			}
		}
	}
	
.customer-bottom{
	padding-bottom: 40rpx;
	overflow: hidden;
	.tagname{
		margin: 30rpx 0;
		font-size: 16px;
	}
	.taglist{
		display: flex;
		flex-wrap: wrap;
		.item{
			padding: 8rpx 10rpx;
			color: #FFFFFF;
			background-color: #D3A35C;
			border-radius: 4rpx;
			margin-right: 20rpx;
			margin-bottom: 16rpx;
			font-size: 12px;
		}
		.tagadd{
			width: 46rpx;
			height: 40rpx;
		}
	}
}
.backf4{
	height: 20rpx;
	background-color: #F4F4F4;
}
.access-path{
	margin-top: 50rpx;
	.name{
		font-size: 16px;
	}
	.path{
		.date{
			font-size: 15px;
			margin-top: 30rpx;
		}
	}
}
</style>
