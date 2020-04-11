<template>
	<view class="finnance">
		<view class="l-view">
			<view class="person" @tap="$nav({url:'/pages/personal-card/personal-card'})">
				<view class="person-t l-flex l-flex-jc_sb">
					<view class="person-l">
						<view class="name">
							李丽华
						</view>
						<view class="persontag">
							<image src="../../static/finance/lc@3x.png" mode=""></image>
							<view class="">
								理财总监
							</view>
						</view>
						<view class="persontag">
							<image src="../../static/finance/gs@3x.png" mode=""></image>
							<view class="">
								诺亚财富
							</view>
						</view>
						<view class="persontag">
							<image src="../../static/finance/ad.png" mode=""></image>
							<view class="">
								建立个人品牌
							</view>
						</view>
					</view>
					<view class="person-r" @tap.stop="uploadPic">
						<image src="../../static/finance/tx@3x.png" mode="" class="photo"></image>
						<view class="camera">
							<image src="../../static/finance/xj@3x.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="person-b">
					<view class="">
						个人简介：加强5G、数据中心、工业互联网等“新基建”建设…
					</view>
				</view>
			</view>
		</view>
		<view class="manager l-flex l-flex-ai_c l-view">
			<view class="left-boder">
				
			</view>
			<view class="">
				基金经理
			</view>
		</view>
		<view class="finance-m">
			<view class="l-view">
				<view class="finance-mm" ref="copyId">
					<view class="title">
						投资者3天亏完历史收益还倒贴30万美元资产为什么变成收割机？
					</view>
					<view class="content cborder">
						1、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
					</view>
					<view class="content cborder">
						2、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
					</view>
					<view class="content cborder">
						3、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
					</view>
				</view>
				
				<view class="finance-b l-flex l-flex-ai_c">
					<view class="copy" @tap="copyContent">
						复制
					</view>
					<view class="forward">
						<image src="../../static/finance/zf@3x.png" mode=""></image>
					</view>
					<view class="myshare">
						<image src="../../static/finance/5@3x.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="manager l-flex l-flex-ai_c l-view">
			<view class="left-boder">
				
			</view>
			<view class="">
				财经头条
			</view>
		</view>
		<view class="finance-m">
			<view class="l-view">
				<view class="finance-mm toutiao">
					<view class="title">
						投资者3天亏完历史收益还倒贴30万美元资产为什么变成收割机？
					</view>
					<view class="content cborder">
						1、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
					</view>
					<view class="content cborder">
						2、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
					</view>
					<view class="content cborder">
						3、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
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
				
			}
		},
		methods: {
			copyContent(){
				uni.setClipboardData({
				    data: 'hello',
				    success: ()=>{
				        this.$toast('复制成功');
				    }
				});
			},
			uploadPic(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res);
						let url = '/user/center/img/upload';
						this.$upload(url,res.tempFilePaths[0],{
							formData:{type:0}
						}).then(data=>{
							console.log(data);
						}).catch(err=>{
							this.$toast(err);
						})
						/* uni.previewImage({
							urls:res.tempFilePaths,
							success: ()=>{
							}
						}) */
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.finnance{
	background:url(../../static/zbyw_back.png) no-repeat;
	background-size: cover;
	overflow: hidden;
	padding-bottom: 120rpx;
}
.person{
	height: 200px;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	margin-top: 30rpx;
	overflow: hidden;
	padding: 0 42rpx;
	&-t{
		padding-top: 30rpx; 
	}
	&-r{
		width: 160rpx;
		height: 160rpx;
		position: relative;
		.camera{
			position: absolute;
			bottom: 0;
			right: -16rpx;
			padding: 12rpx;
			border-radius: 54rpx;
			box-shadow: 0px 0px 1px #404691;
			background-color: #FFFFFF;
			image{
				width: 29rpx;
				height: 29rpx;
			}
		}
	}
	.name{
		margin: 20rpx 0;
		font-size: 24px;
	}
	.persontag{
		display: flex;
		font-size: 13px;
		margin-top: 14rpx;
		image{
			width: 26rpx;
			height: 13px;
			margin-right: 6rpx;
		}
	}
	&-b{
		margin-top: 80rpx;
		font-size: 12px;
		view{
			width: 415rpx;
			line-height: 16px;
		}
	}
}
.manager{
	height: 80rpx;
	background-color: #2D3270;
	color: #fff;
	margin-top: 30rpx;
	font-size: 15px;
	.left-boder{
		width: 8rpx;
		height: 40rpx;
		border-radius: 4rpx;
		background-color: #FFFFFF;
		margin-right: 20rpx;
	}
}
.finance-m{
	margin-top: 20rpx;
	.cborder{
		border-top: 1px solid #F4F4F4;
	}
	.finance-mm{
		background-color: #FFFFFF;
		padding: 0 40rpx;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		.title{
			font-size: 18px;
			font-weight: bold;
			line-height: 52rpx;
			padding: 40rpx 0;
		}
		.content{
			padding: 36rpx 0;
			line-height: 42rpx;
			font-size: 15px;
		}
	}
	.finance-b{
		position: relative;
		height: 100rpx;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
		background-color: #FFFFFF;
		justify-content: flex-end;
		padding: 0 40rpx;
		border-top: 1px solid #C1C1C1;
		.copy{
			color: #49A6E9;
			font-size: 15px;
			margin-right: 54rpx;
		}
		.forward{
			width: 28rpx;
			height: 14px;
		}
		.myshare{
			padding: 24rpx;
			border-radius: 96rpx;
			background-color: #000000;
			position: fixed;
			right: 12px;
			bottom: 76px;
			image{
				width: 48rpx;
				height: 48rpx; 
			}
		}
	}
}
.toutiao{
	border-bottom-left-radius: 16rpx;
	border-bottom-right-radius: 16rpx;
}
</style>
