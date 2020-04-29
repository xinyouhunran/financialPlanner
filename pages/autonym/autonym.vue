<template>
	<view class="l-container">
		<view class="l-body" v-if="!user.idNo">
			<view class="l-list">
				<view class="l-list-key">
					证件类型
				</view>
				<view class="l-list-value">
					<input class="l-list-input" type="text" disabled placeholder="身份证" />
					<!-- <text class="l-icon-down"></text> -->
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-key">
					姓名
				</view>
				<view class="l-list-value">
					<input class="l-list-input" type="text" placeholder="姓名" v-model="realName"/>
					<text class="l-icon-clear" @tap="realName=''"></text>
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-key">
					证件号码
				</view>
				<view class="l-list-value">
					<input class="l-list-input" v-model="idNo" type="text" placeholder="证件号码" />
					<text class="l-icon-clear" @tap="idNo=''"></text>
				</view>
			</view>
			<view class="l-list l-list-mt24">
				<view class="l-list-key">
					我声明自己为中华人民共和国税收公民
				</view>
				<view class="l-list-value l-list-flex-end" @tap="checked = !checked">
					<text class="l-icon-checked-y" v-if="checked"></text>
					<text class="l-icon-check-y" v-else></text>
				</view>
			</view>
			
			<view class="l-button">
				<button class="l-btn l-btb-submit" @tap="submit">提交</button>
			</view>
		</view>
		
		<view class="l-body l-list-mt24" v-else>
			<view class="l-list">
				<view class="l-list-key">
					证件类型
				</view>
				<view class="l-list-value">
					<input class="l-list-input l-list-text-right l-color-828282" 
					disabled type="text" value="身份证" />
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-key">
					姓名
				</view>
				<view class="l-list-value">
					<input class="l-list-input l-list-text-right l-color-828282" 
					disabled type="text" value="姓名" v-model="user.realName"/>
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-key">
					证件号码
				</view>
				<view class="l-list-value">
					<input class="l-list-input l-list-text-right l-color-828282" 
					disabled type="text" value="证件号码" v-model="user.idNo"/>
				</view>
			</view>
			<view class="l-list l-list-mt24">
				<view class="l-list-key l-color-828282">
					我声明自己为中华人民共和国税收公民
				</view>
				<view class="l-list-value l-list-flex-end">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		data(){
			return {
				idNo: '',
				checked: true,
				realName: ''
			}
		},
		computed:{
			user(){
				return this.$store.getters.user;
			}
		},
		methods:{
			//...mapMutations([ 'setNickname']),
			submit(){
				let _this = this;
				let { idNo, realName, checked } = this;
				if(!realName){
					this.$toast('姓名不能为空');
					return
				}
				if(!idNo){
					this.$toast('身份证号不能为空');
					return
				}
				if(!checked){
					this.$toast('您未声明为中华人民共和国税收公民');
					return
				}
				let params = { realName, idNo };
				let url = 'user/center/info/update';
				
				_this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						_this.$store.dispatch('getUserFn');
						_this.$back();
						setTimeout(() => {
							_this.$toast('认证成功');
						}, 500)
						/* _this.jpushIM.updateMyInfo({ nickname : params.realName }, (res) => {
							if (res.errorCode == 0) {
								_this.setNickname(params.realName);
							}
						}) */
						
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
		background:rgba(172,148,114,1);
		border-radius:47rpx;
	}
</style>
