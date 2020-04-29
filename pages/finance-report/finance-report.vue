<template>
	<view class="finnance">
		<view class="l-view">
			<view class="person" @tap="goCard">
				<view class="person-t l-flex l-flex-jc_sb">
					<view class="person-l">
						<view class="name" v-text="user.fullName||userCardInfo.fullName">
							<!-- {{userCardInfo.fullName}} -->
						</view>
						<view class="persontag">
							<image src="../../static/finance/lc@3x.png" mode=""></image>
							<view class="" v-text="userCardInfo.position">
								
							</view>
						</view>
						<view class="persontag">
							<image src="../../static/finance/gs@3x.png" mode=""></image>
							<view class="" v-text="user.orgName||userCardInfo.company">
								
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
						<view class="camera" @tap.stop="getImage">
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
		</view>
		<block v-for="(v,i) in cmsNewsList" :key="v.id">
			<view class="manager l-flex l-flex-ai_c l-view" >
				<view class="left-boder">
					
				</view>
				<view class="" v-for="b in cate" :key="b.cateId" v-if="b.cateId==v.cateId">
					{{b.name}}
				</view>
			</view>
			<view class="finance-m">
				<view class="l-view">
					<view class="finance-mm" ref="copyId">
						<view class="title" v-text="v.title">
						</view>
						<view class="content cborder" v-html="v.content">
							<!-- 1、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？ -->
						</view>
						<!-- <view class="content cborder">
							2、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
						</view>
						<view class="content cborder">
							3、投资者3天亏完历史收益还倒贴30万美元险资产为什么变成收割机？
						</view> -->
					</view>
					<view class="myshare" @tap="isShare = true">
						<image src="../../static/finance/5@3x.png" mode=""></image>
					</view>
					<!-- <view class="finance-b l-flex l-flex-ai_c">
						<view class="copy" @tap="copyContent()">
							复制
						</view>
						<view class="forward">
							<image src="../../static/finance/zf@3x.png" mode=""></image>
						</view>
						<view class="myshare">
							<image src="../../static/finance/5@3x.png" mode=""></image>
						</view>
					</view> -->
				</view>
			</view>
		</block>
		
		<!-- <view class="manager l-flex l-flex-ai_c l-view">
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
		</view> -->
		<share-pop @close="isShare = false" v-if="isShare" :dataInfo="shareInfo"></share-pop>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import config from '@/utils/config.js'
	export default {
		data() {
			return {
				headPortrait:'',
				tempFilePaths:[],
				userId:null,
				pageInfo:{
					pageIndex:1,
					pageSize:10
				},
				userCardInfo:{},
				cmsNewsList:[],
				isShare:false,

				cate:[{
						name:'要闻概览',
						cateId:1,
					},{
						name:'宏观要闻',
						cateId:2,
					}
					,{
						name:'投资理财',
						cateId:3,
					}
					,{
						name:'国际视野',
						cateId:4,
					}
					,{
						name:'突发热点',
						cateId:5,
					}
					,{
						name:'早安心语',
						cateId:6,
					}
					,{
						name:'推荐产品',
						cateId:7,
				}],
				shareInfo:{
					href: `${ config.$h5Url }pages/finance-report/finance-report`,
					title: '财经早报',
					presenterIntroduce: '财经早报展示更多更快捷的资讯',
					coverImageUrl: `${ config.$baseImgUrl }/static/app@2x.png`	
				}
			}
		},
		computed:{
			...mapState({
				hasLogin:'hasLogin',
				qualified:'qualified',
				user:'user'
			})
			/* isLogin(){
				return this.$store.state.hasLogin
			},
			isqualified(){
				return this.$store.state.qualified
			} */
		},
		onLoad() {
			if(typeof this.$getStorage('user')==='object'){
				let user = this.$getStorage('user').userInfo;
				this.userId = user.id;
				this.init();
			}else{
				this.$toast('您还未登录，即将跳转登录页',{
					fn:()=>{
						this.$nav({url:'/pages/register/register'});
					}
				});
			}	
		},
		methods: {
			init(){
				this.getFinance()
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
						this.cmsNewsList = data.content.cmsNewsList.map((v,i)=>{
							let pattern = /\s+\↵+/g;
							v.content = v.content.replace(pattern, '\\n').replace(/\<img/g, '<img style="max-width:100%;" ');
							return v;
						});
					}
				}).catch(err=>{
					this.$toast(JSON.stringify(err));
				})
			},
			copyContent(){
				uni.setClipboardData({
				    data: 'hello',
				    success: ()=>{
				        this.$toast('复制成功');
				    }
				});
			},
			getImage(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'],
					sourceType:['album'],
					success: (res) => {
						let tempFilePaths = this.tempFilePaths = res.tempFilePaths;
						this.uploadAjax(tempFilePaths);
					}
				})
			},
			uploadAjax(filePaths){
				let url = 'user/center/img/upload';
				let params = {
					formData:{
						type: 0
					}
				}
				console.log(filePaths[0]);
				this.$upload(url, filePaths[0], params)
				.then(res => {
					if(res.code == 200){
						this.headPortrait = res.content && res.content.lmtSrc || '';
						this.submit();
					}else{
						this.$toast(res.message);
					}
				});
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
			goCard(){
				if(this.userCardInfo.fullName){
					this.$nav({url:`/pages/personal-card/personal-card?userCardInfo=${JSON.stringify(this.userCardInfo)}`})
				}else{
					this.$nav({url:`/pages/personal-card/personal-edit?personalFlag=1`})
				}
				
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
		image{
			width: 622rpx!important;
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
		
	}
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
.toutiao{
	border-bottom-left-radius: 16rpx;
	border-bottom-right-radius: 16rpx;
}
</style>
