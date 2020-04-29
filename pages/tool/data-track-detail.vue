<template>
	<view class="container">
		<view class="l-view">
			<view class="share-item" @tap="$nav({url:'/pages/tool/data-track-detail'})">
				<view class="l-flex l-flex-jc_sb t">
					<view class="">
						财经早报
					</view>
					<view class="">
						
					</view>
				</view>
				<view class="m">
					4.7财经早报《证券行业点评报告:首批并表监管点券商公布未来风险管理将成为券商核心竞争力》
				</view>
				<view class="b">
					<view class="l-flex">
						<view class="">
							<image src="../../static/tool/r@2x.png" mode=""></image>
						</view>
						<view class="">
							8
						</view>
					</view>
					<view class="l-flex">
						<view class="">
							<image src="../../static/tool/k@2x.png" mode=""></image>
						</view>
						<view class="">
							8
						</view>
					</view>
					<view class="l-flex">
						<view class="">
							<image src="../../static/tool/zf@2x.png" mode=""></image>
						</view>
						<view class="">
							8
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="backf4">
			
		</view>
		<view class="l-view">
			<view class="l-flex l-flex-jc_sb l-flex-ai_c">
				<view class="">
				</view>
				<view class="l-flex l-flex-ai_c">
					<ms-dropdown-menu>
						<ms-dropdown-item v-model="accessIndex" :list="accessList" ref="dropdownItem"></ms-dropdown-item>
					</ms-dropdown-menu>
					<!-- <view class="">
						按最近访问
					</view>
					<image src="../../static/down@2x.png" mode=""></image> -->
				</view>
			</view>
			<view class="l-flex customer-list l-flex-jc_sb l-bb" @tap="$nav({url:'/pages/tool/customer-detail'})">
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
							访问时长：<span class="colore70012">25</span>秒
						</view>
					</view>
				</view>
				<view class="r">
					<view class="">
						04-07 11:25
					</view>
					<view class="time">	
						访问次数：<span class="colore70012">3</span>次
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	export default {
		components: {
			msDropdownMenu,
			msDropdownItem
		},
		data() {
			return {
				accessList:[{
					text:'按最近访问',
					value:0
				},{
					text:'按访问次数',
					value:1
				},{
					text:'按访问时长',
					value:2
				}],
				accessIndex:0
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.share-item{
	color: #828282;
	padding-bottom: 26rpx;
	.t{
		margin-top: 28rpx;
		view:nth-of-type(1){
			font-size: 16px;
			color: #242424;
		}
	}
	.m{
		margin-top: 26rpx;
		font-size: 15px;
		line-height: 38rpx;
	}
	.b{
		margin-top: 24rpx;
		display: flex;
		justify-content: flex-end;
		font-size: 15px;
		image{
			width: 28rpx;
			height: 28rpx;
			margin-left: 48rpx;
			margin-right: 8rpx;
		}
		
	}
}
.backf4{
	height: 20rpx;
	background-color: #F4F4F4;
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
</style>
