<template>
	<view class="l-container">
		<view class="l-body" >
			<view class="l-list">
				<view class="l-list-key">
					身份证号
				</view>
				<view class="l-list-value">
					<input class="l-list-input" type="number" v-model="idCard" placeholder="请输入持卡人身份证号" />
				</view>
			</view>
			<view class="l-list" style="margin-top: 20rpx;">
				<view class="l-list-key">
					手机号
				</view>
				<view class="l-list-value">
					<input class="l-list-input" type="number" placeholder="请输入银行预留手机" v-model="phone"/>
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-key">
					验证码
				</view>
				<view class="l-list-value">
					<input class="l-list-input" v-model="verificCode" type="text" placeholder="请输入验证码" />
				</view>
				<view class="codeTxt" @tap="downTimeFun">
					{{codeTxt}}
				</view>
			</view>
			<view class="l-list" style="margin-top: 20rpx;" @tap="open">
				<view class="l-list-key">
					交易密码
				</view>
				<view class="l-list-value">
					<input class="l-list-input" v-model="tradPwd" type="password" placeholder="请输入新的交易密码" disabled/>
				</view>
			</view>
			
			<view class="l-button">
				<button class="l-btn l-btb-submit" @tap="submit">提交</button>
			</view>
		</view>
		
		<uni-popup ref="popup" type="top" :top="top" :animation="false">
			<view class="popupbox">
				<view class="title l-flex l-flex-jc_sb l-view">
					<view>
						 
					</view>
					<view class="">
						{{popuptxt}}
					</view>
					<view class="" @tap="close">
						<image src="../../static/handle/guanbi@2x.png" mode=""></image>
					</view>			
				</view>
				<template v-if="isFirst">
					<myp-one ref="one" type="bottom" @finish="finishedone" :maxlength="6" :isPwd="true" :autoFocus="true" id="one"></myp-one>				
				</template>
				<template v-else>
					<myp-one ref="two" type="bottom" @finish="finishedtwo" :maxlength="6" :isPwd="true" :autoFocus="true" id="two"></myp-one>
				</template>
			</view>	
		</uni-popup>
		
		 
	</view>
</template>

<script>
	export default {
		data(){
			return {
				idCard: '',
				phone: '',
				verificCode: '',
				tradPwd:'',
				codeTxt:'获取验证码',
				downTime:60,
				isGetCode:false,
				isFirst:true,
				top:100,
				popuptxt:'请输入交易密码',
				firstval:'',
				secondval:''
			}
		},
		computed:{
			user(){
				return this.$store.getters.user; 
			}
		},
		methods:{
			open(){
				 this.reset()	
				 this.$refs.popup.open()
			},
			reset(){
				this.firstval = '';
				this.secondval = '';
				this.tradPwd = '';
				this.popuptxt = '请输入交易密码';
				this.isFirst = true;
			},
			close(){
				 this.$refs.popup.close(); 
			},
			finishedone(val) {
				this.firstval = val;
				this.popuptxt = '请再次输入交易密码';
				this.$refs.one.clear();
				this.isFirst = false;
			},
			finishedtwo(val) {
				this.secondval = val;
				if(this.firstval==this.secondval){
					this.tradPwd = val;
				}else{
					this.tradPwd = ''; 
					this.$toast("两次密码输入不一致");
				}
				this.isFirst = true;
				this.close()
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
			submit(){
				let _this = this;
				let { oldPassword, newPassword, pwd } = this;
				if(!oldPassword){
					this.$toast('旧密码不能为空');
					return
				}
				if(oldPassword.length < 6){
					this.$toast('旧密码有误');
					return
				}
				if(!newPassword){
					this.$toast('新密码不能为空');
					return
				}
				if(newPassword.length < 6){
					this.$toast('密码长度不能少于6位');
					return
				}
				if(!pwd){
					this.$toast('确认密码不能为空');
					return
				}
				if(pwd !== newPassword){
					this.$toast('两次密码不一致');
					return
				}
				let params = { oldPassword, newPassword };
				let url = 'user/center/password/update';
				
				_this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						_this.$back();
						setTimeout(() => {
							_this.$toast('修改密码成功');
						},300)
					}else{
						_this.$toast(res.message);
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	html,
	body,
	page,
	.l-container{
		background-color: #f6f6f6;
	}
	
	.l-container{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
	}
	
	/* .l-body{
		margin-top: 32rpx;
	} */
	
	.l-list{
		height: 110rpx;
		line-height: 110rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
	}
	
	.l-list-mt24{
		margin-top: 24rpx;
	}
	
	.l-list-key{
		min-width: 212rpx;
		font-size: 34rpx;
		white-space: nowrap;
	}
	
	.l-list-value{
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.l-list-input{
		flex: 1;
	}
	
	.l-list-flex-end{
		justify-content: flex-end;
	}
	
	.l-list-text-right{
		text-align: right;
	}
	
	.l-color-828282 {
		color: #828282;
	}
	
	.l-icon-down,
	.l-icon-clear,
	.l-icon-check-y,
	.l-icon-checked-y{
		display: inline-block;
		width: 34rpx;
		height: 34rpx;
		margin-left: 32rpx;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.l-icon-down {
		background-image: url('~@/static/handle/xiala@2x.png');
	}
	.l-icon-clear {
		background-image: url('~@/static/handle/guanbi@2x.png');
	}
	.l-icon-check-y {
		background-image: url('~@/static/handle/weixuanze@2x.png');
	}
	.l-icon-checked-y {
		background-image: url('~@/static/handle/xuanze@2x.png');
	}
	
	.l-button{
		padding-top: 128rpx;
		display: flex;
		justify-content: center;
	}
	
	.l-btb-submit{
		width:680rpx;
		height:94rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #FFFFFF;
		background:#D3A35C;
		border-radius:47rpx;
	}
	.codeTxt{
		color: #4A90E2;
	}
	.popupbox{
		width: 700rpx;
		height: 500rpx;
		background-color: #FFFFFF;
		border-radius: 80rpx;
		overflow: hidden;
		margin: 0 auto; 
		.title{
			display: flex;
			font-size: 18px;
			color: #afafaf;
			margin: 40rpx 0 160rpx;
			image{
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
</style>
