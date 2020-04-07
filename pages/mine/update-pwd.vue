<template>
	<view class="l-container">
		<view class="l-body" >
			<view class="l-list">
				<view class="l-list-key">
					旧密码
				</view>
				<view class="l-list-value">
					<input class="l-list-input" type="password" v-model="oldPassword" placeholder="请输入旧密码" />
					<text class="l-icon-clear" @tap="oldPassword=''"></text>
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-key">
					新密码
				</view>
				<view class="l-list-value">
					<input class="l-list-input" type="password" placeholder="请输入新密码" v-model="newPassword"/>
					<text class="l-icon-clear" @tap="newPassword=''"></text>
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-key">
					确认密码
				</view>
				<view class="l-list-value">
					<input class="l-list-input" v-model="pwd" type="password" placeholder="请再次输入新密码" />
					<text class="l-icon-clear" @tap="pwd=''"></text>
				</view>
			</view>
			
			<view class="l-button">
				<button class="l-btn l-btb-submit" @tap="submit">提交</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				pwd: '',
				newPassword: '',
				oldPassword: ''
			}
		},
		computed:{
			user(){
				return this.$store.getters.user;
			}
		},
		methods:{
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

<style scoped>
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
</style>
