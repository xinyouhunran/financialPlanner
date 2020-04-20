<template>
	<view container>
		<view class="register l-flex l-flex-direction l-flex-ai_c">
			<view class="logomain">
				<image src="../../static/register-login/mainlogo.png" mode=""></image>
			</view>
			<view class="re-phone">
				<view class="">
					<image src="../../static/register-login/phone.png" mode=""></image>
				</view>
				<input type="text" v-model="phone" placeholder="请输入11位手机号" placeholder-class="placeclass" maxlength="11"/>
			</view>
			<view class="move">
				<helang-moveVerify @result='verifyResult' ref="verifyElement"></helang-moveVerify>
			</view>
			<view class="next mybtn" @tap="next">
				下一步
			</view>
			<view class="tip">
                <span>点击“下一步”即同意 </span><span>《用户协议》</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				isVerify:false,
				resultData:{}
			}
		},
		methods: {
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
			/* 校验结果回调函数 */
			verifyResult(res){
				this.resultData = res;
			},
			/* 校验插件重置 */
			verifyReset(){
				this.$refs.verifyElement.reset();
	
				/* 删除当前页面的数据 */
				this.resultData = {};
			},
			next(){
				if(this.isPhone(this.phone)){
					if(this.resultData.flag){
						if(false){
							this.$nav({url:`/pages/register/pass-login?userName=${this.phone}`});
						}else{
							this.$nav({url:`/pages/register/register-invite?userName=${this.phone}`});
						}				
					}else{
						this.$toast('您还未进行验证')
					}
				}	
			}
		}
	}
</script>

<style scoped lang="scss">
.register{
	.re-phone{
		display: flex;
		align-items: center;
		width: 670rpx;
		height: 90rpx;
		border: 1px solid #EDEDED;
		border-radius: 44rpx;
		image{
			width: 28rpx;
			height: 32rpx;
			margin-left: 52rpx;
			margin-right: 30rpx;
		}
		input{
			font-size: 15px;
		}
		.placeclass{
			color: #afafaf;
			font-size: 15px;
		}
	}
	.move{
		width: 670rpx;
		margin-top: 40rpx;
	}
	.next{
		margin: 220rpx auto 0;
	}
	.tip{
		font-size: 14px;
		margin-top: 40rpx;
		color: #AFAFAF;
		span:nth-of-type(2){
			color: #D3A35C;
		}
	}
}
</style>
