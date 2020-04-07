<template>
	<view>
		<view class="l-titleNView-fixed">
			<view class="l-status"></view>
			<view class="l-titleNView-content l-flex l-flex-ai_c">
				<view class="l-titleNView-nav l-flex l-flex-ai_c" >
					<view class="l-title-icon1">
						
					</view>
					<view class="l-title-t">
						用户中心
					</view>
					<view class="l-title-icon2" @tap="$nav({url:'/pages/mine/setting'})">
						
					</view>
					<view class="l-title-icon3" @tap="$nav({url:'/pages/index/index'},'switchTab')">
						首页
					</view>
				</view>
			</view>
		</view>
		
		<view class="mine-head">
			<view class="l-status"></view>
			<view class="l-title-zhanwei"></view>
			<view class="l-flex">
				<image src="../../static/logo.png" mode="aspectFill" @tap="getImage"></image>
				<view class="l-flex l-flex-direction">
					<view class="l-flex">
						<view class="l-p">
							木村咧
						</view>
						<view class="l-span">
							认证
						</view>
					</view>
					<view class="l-phone">
						7528957892
					</view>
				</view>
			</view>
		</view>
		
		<view class="mine-tab mbb">
			<view class="uni-flex l-flex-jc_sa mine-tab-t mbb">
				<view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<text>个人名片</text>
				</view>
				<view>
					<image src="../../static/logo.png" mode=""></image>
					<text>个人名片</text>
				</view>
				<view>
					<image src="../../static/logo.png" mode=""></image>
					<text>个人名片</text>
				</view>
				<view>
					<image src="../../static/logo.png" mode=""></image>
					<text>132</text>
				</view>
			</view>
			<view class="l-flex l-flex-jc_sb account l-flex-ai_c">
				<view class="">
					账户总览(万)
				</view>
				<view class="l-flex l-flex-ai_c">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="account-cash">
						100.00
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="l-flex mine-private l-flex-jc_sa">
				<view class="private-img">
					
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sa">
					<view class="">
						私人客户经理
					</view>
					<view class="">
						为您提供1V1专业理财顾问服务
					</view>
				</view>
				<view class="l-flex l-flex-as_c">
					<template>
						<view v-if="true">1</view>
						<view v-else>2</view>
					</template>
					<view class="">
						在线
					</view>
				</view>
			</view>
		</view>
		
		<view class="four-line mbt">
			<view class="line-operation mbb">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="">
						风险测评
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="line-operation mbb">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="">
						实名信息
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						未认证
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="line-operation mbb">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="">
						合格投资者
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						未认证
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="line-operation mbb">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="">
						会员特权
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<view class="three-line mbt">
			<view class="line-operation mbb">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="">
						意见反馈
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="line-operation mbb">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="">
						常见问题
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="line-operation mbb">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="">
						关于融总管
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<view class="l-flex customer-service l-flex-jc_c">
			融融客服热线：&nbsp;&nbsp;400-xxx-xxxx
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				online:true,
			}
		},
		methods: {
			getImage(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res);
						console.log(this);
						uni.previewImage({
							urls:res.tempFilePaths,
							success: ()=>{
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.l-titleNView {
	width: 100%;
}

.l-titleNView-fixed{
	position: fixed;
	z-index: 800;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #2B2A2A;
}
.l-titleNView-nav{
	position: relative;
}
.l-titleNView-content {
	height: 116rpx;	
}
.l-title-icon1{
	width: 48rpx;
	height: 48rpx;
	border: 1px solid #FFFFFF;
	margin-left: 32rpx;
}
.l-title-icon2{
	width: 48rpx;
	height: 48rpx;
	border: 1px solid #FFFFFF;
	margin-left: 490rpx;
}
.l-title-icon3{
	width: 56rpx;
	height: 56rpx;
	border: 1px solid #FFFFFF;
	border-radius: 56rpx;
	margin-left: 36rpx;
	color: #FFFFFF;
	line-height: 56rpx;
	font-size: 20rpx;
	text-align: center;
}

.l-title-zhanwei{
	height: 116rpx;
}
.l-title-t{
	height: 116rpx;
	text-align: center;
	width: 100vw;
	line-height: 116rpx;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	color: #FFFFFF;
	font-size: 32rpx;
	z-index: -1;
}
.mine-head{
	padding: 42rpx 42rpx 22rpx 42rpx;
	border-bottom: 1px solid #BBBBBB;
	image{
		width: 102rpx;
		height: 102rpx;
	}
	.l-p{
		margin-left: 28rpx;
		margin-top: 8rpx;
		color: rgba(16, 16, 16, 1);
		font-size: 18px;
	}
	.l-span{
		margin-left: 28rpx;
		margin-top: 16rpx;
		position: relative;
		font-size: 12rpx;
		color: #101010;
	}
	.l-span::before{
		content: '';
		position: absolute;
		left: -12rpx;
		top: 0;
		width: 14rpx;
		height: 7px;
		background: url('../../static/logo.png') no-repeat;
		background-size: cover;
	}
	.l-phone{
		margin-left: 28rpx;
		margin-top: 18rpx;
	}
}
.mbb{
	border-bottom: 1px solid #BBBBBB;
}
.mbt{
	border-top: 1px solid #BBBBBB;;
}
.mine-tab{
	padding: 24rpx 24rpx 34rpx 24rpx;
	.mine-tab-t{
		font-size: 20rpx;
		color: #2B2A2A;
		padding-bottom: 24rpx;
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 20rpx;
			color: #101010;
		}
		image{
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 18rpx;
		}
	}
	.account{
		height: 80rpx;
		font-size: 22rpx;
		font-weight: bold;
		image{
			width: 48rpx;
			height: 48rpx;
		}
		.account-cash{
			color: #D3A10C;
			margin: 0 8rpx;
			font-size: 28rpx;
		}
	}
	.mine-private{
		background-color: #979393;
		padding: 24rpx;
		color: #FFFFFF;
		font-size: 22rpx;
		.private-img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			background-color: #080808;
		}
	}
}
.four-line,.three-line{
	margin-top: 22rpx;
}
.line-operation{
	display: flex;
	justify-content: space-between;
	padding: 22rpx 34rpx 22rpx 20rpx;
	align-items: center;
	image{
		width: 48rpx;
		height: 48rpx;
	}
	.left{
		image{
			margin-right: 36rpx;
		}
		view{
			font-size: 28rpx;
			color: #101010;
		}
	}
	.right{
		view{
			color: #1E4FDF;
			font-size: 20rpx;
		}
		image{
			margin-left: 20rpx;
		}
	}
}
.customer-service{
	margin-top: 62rpx;
	color: #979393;
	font-size: 28rpx;
}
</style>
