<template>
	<view class="pc-container">
		<!-- <view class="card l-flex l-flex-direction l-flex-ai_c">
			<view class="l-flex">
				<view class="">
					<image :src="imgurl" mode="aspectFill"></image>
					<view class="l-span">
						认证
					</view>
				</view>
				<view class="message">
					<view>姓名：&nbsp;&nbsp;木村林</view>
					<view>手机：&nbsp;&nbsp;13214564987</view>
					<view>专业：&nbsp;&nbsp;木村林</view>
					<view>邀请码：&nbsp;&nbsp;13213</view>
				</view>
			</view>
			
			<view class="introduce">
				您好，我是认证理财师木村凛，这是我的二维码名片，请惠存!
			</view>
			
			<view class="code">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="scan">
				扫码进入“融名片”小程序
			</view>
			<view class="add">
				添加我的名片
			</view>
		</view> -->
		
		<image :src="imgurl" mode="aspectFill" @longpress="saveImage"></image>
		<canvas canvas-id="mycanvas" style="width: 590rpx;height: 998rpx;" v-show="canvasShow"></canvas>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgurl:'',
				canvasShow:true,
			}
		},
		/* onShow() {
			if(this.$getStorage('person-card')){
				this.canvasShow = false;
				this.imgurl = this.$getStorage('person-card');
			}
		}, */
		onHide() {
			this.$removeStorage('person-card');
		},
		mounted() {
			if(this.$getStorage('person-card')){
				this.canvasShow = false;
				this.imgurl = this.$getStorage('person-card');
			}else{
				this.canvasImage();
			}	
		},
		methods: {
			canvasImage(){
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				let myCanvas = uni.createCanvasContext('mycanvas', this); 
				//画布尺寸
				//myCanvas.rect(0,0,283,479);
				//myCanvas.rect(0,0,293,497);
				//myCanvas.setStrokeStyle('#BBBBBB'); 
				//myCanvas.stroke(); 
				// 坐标(0,0) 表示从此处开始绘制，相当于偏移。
				//头像
				myCanvas.drawImage('../../static/logo.png',33,44,65,65);
				//参数：图片，左偏移，上偏移，宽，高
				//认证图标
				myCanvas.drawImage('../../static/logo.png',44,117,7,7);
				
				let phone = '12456798798';
				myCanvas.fillStyle = '#101010';
				
				let fontSize = 10;
				myCanvas.font = `${fontSize}px Arial`;//绘制文字
				myCanvas.fillText('认证',55,124);
				let fontSizea = 14;
				myCanvas.font = `${fontSizea}px Arial`;//绘制文字
				myCanvas.fillText('姓名：  木村林',124,58);
				myCanvas.fillText(`手机：  ${phone}`,124,76);
				myCanvas.fillText('专业：  木村林',124,94);
				myCanvas.fillText('邀请码：  木村林',124,112);
				
				myCanvas.fillText('您好，我是认证理财师木村凛，',49,167);
				myCanvas.fillText('这是我的二维码名片，请惠存!',49,185); 
				//二维码
				myCanvas.drawImage('../../static/logo.png',55,223,183,183);
				 
				myCanvas.fillText('扫码进入“融名片”小程序',69,432);
				myCanvas.fillText('添加我的名片',103,458);  
				
				//开始绘画
				myCanvas.draw(true,()=>{
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						success: (res) => {
							// 在H5平台下，tempFilePath 为 base64
							this.imgurl = res.tempFilePath;
							this.canvasShow = false;
							uni.hideLoading();
							this.$setStorage('person-card',this.imgurl);
						  },
					    fail: () => {
							uni.showToast({
								title: '名片加载失败',
								duration: 2000 
							});
					    }
					});
				});
				
			},
			saveImage(){
				uni.showActionSheet({
				    itemList: ['保存图片','取消'], 
				    success: (res) => {
				        if(res.tapIndex == 0){
							uni.saveImageToPhotosAlbum({
								filePath: this.imgurl,//	图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
								success: () => {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									});
								},
								fail: () => {
									uni.showToast({
										title: '保存失败',
										duration: 2000 
									});
								}
							});
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	image{
		width: 99%;
		min-height: 996rpx;
		border: 1px solid #BBBBBB;
	}
.pc-container{
	width: 590rpx;
	height: 1000rpx;
	margin: 0 auto;
	padding-top: 46rpx;
	overflow: hidden;
	.card{
		padding: 44rpx 0 50rpx 0;
		border: 1px solid #BBBBBB;
		image{
			width: 130rpx;
			height: 130rpx;
		}
		.message{
			margin-left: 48rpx;
			view{
				margin-top: 8rpx;
			}
		}		
	}
	.l-span{
		margin-top: 14rpx;
		position: relative;
		font-size: 20rpx;
		color: #101010;
		text-align: center;
	}
	.l-span::before{
		content: '';
		position: absolute;
		left: 26rpx;
		top: 2rpx;
		width: 14rpx;
		height: 14rpx;
		background: url('../../static/logo.png') no-repeat;
		background-size: cover;
	}
	.introduce{
		width: 394rpx;
		margin-top: 120rpx;
	}
	.code{
		width: 366rpx;
		height: 366rpx;
		margin-top: 68rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.scan{
		margin-top: 28rpx;
	}
	.add{
		margin-top: 20rpx;
	}
}
</style>
