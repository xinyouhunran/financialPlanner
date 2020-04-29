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
			
			<view class="person-r" @tap.stop="getImage(1,true,0)">
				<image :src="user.headPortrait ? user.headPortrait :'../../static/finance/tx@3x.png'" mode="aspectFill" style="border-radius: 160rpx;"></image>
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
					<input type="text" v-model="name" placeholder="请输入姓名" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb">
				<view class="l">
					公司/机构
				</view>
				<view class="r">
					<input type="text" v-model="company" placeholder="请输入您所属机构或公司" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb">
				<view class="l">
					职位
				</view>
				<view class="r">
					<input type="text" v-model="position" placeholder="请输入您的职位" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item">
				<view class="l">
					手机号
				</view>
				<view class="r">
					<input type="text" v-model="phone" placeholder="请输入手机号" placeholder-class="placeclass"/>
				</view>
			</view>
		</view>
		
		<view class="form-edit form-edit1">
			<view class="form-item l-bb">
				<view class="l">
					邮箱
				</view>
				<view class="r">
					<input type="text" v-model="email" placeholder="请输入您的邮箱" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb">
				<view class="l">
					微信号
				</view>
				<view class="r">
					<input type="text" v-model="wxNo" placeholder="请输入您的微信号" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="form-item l-bb" @tap="selectProvice">
				<view class="l">
					所在地
				</view>
				<view class="r l-flex l-flex-ai_c" style="margin-left: 16px;">
					<template v-if="!address">
						<view class="selectprovice">请选择城市</view>
						<view class="downgrey">
							<image src="../../static/downgrey.png" mode=""></image>
						</view>
					</template>
					<template v-else>
						<view>{{address}}</view>
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
		
		<person-textarea class="person-text" title="个人描述" ref="personalIntroduction"></person-textarea>
		<person-textarea class="honor-text" title="所获荣誉" ref="glory"></person-textarea>
		
		<template>
			<view class="person-upload" v-if="zyImg" @tap="selectPic">
				<view class="person-upload-t">
					展业照片
				</view>
				<image :src="zyImg" mode="" class="person-upload-img"></image>
			</view>
			<person-upload class="zyzp" title="展业照片" addText="添加图片" addTip="每张图片都是一次展业的机会" @selectUpload="selectPic" v-else></person-upload>
		</template>
		<template>
			<view class="person-upload" v-if="zyVideo" @tap="selectVideo">
				<view class="person-upload-t">
					展业视频
				</view>
				<view class="my-video">
					<video class="my-video" objectFit="contain"
					:src="zyVideo" controls v-if="zyVideo">
					</video>
				</view>
				
			</view>
			<person-upload class="zyzp" title="视频" addText="添加视频" addTip="每个视频都是一次展业的机会" @selectUpload="selectVideo" v-else></person-upload>
		</template>
		
		
		<view class="deposit l-flex l-flex-jc_c l-flex-ai_c" @tap="save">
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
		
		<l-file 
		    ref="lFile" 
		    @up-success="mySuccess"
		></l-file>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import personTextarea from './person-textarea.vue';
	import personUpload from './person-upload.vue';
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				defaultRegion:[],
				headPortrait:'',
				tempFilePaths:[],
				userId:null,
				
				name:'',
				company:'',
				position:'',
				phone:'',
				email:'',
				wxNo:'',
				address:'',
				personalIntroduction:'',
				glory:'',
				personalFlag:0,
				userCardInfo:{},
				zyImg:'',
				zyVideo:''
			}
		},
		components:{
			personTextarea,
			personUpload,
			wPicker
		},
		computed:{
			...mapState({
				hasLogin:'hasLogin',
				qualified:'qualified',
				user:'user',
				employmentCertStatus:'employmentCertStatus'
			}),
		},
		onLoad(obj) {
			if(typeof this.$getStorage('user')==='object'){
				let user = this.$getStorage('user').userInfo;
				this.userId = user.id;
			}else{
				this.$toast('您还未登录，即将跳转登录页',{
					fn:()=>{
						this.$nav({url:'/pages/register/register'});
					}
				});
			}
			if(obj.personalFlag){
				this.personalFlag = obj.personalFlag
			}
			if(obj.userCardInfo){
				this.userCardInfo = JSON.parse(obj.userCardInfo);
				this.init()
			}	
		},
		methods: {
			upSuccess(){
					
			},
			init(){
				this.$nextTick(()=>{
					let userCardInfo = this.userCardInfo;
					this.$refs.personalIntroduction.setValue(userCardInfo.personalIntroduction,false);
					this.$refs.glory.setValue(userCardInfo.glory,false);
					this.name = userCardInfo.fullName;
					this.company = userCardInfo.company;
					this.position = userCardInfo.position;
					this.phone = userCardInfo.phone;
					this.email = userCardInfo.email;
					this.wxNo = userCardInfo.wxNo;
					this.address = userCardInfo.address;
				})
			},
			save(){
				this.personalIntroduction = this.$refs.personalIntroduction.descripe;
				this.glory = this.$refs.glory.descripe;
				let {
					name,	
					phone,
					email,
					company,
					position,
					wxNo,
					address,
					personalIntroduction,
					glory,
					headPortrait
				} = this;
				if(!name){
					this.$toast('请输入姓名');
					return;
				}
				if(!this.isPhone(phone)){
					return;
				}
				if(!email){
					this.$toast('请输入邮箱');
					return;
				}
				let firstName = name.slice(0,1);
				let lastName = name.slice(1);
				let params = {
					firstName,
					lastName,
					email,
					phone,
					company,
					position,
					wxNo,
					address,
					personalIntroduction,
					glory,
					headPortrait
				}
				console.log(this.personalFlag)
				let url = this.personalFlag?'usercard/info/create':'usercard/info/update';
				params.id = this.personalFlag?null:this.userCardInfo.id;
				this.$post(url,params
				).then(data=>{
					this.$store.dispatch('getUserFn');
					this.$toast('保存成功',{
						fn:()=>{
							setTimeout(()=>{
								this.$back(1);
							},3000)
						}
					})
					
				}).catch(err=>{
					this.$toast(err)
				})
			},
			isPhone(str){
				let reg = /^(\d{3})\d{4}(\d{4})$/;
				let rega = /^1[3456789]\d{9}$/;
				if(!str.trim().length){
					this.$toast('请输入手机号')
					return false;
				}else if(!reg.test(str)){
					this.$toast('请输入11位手机号')
					return false;
				}else if(!rega.test(str)){
					this.$toast('手机号输入有误')
					return false;
				}else{
					return true;
				}
			},
			getImage(num,head,mytype){
				uni.chooseImage({
					count:num,
					sizeType: ['original', 'compressed'],
					sourceType:['album'],
					success: (res) => {
						console.log(res);
						let tempFilePaths = this.tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths);
						this.uploadAjax(tempFilePaths,head,mytype);
					}
				})
			},
			uploadAjax(filePaths,head,mytype){
				let url = 'user/center/img/upload';
				let params = {
					formData:{
						type: mytype
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
			selectProvice(){
				this.$refs.region.show();
			},
			onConfirm(e,str){
				//this.$toast(e.obj.city.label)
				this.address = e.obj.city.label;
			},
			selectPic(){
				this.getImage(1,false,31)
			},
			selectVideo(){
				if(this.employmentCertStatus!='0'){
					this.$toast('金融从业认证成功后方可上传视频');
					return;
				}
				let userAuthToken;
				if (this.$getStorage('token')) {
					userAuthToken = this.$getStorage('token');
				}
				this.$refs.lFile.upload({
				    // #ifdef APP-PLUS
				    currentWebview: this.$mp.page.$getAppWebview(), 
				    // #endif
				    url: 'http://120.24.108.106:9092/user/center/img/upload', //测试地址，记得更换
				    name: 'file', 
					formData: {
						userAuthToken,
						userId:this.userId
					}
				    //header: {'Content-Type':'类型','Authorization':'token'},
				    //...其他参数
				});
			},
			mySuccess(name,data){
				//console.log(name);
				//console.log(data); 
				let db = name.data.id;
				let str = db.slice(db.indexOf('http')); 
				let mystr = str.slice(0,str.indexOf("\""));
				this.zyVideo = mystr || '';
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
		border-radius: 160rpx;
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
