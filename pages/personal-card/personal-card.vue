<template>
	<view class="container">
		<view class="l-view">
			<view class="person">
				<view class="person-t l-flex l-flex-jc_sb">
					<view class="person-l">
						<view class="name" v-text="user.fullName || userCardInfo.fullName">
							<!-- {{userCardInfo.fullName}} -->
						</view>
						<view class="persontag">
							<image src="../../static/finance/lc@3x.png" mode=""></image>
							<view class="" v-text="userCardInfo.position">
								
							</view>
						</view>
						<view class="persontag">
							<image src="../../static/finance/gs@3x.png" mode=""></image>
							<view class="" v-text="user.orgName || userCardInfo.company">
								
							</view>
						</view>
						<view class="persontag">
							<image src="../../static/finance/ad.png" mode=""></image>
							<view class="">
								建立个人品牌
							</view>
						</view>
					</view>
					<view class="person-r">
						<image :src="user.headPortrait ? user.headPortrait :'../../static/finance/tx@3x.png'" mode="aspectFill" style="border-radius: 160rpx;"></image>
						<view class="camera" @tap.stop="getImage(1,true)">
							<image src="../../static/finance/xj@3x.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="person-b">
					<view class="">
						个人简介：{{userCardInfo.personalIntroduction}}
					</view>
				</view>
			</view>
			
			<view class="twotab l-flex l-flex-ai_c l-flex-jc_sb">
				<view class="bj l-flex l-flex-ai_c" @tap="$nav({url:`/pages/personal-card/person-edit?userCardInfo=${JSON.stringify(userCardInfo)}`})">
					<image src="../../static/person/bj@2x.png" mode=""></image>
					<view class="l-flex-1">
						编辑名片
					</view>
				</view>
				<view class="zhanline">
					
				</view>
				<view class="sharecard" @tap="isShare = true">
					分享名片
				</view>
			</view>
			
			<person-textarea class="person-text" title="个人描述" ref="personalIntroduction"></person-textarea>
			<person-textarea class="honor-text" title="所获荣誉" ref="glory"></person-textarea>
			
			<template>
				<view class="person-upload" v-if="zyImg">
					<view class="person-upload-t">
						展业照片
					</view>
					<image :src="zyImg" mode="" class="person-upload-img"></image>
				</view>
				<person-upload class="zyzp" title="展业照片" addText="添加图片" addTip="每张图片都是一次展业的机会" @selectUpload="goEdit" v-else></person-upload>
			</template>
			<template>
				<view class="person-upload" v-if="zyVideo">
					<view class="person-upload-t">
						展业视频
					</view>
					<view class="my-video">
						<video class="my-video" objectFit="contain"
						:src="zyVideo" controls v-if="zyVideo">
						</video>
					</view>
					
				</view>
				<person-upload class="zyzp" title="视频" addText="添加视频" addTip="每个视频都是一次展业的机会" @selectUpload="goEdit" v-else></person-upload>
			</template>
			
			
			<!-- <person-upload class="tjcp" title="推荐产品" addText="添加产品" addTip="更容易提升客户投资意向" @selectPro="selectPro"></person-upload> -->
		</view>
		<share-pop @close="isShare = false" v-if="isShare" :dataInfo="shareInfo"></share-pop>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import personTextarea from './person-textarea.vue';
	import personUpload from './person-upload.vue';
	import config from "@/utils/config.js";
	export default {
		data() {
			return {
				userCardInfo:{},
				zyImg:'',
				pageInfo:{
					pageIndex:1,
					pageSize:10
				},
				zyVideo:'',
				shareInfo:{
					 
				},
				isShare:false
			}
		},
		computed:{
			...mapState({
				hasLogin:'hasLogin',
				qualified:'qualified',
				user:'user'
			})
		},
		components:{
			personTextarea,
			personUpload
		},
		onLoad(obj) {
			if(obj.userCardInfo){
				this.userCardInfo = JSON.parse(obj.userCardInfo);
				this.init()
			}
		},
		methods: {
			init(){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;
					this.getFinance();
				}else{
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							this.$nav({url:'/pages/register/register'});
						}
					});
				}	
			},
			getFinance(){
				this.$post('cms/dailyFinanceNews',{
					userId:this.userId,
					pageInfo:this.pageInfo
				}).then(data=>{
					//console.log(data);
					if(data.code=='309'){
						setTimeout(()=>{
							this.$nav({url:'/pages/personal-card/person-edit?personalFlag=1'})
						},1000)			
					}else{
						this.userCardInfo = data.content.userCardInfo;
						/* this.cmsNewsList = data.content.cmsNewsList.map((v,i)=>{
							let pattern = /\s+\↵+/g;
							v.content = v.content.replace(pattern, '\\n').replace(/\<img/g, '<img style="max-width:100%;" ');
							return v;
						}); */
						let userCardAlbumList = data.content.userCardAlbumList;
						let length = userCardAlbumList.length;
						for(let i = length-1 ; i>=0 ; i--){
							if(userCardAlbumList[i].type=='32'){
								this.zyVideo = userCardAlbumList[i].picUrl || '';
							}
						}
						for(let j = length-1 ; j>=0 ; j--){
							if(userCardAlbumList[j].type=='31'){
								this.zyImg = userCardAlbumList[j].picUrl || '';
							}
						}
						this.shareInfo = {
							href: `${ config.$h5Url}pages/personal-card/personal-card`,
							title: `我是理财师 ${this.userCardInfo.fullName} ,期待为您服务`,
							presenterIntroduce: this.userCardInfo.personalIntroduction?`${this.userCardInfo.personalIntroduction}`:'丰富的理财业务，让您的财富更加丰富',
							coverImageUrl: `${ config.$baseImgUrl }/static/app@2x.png`
						}
						this.$nextTick(()=>{
							this.$refs.personalIntroduction.setValue(this.userCardInfo.personalIntroduction,true);
							this.$refs.glory.setValue(this.userCardInfo.glory,true);
						})
						
					}
				}).catch(err=>{
					//this.$toast(JSON.stringify(err));
				})
			},
			getImage(num,head){
				uni.chooseImage({
					count:num,
					sizeType: ['original', 'compressed'],
					sourceType:['album'],
					success: (res) => {
						console.log(res);
						let tempFilePaths = this.tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths);
						this.uploadAjax(tempFilePaths,head);
					}
				})
			},
			uploadAjax(filePaths,head){
				let url = 'user/center/img/upload';
				let params = {
					formData:{
						type: 0
					},
				}
				console.log(filePaths); 
				if(filePaths.length>1){
					params.files = filePaths; 
					params.formData.picIndex = filePaths.length-1; 
				}
				for(let i=0;i<filePaths.length;i++){
					console.log(filePaths[i])
					this.$upload(url, filePaths[i], params)
					.then(res => {
						if(res.code == 200){
							if(head){
								this.headPortrait = res.content && res.content.lmtSrc || '';
								this.submit();
							}else{
								this.zyImg = res.content && res.content.lmtSrc || '';
							}
						}else{
							this.$toast(res.message);
						}
					});
				}
				
			},
			submit(){
				let params = { headPortrait: this.headPortrait };
				let url = 'user/center/info/update';
				this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						this.$store.dispatch('getUserFn');
						this.$toast('修改头像成功');
						// #ifdef APP-PLUS
						/* let imgPath = {
							"imgPath":this.tempFilePaths[0]
						};
						this.$store.dispatch("updateMyAvatar", imgPath).then() */
						// #endif
					}else{
						this.$toast(res.message)
					}
				})
			},
			selectPro(){
				this.$nav({url:'/pages/product/product-select'});
			},
			goEdit(){
				this.$nav({url:`/pages/personal-card/person-edit?userCardInfo=${JSON.stringify(userCardInfo)}`})
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
		border-radius: 160rpx;
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
.person-upload{
	background-color: #FFFFFF;
	padding-bottom: 24rpx;
	overflow: hidden;
	&-t{
		margin-left: 30rpx;
		margin-top: 28rpx;
		font-size: 36rpx;
	}
	&-img{
		width: 700rpx;
		height: 306rpx;
		margin: 32rpx auto 0;
	}
	.my-video{
		width: 700rpx;
		height: 306rpx;
		margin: 32rpx auto 0;
	}
}
</style>
