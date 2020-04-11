<template>
	<view class="container">
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
			
			<view class="twotab l-flex l-flex-ai_c l-flex-jc_sb">
				<view class="bj l-flex l-flex-ai_c" @tap="$nav({url:'/pages/personal-card/person-edit'})">
					<image src="../../static/person/bj@2x.png" mode=""></image>
					<view class="">
						编辑名片
					</view>
				</view>
				<view class="zhanline">
					
				</view>
				<view class="sharecard" @tap="$nav({url:'/pages/personal-card/person-share'})">
					分享名片
				</view>
			</view>
			
			<person-textarea class="person-text" title="个人描述"></person-textarea>
			<person-textarea class="honor-text" title="所获荣誉"></person-textarea>
			
			<person-upload class="zyzp" title="展业照片/视频" addText="添加图片" addTip="每张图片都是一次展业的机会"></person-upload>
			<person-upload class="tjcp" title="推荐产品" addText="添加产品" addTip="更容易提升客户投资意向" @selectPro="selectPro"></person-upload>
		</view>
	</view>
</template>

<script>
	import personTextarea from './person-textarea.vue';
	import personUpload from './person-upload.vue';
	export default {
		data() {
			return {

			}
		},
		components:{
			personTextarea,
			personUpload
		},
		methods: {
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
			},
			selectPro(){
				this.$nav({url:'/pages/product/product-select'});
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	min-height: 100vh;
	background: url(../../static/personcardbg.png)#F4F4F4 no-repeat;
	background-size: 750rpx 978rpx;
	overflow: hidden;
	padding-bottom: 40rpx;
}
.person{
	height: 200px;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	margin-top: 60rpx;
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
.twotab{
	margin: 20rpx 0;
	height: 96rpx;
	background-color: #FFFFFF;
	border-radius: 48rpx;
	font-size: 17px;
	.bj{
		margin-left: 82rpx;
		image{
			width: 19px;
			height: 19px;
			margin-right: 7px;
		}
	}
	.zhanline{
		margin-left: 40px;
		width: 2rpx;
		height: 50rpx;
		background-color: #cfcfcf;
	}
	.sharecard{
		width: 320rpx;
		height: 100%;
		background-color: #D3A35C;
		border-radius: 48rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 12px;
	}
}
.person-text,.honor-text,.zyzp,.tjcp{
	border-radius: 16rpx;
}
.honor-text,.zyzp,.tjcp{
	margin-top: 20rpx;
}
</style>
