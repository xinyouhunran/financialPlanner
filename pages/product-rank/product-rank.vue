<template>
	<view class="container">
		<view class="l-status"></view>
		<view class="product-rank">
			<view class="public-private l-flex l-flex-ai_c l-flex-jc_sb l-view">
				<view class="l" @tap="$back(1)">
					<image src="../../static/back@2x.png" mode=""></image>
				</view>
				<view class="m l-flex">
					<view :class="{'m-active':productTag==0}" @tap="changeProduct(0)">
						公募
					</view>
					<view :class="{'m-active':productTag==1}" @tap="changeProduct(1)">
						私募
					</view>
				</view>
				<view class="r">
					<image src="../../static/ss@2x.png" mode=""></image>
				</view>
			</view>
			
			<view class="filter">
				<view class="l-flex l-flex-ai_c">
					<ms-dropdown-menu @close="close1">
						<ms-dropdown-item v-model="proTypeIndex" :list="productType" ref="dropdownItem"></ms-dropdown-item>
					</ms-dropdown-menu>
					<!-- <view class="">
						全部
					</view>
					<view class="">
						<image src="../../static/down@2x.png" mode=""></image>
					</view> -->
				</view>
				<view class="l-flex l-flex-ai_c">
					<ms-dropdown-menu @close="close">
						<ms-dropdown-item v-model="proTimeIndex" :list="productTime" ref="dropdownItem1"></ms-dropdown-item>
					</ms-dropdown-menu>
					<!-- <view class="">
						近一年
					</view>
					<view class="">
						<image src="../../static/down@2x.png" mode=""></image>
					</view> -->
				</view>
			</view>
			
			<view class="tableTitle l-flex l-flex-ai_c">
				<view class="l">
					基金简称
				</view>
				<view class="l-flex m l-flex-ai_c">
					<view class="color82">
						最新净值
					</view>
					<template>
						<view>
							<image src="../../static/product/selectdown.png" mode=""></image>
						</view>
					</template>
				</view>
				<view class="l-flex r l-flex-ai_c">
					<view class="color82">
						{{productTime[proTimeIndex].text}}
					</view>
					<template>
						<view>
							<image src="../../static/product/selectup.png" mode=""></image>
						</view>
					</template>
				</view>
			</view>
			
			<view class="l-view">
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
						<view class="">
							1.5345
						</view>
						<view class="">
							03-26
						</view>
					</view>
					<view class="time" :class="{'red':value>0,'green':value<0}">
						+15.68%
					</view>
					<view class="focuson">
						<image src="../../static/product/xx@2x.png" mode="" v-if="focusvalue"></image>
						<image src="../../static/product/xxx@2x.png" mode="" v-else></image>
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
				value:1,
				focusvalue:0,
				
				productTag:0,
				proTypeIndex:0,
				proTimeIndex:6,
				productType:[],
				productTypePublic:[{
					text:'全部',
					value:0
				},{
					text:'股票型',
					value:1
				},{
					text:'混合型',
					value:2
				},{
					text:'债券型',
					value:3
				},{
					text:'指数型',
					value:4
				},{
					text:'QDII型',
					value:5
				},{
					text:'FOF型',
					value:6
				}],
				productTypePravite:[{
					text:'全部',
					value:0
				},{
					text:'股票策略',
					value:1
				},{
					text:'宏观策略',
					value:2
				},{
					text:'复合策略',
					value:3
				},{
					text:'相对价值',
					value:4
				},{
					text:'固定收益',
					value:5
				},{
					text:'事件驱动',
					value:6
				}],
				productTime:[{
					text:'今年来',
					value:0
				},{
					text:'日涨幅',
					value:1
				},{
					text:'近一周',
					value:2
				},{
					text:'近一月',
					value:3
				},{
					text:'近三月',
					value:4
				},{
					text:'近六月',
					value:5
				},{
					text:'近一年',
					value:6
				}],	
			}
		},
		beforeMount() {
			this.productType = this.productTypePublic;
		},
		methods: {
			changeProduct(tag){
				this.productTag = tag;
				this.productType = tag==0?this.productTypePublic:this.productTypePravite;
				this.$refs.dropdownItem.choose({text:'全部',value:0})
				this.proTypeIndex = 0;
			},
			close() {
				this.$refs.dropdownItem.closePopup()
			},
			close1() {
				this.$refs.dropdownItem1.closePopup()
			}
		}
	}
</script>

<style scoped lang="scss">
.product-rank{
	position: relative;
}
.public-private{
	z-index: 1;
	height: 88rpx;
	position: fixed;
	width: calc(100% - 48rpx);
	top: 0;
	padding-top: var(--status-bar-height);
	background-color: #FFFFFF;
	.l{
		width: 10px;
		height: 17px;
	}
	.m{
		font-size: 17px;
		color: #828282;
		view:nth-of-type(1){
			margin-right: 48rpx;
		}
	}
	.m-active{
		color: #242424;
	}
	.r{
		width: 34rpx;
		height: 34rpx;
	}
}
.filter{
	z-index: 1;
	background-color: #FFFFFF;
	position: fixed;
	width: 100%;
	top: calc(88rpx + var(--status-bar-height));
	height: 100rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	image{
		width: 12px;
		height: 6px;
		margin-left: 14rpx;
	}
}
.tableTitle{
	margin-top: 94px;
	height: 80rpx;
	background-color: #F4F4F4;
	.l{
		margin-left: 76rpx;
	}
	.m{
		margin-left: 150rpx;
	}
	.r{
		margin-left: 84rpx;
	}
	image{
		width: 5px;
		height: 9px;
		margin-left: 10rpx;
	}
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
.red{
	color: #E70012;
}
.green{
	color: green;
}
</style>
