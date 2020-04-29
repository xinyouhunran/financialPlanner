<template>
	<view class="container">
		<!-- <view class="l-status"></view>
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
					<image src="../../static/righttj@2x.png" mode="" @tap="$nav({url:'/pages/my-choice/product-choice'})"></image>
				</view>
			</view>
		</view>
		
		<template v-if="productChoice">	
			<view class="tableTitle l-flex l-flex-ai_c l-flex-jc_sb l-view">
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
						近一个月
					</view>
					<template>
						<view>
							<image src="../../static/product/selectup.png" mode=""></image>
						</view>
					</template>
				</view>
			</view>
			<view class="l-view bgffffff">
				<view class="product-item l-bb">
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
				</view>
				<view class="addChoice">
					<view class="">
						<image src="../../static/product/tjyellow.png" mode=""></image>
					</view>
					<view class="">
						添加自选
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="l-view">
				<view class="smart-choice">
					<view class="t l-flex l-flex-ai_c l-flex-direction">
						<view class="">
							智能选基金
						</view>
						<view class="">
							上千款基金，为您智选
						</view>
					</view>
					<view class="b">
						<view class="item">
							<view class="top">
								<span>景林全球基金+...</span>
							</view>
							<view class="l-flex middle">
								<view class="">	
									330.62%
								</view>
								<view class="">
									成立来
								</view>
							</view>
							<view class="l-flex bottom">
								<view class="">
									波动小
								</view>
								<view class="">
									<image src="../../static/product/gxl@2x.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="top">
								<span>景林全球基金+...</span>
							</view>
							<view class="l-flex middle">
								<view class="">	
									330.62%
								</view>
								<view class="">
									成立来
								</view>
							</view>
							<view class="l-flex bottom">
								<view class="">
									波动小
								</view>
								<view class="">
									<image src="../../static/product/gxl@2x.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="top">
								<span>景林全球基金+...</span>
							</view>
							<view class="l-flex middle">
								<view class="">	
									330.62%
								</view>
								<view class="">
									成立来
								</view>
							</view>
							<view class="l-flex bottom">
								<view class="">
									波动小
								</view>
								<view class="">
									<image src="../../static/product/gx@2x.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="top">
								<span>景林全球基金+...</span>
							</view>
							<view class="l-flex middle">
								<view class="">	
									330.62%
								</view>
								<view class="">
									成立来
								</view>
							</view>
							<view class="l-flex bottom">
								<view class="">
									波动小
								</view>
								<view class="">
									<image src="../../static/product/gx@2x.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="l-flex">
					<view class="yjtj">
						一键添加
					</view>
					<view class="hyp">
						换一批
					</view>
				</view>
			</view>
			<view class="none-choice l-flex l-flex-direction l-flex-ai_c">
				<image src="../../static/product/13@2x.png" mode="" @tap="$nav({url:'/pages/my-choice/product-choice'})"></image>
				<view class="">
					没有自选，点击添加 
				</view>
			</view>	
		</template> -->
		<web-view :src="webSrc" v-if="webSrc"></web-view>
	</view>
</template>

<script>
	import {geth5} from '@/utils/geth5.js'
	export default {
		data() {
			return {
				userId:'',
				flag:'7',
				webSrc:'',
				
				productTag:0,
				value:1,
				productChoice:0 
			}
		},
		onLoad(obj) {
			if(typeof this.$getStorage('user')==='object'){
				let user = this.$getStorage('user').userInfo;
				this.userId = user.id;
				this.$toast('正在加载...',{duration:4000})
				geth5(this.flag,this.userId
				).then(data=>{
					this.webSrc = data;
				}).catch(err=>{
					/* if(err=='307'){
						this.$nav({url:'/pages/register/register'})
					} */
				})
			}else{
				this.$toast('您还未登录，即将跳转登录页',{
					fn:()=>{
						setTimeout(()=>{
							this.$nav({url:'/pages/register/register'})
						},3000)
					}
				});
			}
		},
		methods: {
			changeProduct(tag){
				this.productTag = tag;
			},
		}
	}
</script>

<style lang="scss" scoped>
/* .container{
	background-color: #F4F4F4;
	min-height: 100vh;
} */
.public-private{
	height: 88rpx;
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
.tableTitle{
	height: 80rpx;
	background-color: #F4F4F4;
	/* .l{
		margin-left: 76rpx;
	} */
	/* .m{
		margin-left: 204rpx;
	} */
	/* .r{
		margin-left: 84rpx;
	} */
	image{
		width: 5px;
		height: 9px;
		margin-left: 10rpx;
	}
}
.bgffffff{
	background-color: #FFFFFF;
}
.product-item{
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.name{
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
		margin-left: -160rpx;
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
		//margin-left: 72rpx;
		font-size: 15px;
		margin-right: 10rpx;
	}
}
.addChoice{
	height: 96rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 15px;
	image{
		width: 44rpx;
		height: 44rpx;
		margin-right: 12rpx;
	}
}
.smart-choice{
	background-color: #FFFFFF;
	//height: 578rpx;
	margin-top: 102rpx;
	.t{
		
		view:nth-of-type(1){
			margin-top: 34rpx;
			font-size: 18px;
		}
		view:nth-of-type(2){
			margin-top: 20rpx;
			font-size: 15px;
			color: #afafaf;
		}
	}
	.b{
		margin-top: 56rpx;
		display: flex;
		flex-wrap: wrap;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 50%;
			margin-bottom: 70rpx;
			.top{
				width: 232rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: pre;
				font-size: 16px;
			}
			.middle{
				margin-top: 18rpx;
				view:nth-of-type(1){
					color: #E70012;
					font-size: 18px;
				}
				view:nth-of-type(2){
					color: #afafaf;
					font-size: 12px;
					align-self: flex-end;
					margin-left: 4rpx;
					margin-bottom: 4rpx;
				}
			}
			.bottom{
				margin-top: 18rpx;
				view:nth-of-type(1){
					width: 90rpx;
					height: 34rpx;
					background-color: #D3A35C;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
					font-size: 12px;
					border-radius: 4rpx;
				}
				view:nth-of-type(2){
					width: 34rpx;
					height: 34rpx;
					margin-left: 40rpx;
				}
			}
		}
	}
}
.yjtj{
	width: 50%;
	height: 80rpx;
	background-color: #D3A35C;
	color: #FFFFFF;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.hyp{
	width: 50%;
	height: 80rpx;
	background-color: #EDEDED;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center; 
}
.none-choice{
	margin-top: 92rpx;
	image{
		width: 76rpx;
		height: 76rpx;
		margin-bottom: 22rpx;
	}
}
</style>
