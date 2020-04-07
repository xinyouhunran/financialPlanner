<template>
	<view class="l-container">
		<view class="l-div l-div-1">
			<view class="l-div-label">
				联系电话：
			</view>
			<view class="l-div-value">
				<input class="l-div-input" type="text" v-model="phone" placeholder="请输入您的联系电话"/>
			</view>
		</view>
		<view class="l-div l-div-2">
			<textarea class="l-div-textarea" maxlength="200" v-model="content"
			placeholder="请写下您的建议，如功能需求、产品吐槽等，我们会努力改进（若您的手机号有变更，请留下新的手机号，便于我们电话回访）"
			placeholder-style="color:#828282;"
			 />
			 <text class="l-div-count">0/200</text>
		</view>
		<view class="l-div l-div-3">
			<button class="l-btn l-feedback-btn" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				phone: '',
				content: ''
			}
		},
		onLoad() {
			this.phone = this.user.phone || '';
		},
		computed:{
			user(){
				return this.$store.getters.user;
			}
		},
		methods: {
			submit(){
				let content = this.content;
				if(!content){
					this.$toast('反馈内容不能为空');
					return
				}
				if(content.length > 200){
					this.$toast('反馈内容字数不能多于200字');
					return
				}
				let params = { content };
				let url = 'user/center/feedback/submit';
				
				this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						this.$back();
						setTimeout(() => {
							this.$toast('感谢您的反馈！');
						},500)
					}else{
						this.$toast(res.message);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.l-container{
		font-size: 32rpx;
		padding: 20rpx 30rpx 36rpx;
	}
	
	.l-div-1{
		display: flex;
		align-items: center;
	}
	
	.l-div-2{
		display: flex;
		position: relative;
		border-radius:4px;
		border:1px solid rgba(193,193,193,1);
		margin: 36rpx 0 214rpx;
	}
	
	.l-div-textarea{
		flex: 1;
		padding: 22rpx 15rpx;
	}
	
	.l-div-count{
		color: #828282;
		font-size: 30rpx;
		position: absolute;
		right: 15rpx;
		bottom: 12rpx;
	}
	
	.l-div-label{
		padding-right: 25rpx;
		white-space: nowrap;
	}
	
	.l-div-value{
		flex: 1;
		height: 74rpx;
		display: flex;
		align-items: center;
		border-radius:4px;
		padding: 0 14rpx;
		border:1px solid rgba(193,193,193,1);
	}
	
	.l-div-input{
		flex: 1;
	}
	
	.l-feedback-btn{
		height: 94rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: 47rpx;
		background-color: #D3A35C;
	}
	
</style>
