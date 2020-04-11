<template>
	<view class="container">
		<view class="person-edit">
			<view class="l-status"></view>
			<view class="title l-flex l-view l-flex-jc_sb">
				<view class="" @tap="$back(1)">
					<image src="../../static/backwhite@2x.png" mode=""></image>
				</view>
				<view class="">
					编辑名片
				</view>
				<view class="">
					
				</view>
			</view>
			
			<view class="person-r" @tap.stop="uploadPic">
				<image src="../../static/finance/tx@3x.png" mode="" class="photo"></image>
				<view class="camera">
					<image src="../../static/finance/xj@3x.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="form-edit">
			<view class="form-item l-bb">
				<view class="l">
					姓名
				</view>
				<view class="r">
					<input type="text" value="" placeholder="请输入姓名" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb">
				<view class="l">
					公司/机构
				</view>
				<view class="r">
					<input type="text" value="" placeholder="请输入您所属机构或公司" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb">
				<view class="l">
					职位
				</view>
				<view class="r">
					<input type="text" value="" placeholder="请输入您的职位" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item">
				<view class="l">
					手机号
				</view>
				<view class="r">
					<input type="text" value="" placeholder="请输入手机号" placeholder-class="placeclass"/>
				</view>
			</view>
		</view>
		
		<view class="form-edit form-edit1">
			<view class="form-item l-bb">
				<view class="l">
					邮箱
				</view>
				<view class="r">
					<input type="text" value="" placeholder="请输入您的邮箱" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb">
				<view class="l">
					微信号
				</view>
				<view class="r">
					<input type="text" value="" placeholder="请输入您的微信号" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb">
				<view class="l">
					所在地
				</view>
				<view class="r l-flex l-flex-ai_c">
					<template>
						<view class="selectprovice" @tap="selectProvice">请选择城市</view>
						<view class="downgrey">
							<image src="../../static/downgrey.png" mode=""></image>
						</view>
					</template>
					<!-- <template>
						<view class="selectcity">请选择城市</view>
						<view class="downgrey">
							<image src="../../static/downgrey.png" mode=""></image>
						</view>
					</template> -->
					
				</view>
			</view>
		</view>
		
		<person-textarea class="person-text" title="个人描述"></person-textarea>
		<person-textarea class="honor-text" title="所获荣誉"></person-textarea>
		
		<person-upload class="zyzp" title="展业照片/视频" addText="添加图片" addTip="每张图片都是一次展业的机会"></person-upload>
		
		<view class="deposit l-flex l-flex-jc_c l-flex-ai_c">
			保存
		</view>
		
		<w-picker
			mode="region"
			:value="defaultRegion"
			default-type="value"
			:hide-area="true"
			@confirm="onConfirm($event,'region')"
			ref="region" 
		></w-picker>
	</view>
</template>

<script>
	import personTextarea from './person-textarea.vue';
	import personUpload from './person-upload.vue';
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				defaultRegion:[],
			}
		},
		components:{
			personTextarea,
			personUpload,
			wPicker
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
			selectProvice(){
				this.$refs.region.show();
			},
			onConfirm(e,str){
				this.$toast(e.obj.city.label)
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	min-height: 100vh;
	background: url(../../static/editcard.png)#F4F4F4 no-repeat;
	background-size: 750rpx calc(380rpx + var(--status-bar-height));
	overflow: hidden;
}
.person-edit{
	.title{
		margin-top: 34rpx;
		font-size: 17px;
		color: #FFFFFF;
		image{
			width: 20rpx;
			height: 34rpx;
		}
	}
	.person-r{
		width: 160rpx;
		height: 160rpx;
		position: relative;
		margin: 76rpx auto;
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
}
.form-edit{
	background-color: #FFFFFF;
	padding: 0 24rpx;
}
.form-edit1{
	margin-top: 20rpx;
}
.form-item{
		display: flex;
		height: 100rpx;
		align-items: center;
		.l{
			width: 148rpx;
			font-size: 16px;
		}
		.r{
			flex: 1;
			margin-left: 24rpx;
			input{
				font-size: 15px;
			}
		}
		.placeclass{
			font-size: 15px;
			color: #C5C5C5;
		}
}
.selectprovice,.selectcity{
	color: #c5c5c5;
}
.selectcity{
	margin-left: 156rpx; 
}
.downgrey{
	width: 28rpx;
	height: 18rpx;
	margin-left: 11rpx;
}
.person-text,.honor-text,.zyzp,.tjcp{
	//border-radius: 16rpx;
}
.person-text,.honor-text,.zyzp,.tjcp{
	margin-top: 20rpx;
}
.deposit{
	background-color: #D3A35C;
	width: 680rpx;
	margin: 30rpx auto;
	height: 47px;
	color: #fff;
	border-radius: 46rpx; 
}
</style>
