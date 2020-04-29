<template>
	<view class="container">
		<top-notice texts="您上传的材料仅用于身份审核，我们将严格保密！" :show="false"></top-notice>
		<view class="shiming">
			<view class="noicon l-bb">
				<view class="">
					真实姓名
				</view>
				<input type="text" v-model="userName" placeholder="请输入真实姓名" placeholder-class="placeclass" maxlength="15"/>
			</view>
			<view class="noicon l-bb">
				<view class="">
					性别
				</view>
				<view class="l-icon l-icon-select" @tap="changeSex(1)" :class="{'l-icon-selected':sex==1}">
					
				</view>
				<view class="" style="margin-left: 16rpx;">
					男
				</view>
				<view class="l-icon l-icon-select" style="margin-left: 102rpx;" @tap="changeSex(2)" :class="{'l-icon-selected':sex==2}">
					
				</view>
				<view class="" style="margin-left: 16rpx;">
					女
				</view>
			</view>
			<view class="noicon l-bb">
				<view class="">
					职务
				</view>
				<input type="text" v-model="positionName" placeholder="请输入您在机构的职位名称" placeholder-class="placeclass" maxlength="15"/>
			</view>
			<view class="noicon l-bb">
				<view class="">
					从业年限
				</view>
				<input type="text" v-model="employmentYear" placeholder="请选择从业年限" placeholder-class="placeclass" @tap="selectYear" disabled/>
			</view>
		</view>
		<template>			
			<view class="person-upload" v-if="personalCardImg" @tap="getImage(1,27,1)">
				<view class="person-upload-t">
					个人名片
				</view>
				<image :src="personalCardImg" mode="" class="person-upload-img"></image>
			</view>
			<person-upload v-else class="zyzp" title="个人名片" addText="请上传个人名片" addTip="请上传与您姓名电话一致的纸质名片照片便于审核认证您的理财师身份" @selectUpload="getImage(1,27,1)"></person-upload>
		</template>
		
		<template>
			<view class="person-upload" v-if="qualificationCertImg" @tap="getImage(1,27,2)">
				<view class="person-upload-t">
					资格证书(选填)
				</view>
				<image :src="qualificationCertImg" mode="" class="person-upload-img"></image>
			</view>
			<person-upload v-else class="zyzp" title="资格证书(选填)" addText="请上传相关资格证书" addTip="请上传您的基金、证券、保险、银行从业等资格证，以提高您的佣金及形象" @selectUpload="getImage(1,27,2)"></person-upload>
		</template>
		
		<view class="mybtn next" @tap="next">
			下一步
		</view>
		
		<w-picker
		        mode="selector"
		        default-type="name"
				:default-props="defaultProps"
		        :options="yearList"
		        @confirm="onConfirm($event,'selector')" 
		        ref="selector" 
		    ></w-picker>
	</view>
</template>

<script>
	import personUpload from '../personal-card/person-upload.vue';
	export default {
		components:{
			personUpload
		},
		data() {
			return {
				tempFilePaths:[],
				userName:'',
				positionName:'',
				employmentYearNum:null,
				employmentYear:'',
				
				sex:1,
				personalCardImg:'',
				qualificationCertImg:'',
				userId:'',
				orgType:null,
				orgName:'',
				
				yearList:[{
					name:'1年以内',
					id:1
				},
				{
					name:'1年到3年',
					id:2
				},
				{
					name:'3年到5年',
					id:3
				},
				{
					name:'5年到10年',
					id:4
				},
				{
					name:'10年以上',
					id:5
				}],
				defaultProps:{"label":"name","value":"id"}

			}
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
			if(obj.orgType){
				this.orgType = Number(obj.orgType)
			}
			if(obj.orgName){
				this.orgName = obj.orgName;
			}	
		},
		methods: {
			changeSex(index){
				this.sex = index;
			},
			next(){
				if(!this.userName.trim()){
					this.$toast('请输入姓名');
					return;
				}
				if(!this.positionName.trim()){
					this.$toast('请输入职务');
					return;
				}
				console.log(this.employmentYearNum);
				if(!this.employmentYearNum){
					this.$toast('请选择从业年限');
					return;
				}
				if(!this.personalCardImg){
					this.$toast('请上传个人名片');
					return;
				}
				let url = 'user/center/finance/employmentCertSaveOrUpdate'; 
				let {
					userName,
					positionName,
					sex,
					employmentYearNum,
					userId,
					personalCardImg,
					qualificationCertImg,
					orgType,
					orgName
				} = this;
				this.$post(url,{
					userName,
					positionName,
					sex,
					employmentYearNum,
					userId,
					personalCardImg,
					qualificationCertImg,
					orgType,
					orgName
				}).then(data=>{
					console.log(data);
					this.$store.dispatch('getUserFn').then(data=>{
						setTimeout(()=>{
							this.$nav({url:'/pages/mine/financial-result'})
						},3000)
					})
				}).catch(err=>{
					console.log(err);
				})
			},
			getImage(num,type,flag){
				uni.chooseImage({
					count:num, 
					sizeType: ['original', 'compressed'],
					sourceType:['album'],
					success: (res) => {
						let tempFilePaths = this.tempFilePaths = res.tempFilePaths;
						this.uploadAjax(tempFilePaths,type,flag);
					}
				})
			},
			uploadAjax(filePaths,type,flag){
				let url = 'user/center/img/upload';
				let params = {
					formData:{
						type: type
					},
				}
				this.$upload(url, filePaths[0], params)
				.then(res => {
					if(res.code == 200){ 
						console.log(res);
						if(flag==1){
							this.personalCardImg = res.content && res.content.lmtSrc || '';
						}
						if(flag==2){
							this.qualificationCertImg = res.content && res.content.lmtSrc || ''; 
						}
					}else{
						this.$toast(res.message);
					}
				});
			},
			selectYear(){
				this.$refs.selector.show()
			},
			onConfirm(e,str){
				this.employmentYear = e.result;
				this.employmentYearNum = e.value;
			},
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.noicon{
	height: 52px;
	background-color: #FFFFFF;
	padding: 0 24rpx;
	display: flex;
	width: calc(100% - 48rpx);
	align-items: center;
	view:nth-of-type(1){
		font-size: 16px;
		margin-right: 20rpx;
		width: 180rpx;
	}
	.placeclass{
		color: #afafaf;
		font-size: 15px;
	}
	input{
		flex: 1;
		font-size: 15px;
	}
	image{
		width: 18rpx;
		height: 28rpx;
	}
	.l-icon-select{
		background-image: url(~@/static/xzz@2x.png);
		width: 34rpx;
		height: 34rpx;
	}
	.l-icon-selected{
		background-image: url(~@/static/xz@2x.png);
		width: 34rpx;
		height: 34rpx;
	}
}
.next{
	margin: 80rpx auto 0;
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
}
</style>
