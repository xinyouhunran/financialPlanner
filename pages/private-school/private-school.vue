<template>
	<view class="container">
		<!-- <view class="private-school">
			<view class="school-tab l-flex l-flex-jc_sa l-flex-ai_c">
				<view class="school-ib" v-for="(v,i) in schoolTab" :key="i" :class="{'school-ib-actived': schoolTabIndex == i}" @tap="changeTab(v.value,i)">{{v.name}}</view>
			</view>
			
			<view class="l-view school-banner">
				<image src="../../static/school-banner.png" mode=""></image>
			</view>
			
			<view class="l-view">
				<view class="uni-flex l-zb l-flex-jc_sb l-bb school-list" v-for="(v,i) in mainFeature" :key='i'>
					<view class="l-flex l-flex-direction l-flex-jc_sb">
						<view class="lt-zx">{{v.content}}</view>
					</view>
					<image :src="v.img" mode="aspectFill"></image>
				</view>
			</view>
		</view> -->
		<web-view :src="webSrc" v-if="webSrc"></web-view>
	</view>
</template>

<script>
	import {geth5} from '@/utils/geth5.js'
	export default {
		data() {
			return {
				schoolTab:[
					{name:'认识私募',value:0},
					{name:'投资要点',value:1},
					{name:'法律法规',value:2},
					{name:'风险防范',value:3}
				],
				schoolTabIndex:0,
				mainFeature:[{
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'一小时前',
				img:'../../static/1577935511@2x.png',
				},{
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'一小时前',
				img:'../../static/1577935511@2x.png',
				},{
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'一小时前',
				img:'../../static/1577935511@2x.png',
				}],
				
				userId:'',
				flag:'5',
				webSrc:''
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
			changeTab(id,index){
				this.schoolTabIndex = index;
			},
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.school-tab{
	height: 100rpx;
	color: #242424;
	font-size: 17px;
	background-color: #FFFFFF;
	border-bottom: 1px solid #ABABAB;
}
.school-ib-actived{
	font-weight: bold;
	position: relative;
}
.school-ib-actived::after{
	content: '';
	width: 50%;
	height: 2px;
	position: absolute;
	background-color:#242424;
	left: 50%;
	margin-left: -25%;
	bottom: -34rpx;
}
.school-banner{
	width: 350px;
	height: 160px;
	margin: 20rpx 0;
}
.school-list{
	background-color: #FFFFFF;
	padding: 30rpx 24rpx;
}
.l-zb image{
	width: 166rpx;
	height: 132rpx; 
}
.zxzk{
	padding-top: 30rpx;
	background-color: #FFFFFF;
	margin-top: 20rpx;
}
.zxzkpb{
	padding-bottom: 28rpx;
}
.lt-zx{
	width: 468rpx; 
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	overflow: hidden;
	line-height: 18px;
}
</style>
