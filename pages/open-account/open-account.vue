<template>
	<view class="container">
		<view class="l-status"></view>
		<view class="l-toptitle">
			<view class="" @tap="$nav({url:'/pages/index/index'},'switchTab')">
				<image src="../../static/back@2x.png" mode=""></image>
			</view>
			<view class="">
				基金交易开户
			</view>
			<view class="">
				
			</view>
		</view>
		<view class="open-account">
			<account-tip :tip1="true" :tip2="false" :tip3="false"></account-tip>
			
			<view class="shiming">
				<view class="noicon l-bb">
					<view class="">
						真实姓名
					</view>
					<input type="text" v-model="name" placeholder="请输入真实姓名" placeholder-class="placeclass" @change="checkName()" maxlength="15"/>
				</view>
				<view class="noicon l-bb">
					<view class="">
						身份证号
					</view>
					<input type="text" v-model="idCard" placeholder="请输入身份证号" placeholder-class="placeclass" @change="checkId()"/>
				</view>
			</view>
			
			<view class="next mybtn" @tap="next">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import accountTip from './account-tip.vue';
	import {
	  testIdCard,
	  NEWCHECKNAME4
	} from '@/common/js/regCheck.js';
	export default {
		components:{
			accountTip
		},
		data() {
			return {
				name:'',
				idCard:''
			}
		},
		methods: {
			next(){
				if(!this.checkName()){
					return;
				}
				if(!this.checkId()){
					return;
				}
				let obj = {
					name:this.name,
					idCard:this.idCard
				}
				let str = JSON.stringify(obj);
				this.$nav({url:`/pages/open-account/bind-bank?obj=${str}`});
			},
			//检查姓名
			checkName() {
			  if(!NEWCHECKNAME4.test(this.name)||this.name.length<2){
			    this.$toast("您输入的姓名有误",{duration:3000});
			    return false;
			  }else{
				  return true;
			  }
			},
			checkId() {
			    this.id_cardchuli = this.idCard.replace(/\s/g,'');
			    if (!testIdCard(this.id_cardchuli)) {
			      this.$toast('您输入的身份证号码有误',{duration:3000});
				  return;
			    }else{
					return true;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F2F2F2;
	min-height: 100vh;
}
.shiming{
	margin-top: 40rpx;
}
.noicon{
	height: 52px;
	background-color: #FFFFFF;
	padding: 0 24rpx;
	display: flex;
	width: 100%;
	align-items: center;
	view{
		font-size: 16px;
		margin-right: 40rpx;
	}
	.placeclass{
		color: #afafaf;
		font-size: 15px;
	}
	input{
		flex: 1;
		font-size: 15px;
	}
}
.next{
	margin: 480rpx auto 0; 
}
</style>
