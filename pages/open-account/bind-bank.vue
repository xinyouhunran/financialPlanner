<template>
	<view class="container">
		<view class="open-account">
			<account-tip :tip1="true" :tip2="true" :tip3="false"></account-tip>
			
			<view class="shiming">
				<view class="noicon l-bb">
					<view class="">
						银行卡号
					</view>
					<input type="text" v-model="bankaccount" placeholder="请输入银行卡号" placeholder-class="placeclass" maxlength="24" @change="getBelong"/>
				</view>
				<view class="noicon l-bb">
					<view class="">
						所属银行
					</view>
					<input type="text" v-model="belongBank" placeholder="请选择银行" placeholder-class="placeclass" disabled @tap="selectBank"/>
					<view class="">
						<image src="../../static/right@2x.png" mode=""></image> 
					</view>
				</view>
			</view>
			
			<view class="shiming">
				<view class="noicon l-bb">
					<view class="">
						手机号
					</view>
					<input type="text" v-model="phone" placeholder="请输入银行预留手机号" placeholder-class="placeclass" disabled/>
				</view>
				<view class="noicon l-bb">
					<view class="">
						验证码
					</view>
					<input type="text" v-model="code" placeholder="请输入验证码" placeholder-class="placeclass"/>
					<view class="codeTxt" @tap="getCodeFun">
						{{codeTxt}}
					</view>
				</view>
			</view>
			
			<!-- <view class="mes l-view">
				<span>点击“下一步”按钮，即表示您同意</span>
				<span>《银行转账授权协议》</span>
				<span>《快捷支付服务协议》</span>
				<span>《投资人权益协议》</span>
			</view> -->
			
			<view class="next mybtn" @tap="next">
				下一步
			</view>
		</view>
		
		<w-picker
		        mode="selector"
		        default-type="text"
		        :default-props="defaultProps"
		        :options="bankList"
		        @confirm="onConfirm($event,'selector')"
		        ref="selector" 
		    ></w-picker>
	</view>
</template>

<script>
	import accountTip from './account-tip.vue'
	import {bankCardAttribution} from '@/common/js/bankCard.js'
	import {getBank} from '@/common/js/bank.js'
	export default {
		components:{
			accountTip
		},
		data() {
			return {
				codeTxt:'获取验证码',
				downTime:60,
				isGetCode:false,

				userId:'',
				name:'',
				idCard:'',
				bankaccount:'',
				belongBank:'',
				phone:'',
				code:'',
				serverCode:'',
				
				bankList:[],
				defaultProps:{"label":"text","value":"value"},
				
			}
		},
		computed:{
		},
		watch:{
			['bankaccount'](val) {
			    this.$nextTick(() => {
			        this.bankaccount = val.replace(/\s/g,'').replace(/....(?!$)/g,'$& ');
			    });
			}
		},
		onLoad(o) {
			let obj = JSON.parse((o.obj));
			this.name = obj.name;
			this.idCard = obj.idCard;
			let user = this.$getStorage('user').userInfo;
			this.phone = user.phone;
			this.userId = user.id;
			this.bankList = getBank();
		},
		methods: {
			getBelong(){
				let obj = bankCardAttribution(this.bankaccount.replace(/\s/g,''));
				this.belongBank = obj.bankName||'';
			},
			onConfirm(e,str){
				this.belongBank = e.result;
			},
			selectBank(){
				this.$refs.selector.show()
			},
			getCodeFun() {
				if (this.isGetCode) {
					return
				}
				if(!this.bankaccount.trim()){
					this.$toast('请输入银行账号');
					return
				}
				if(!this.belongBank.trim()){
					this.$toast('请选择银行');
					return
				}
				this.bankaccount = this.bankaccount.replace(/\s/g,'');
				this.isGetCode = true;
				let params = {
					userId: this.userId,
					userName: this.name,
					idNum: this.idCard,
					cardNum:this.bankaccount,
					cardOrg:this.belongBank,
					phoneNum:this.phone
				};
				let url = '/user/openAccount/userOpenAccountGetVerCode';
				this.$post(url, params)
					.then(res => {
						if (res.code == 200) {
							//this.serverCode = res.content.content;
							this.downTimeFun();
						} else if (res.code == 404) {
							this.isGetCode = false;
							this.$toast(res.message);
						} else {
							this.isGetCode = false;
						}
					}).catch(res => {
						this.$toast("获取验证码失败");
						this.isGetCode = false;
					})
			},
			downTimeFun() {

				this.codeTxt = `(${ this.downTime }s)`;
				this.interval = setInterval(() => {
					if (this.downTime <= 1) {
						clearInterval(this.interval);
						this.codeTxt = '重新获取';
						this.downTime = 60;
						this.isGetCode = false;
					} else {
						--this.downTime
						this.codeTxt = `(${ this.downTime }s)`;
					}
				}, 1000)
				
			},
			next(){
				//this.$nav({url:'/pages/open-account/set-tradpwd'});
				//let userName = this.userName;
				let verificationCode = this.code;
				let params = null;
				if (!verificationCode.trim()) {
					this.$toast('验证码不能为空');
					return
				}
				
				/* if(verificationCode!=this.serverCode){
					this.$toast('验证码输入错误');
					return
				} */
				
				params = {
					userId:this.userId,
					verCode:this.code//this.serverCode
				}
				let url = '/user/openAccount/userOpenAccountUpSendVerCode';
				this.$post(url,params,{baseUrl:'http://120.24.108.106:9092/'})
				.then(data=>{
					console.log(data);
					this.$nav({url:'/pages/index/index'},'switchTab');
				})
				.catch(err=>{
					console.log(err);
				})
			}
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
	width: calc(100% - 48rpx);
	align-items: center;
	view:nth-of-type(1){
		font-size: 16px;
		margin-right: 20rpx;
		width: 148rpx;
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
}
.next{
	margin: 140rpx auto 0; 
}
.codeTxt{
	color: #4A90E2;
}
.open-account .mes{
	font-size: 12px;
	color: #828282;
	margin-top: 20rpx;
	line-height: 32rpx;
	span:nth-of-type(n+2){
		color: #D3A35C;
	}
}
</style>
