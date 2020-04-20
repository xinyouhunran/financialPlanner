<template>
	<view class="container">
		<top-notice texts="您上传的材料仅用于身份审核，我们将严格保密！" :show="false"></top-notice>
		<view class="shiming">
			<view class="noicon l-bb">
				<view class="">
					真实姓名
				</view>
				<input type="text" v-model="name" placeholder="请输入真实姓名" placeholder-class="placeclass" @change="checkName()" maxlength="15"/>
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
				<input type="text" v-model="position" placeholder="请输入您在机构的职位名称" placeholder-class="placeclass" @change="checkId()"/>
			</view>
			<view class="noicon l-bb">
				<view class="">
					从业年限
				</view>
				<input type="number" v-model="workYear" placeholder="请输入您在机构的职位名称" placeholder-class="placeclass" @change="checkId()"/>
			</view>
		</view>
		
		<person-upload class="zyzp" title="个人名片" addText="请上传个人名片" addTip="请上传与您姓名电话一致的纸质名片照片便于审核认证您的理财师身份"></person-upload>
		<person-upload class="zyzp" title="资格证书(选填)" addText="请上传相关资格证书" addTip="请上传您的基金、证券、保险、银行从业等资格证，以提高您的佣金及形象"></person-upload>
		
		<view class="mybtn next" @tap="next">
			下一步
		</view>
	</view>
</template>

<script>
	import personUpload from '../personal-card/person-upload.vue'
	export default {
		components:{
			personUpload
		},
		data() {
			return {
				name:'',
				position:'',
				workYear:'',
				sex:1
			}
		},
		methods: {
			changeSex(index){
				this.sex = index;
			},
			next(){
				this.$nav({url:'/pages/mine/financial-result'})
			}
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
</style>
