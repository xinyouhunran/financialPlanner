<template>
	<view class="container">
		<view class="financial-institution">
			<view class="banner">
				<image src="../../static/mine/banner@2x.png" mode=""></image>
			</view>
			<view class="l-flex l-flex-jc_c">
				<view class="title">
					点击选择您所在的机构类型
				</view>
			</view>
			<view class="l-view">
				<view class="list">
					<view class="item rb" :class="{colore70012:orgType==1}" @tap="getType(1)">
						<image src="../../static/mine/1@2x.png" mode=""></image>
						<view class="">
							私募
						</view>
					</view>
					<view class="item" :class="{colore70012:orgType==5}" @tap="getType(5)">
						<image src="../../static/mine/2@2x.png" mode=""></image>
						<view class="">
							公募
						</view>
					</view>
				</view>
				<view class="list">
					<view class="item rb" :class="{colore70012:orgType==2}" @tap="getType(2)">
						<image src="../../static/mine/3@2x.png" mode=""></image>
						<view class="">
							第三方机构
						</view>
					</view>
					<view class="item" :class="{colore70012:orgType==3}" @tap="getType(3)">
						<image src="../../static/mine/4@2x.png" mode=""></image>
						<view class="">
							证券公司
						</view>
					</view>
				</view>
				<view class="list">
					<view class="item rb" :class="{colore70012:orgType==4}" @tap="getType(4)">
						<image src="../../static/mine/5@2x.png" mode=""></image>
						<view class="">
							银行
						</view>
					</view>
					<view class="item" :class="{colore70012:orgType==6}" @tap="getType(6)">
						<image src="../../static/mine/6@2x.png" mode=""></image>
						<view class="">
							保险公司
						</view>
					</view>
				</view>
				<view class="list">
					<view class="item" :class="{colore70012:orgType==7}" @tap="getType(7)">
						<image src="../../static/mine/7@2x.png" mode=""></image>
						<view class="">
							其他
						</view>
					</view>
					<view class="item">

					</view>
				</view>
			</view>
			<view class="l-flex l-flex-jc_c">
				<view class="title">
					填写您所在的公司
				</view>
			</view>
			<view class="l-view">
				<view class="company-input">
					<input type="text" v-model="orgName" placeholder="您的公司/机构名称"/>
					<view class="tag-list">
						<view class="tag" v-for="(v,i) in tagList" :key="i" @tap="orgName = v.name">
							{{v.name}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="mybtn next" @tap="next">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orgName:'',
				orgType:null,
				tagList:[{
					name:'诺亚财富'
				},{
					name:'证大投资'
				},{
					name:'丰铃资本'
				},{
					name:'哥伦资本'
				}]
			}
		},
		methods: {
			getType(index){
				this.orgType = index;
			},
			next(){
				if(!this.orgType){
					this.$toast('请选择类型');
					return
				}
				if(!this.orgName.trim()){
					this.$toast('请输入名称')
					return
				}
				this.$nav({url:`/pages/mine/financial-certification?orgType=${this.orgType}&orgName=${this.orgName}`});
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.financial-institution{
	.banner{
		width: 700rpx;
		height: 150rpx;
		margin: 10px auto 0;
	}
	.title{
		font-size: 24px;
		font-weight: bold;
		margin: 76rpx auto;
	}
	.list{
		background-color: #FFFFFF;
		height: 136rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		.item{
			width: 49%;
			display: flex;
			align-items: center;
			margin-left: 58rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				margin-right: 20rpx;
			}
		}
		.rb{
			border-right: 1px solid #F4F4F4;
		}
	}
	.company-input{
		height: 200rpx;
		background-color: #FFFFFF;
		width: 700rpx;
		input{
			padding-left: 18rpx;
			height: 49px;
			flex: 1;
			border-bottom: 1px solid #f4f4f4;
		}
		.tag-list{
			height: 98rpx;
			display: flex;
			align-items: center;
			color: #E70012;
			font-size: 12px;
			.tag{
				margin: 0 18rpx;
			}
		}
	}
	.next{
		margin: 62rpx auto 0;
	}
}
</style>
