<template>
	<view class="container">
		<view class="customer-manager">
			<view class="search l-flex l-flex-ai_c">
				<view class="">
					<image src="../../static/sousuo@2x.png" mode=""></image>
				</view>
				<input type="text" value="" placeholder="搜索客户" placeholder-class="placeclass"/>
			</view>
			<view class="l-flex l-view access l-flex-jc_sb l-flex-ai_c">
				<view class="">
					<span>共</span><span class="colore70012">150</span><span>人</span>
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
			
			<view class="l-view">
					<view class="l-flex customer-list l-flex-jc_sb" @tap="$nav({url:'/pages/tool/customer-detail'})">
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
								访问次数：<span class="colore70012">3</span>次
							</view>
							<view class="time">
								04-07 11:25
							</view>
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
			close() {
				this.$refs.dropdownItem.closePopup()
			}
		}
	}
</script>

<style lang="scss" scoped>
.customer-manager{
	.search{
		width: 700rpx;
		margin: 0 auto;
		height: 60rpx;
		background-color: #F6F6F6;
		border-radius: 30rpx;
		overflow: hidden;
		image{
			width: 30rpx;
			height: 30rpx;
			margin: 0 20rpx;
		}
		input{
			flex: 1;
			font-size: 13px;
		}
		.placeclass{
			font-size: 13px;
			color: #AFAFAF;
		}
	}
	.access{
		//margin-top: 40rpx;
		image{
			width: 26rpx;
			height: 16rpx;
			margin-left: 14rpx;
		}
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
}
</style>
