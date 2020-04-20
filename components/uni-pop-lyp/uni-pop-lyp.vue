<template>
	<view class="l-pop" @touchmove.stop.prevent="1">
		<view class="l-pop-view">
			<text class="l-icon l-icon-close" @tap="$emit('close')"></text>
			
			<view class="l-pv-1">
				预约理财师
			</view>
			
			<view class="l-pv-2">
				我们将在10分钟内给您回电
			</view>
			
			<view class="l-pv-3">
				<view class="l-pv-left">
					<text class="l-icon l-icon-xm"></text>
				</view>
				<view class="l-pv-rigth">
					<input class="l-pv-input" type="text" placeholder="您的姓名" v-model="name">
					<text class="l-icon l-icon-del" @tap="name = ''"></text>
				</view>
			</view>
			
			<view class="l-pv-4">
				<view class="l-pv-left">
					<text class="l-icon l-icon-dh"></text>
				</view>
				<view class="l-pv-rigth">
					<input class="l-pv-input" type="number" maxlength="11" v-model="phone" placeholder="您的电话">
					<text class="l-icon l-icon-del" @tap="phone = ''"></text>
				</view>
			</view>
			
			<view class="l-pv-5">
				<button class="l-btn l-btn-sub" @tap="reserve">提交</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props:['targetId', 'type'],
		data(){
			return {
				phone: '',
				name: ''
			}
		},
		computed:{
			user(){
				return this.$store.getters.user;
			}
		},
		mounted(){
			setTimeout(() => {
				this.name = this.user.realName || '';
				this.phone = this.user.phone || '';
			},200)
		},
		methods:{
			reserve(){
				let name = this.name;
				let phone = this.phone;
				if(!name){
					this.$toast('姓名不能为空');
					return
				}
				if(!phone){
					this.$toast('电话不能为空');
					return
				}
				if(phone.length < 11){
					this.$toast('电话号码有误');
					return
				}
				let targetId = this.targetId;
				let type = this.type;
				let params = { name, phone, targetId, type };
				let url = 'customer/reserve';
				
				this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						this.$toast('预约成功,请耐心等待');
						this.$emit('success')
					}else{
						this.$toast(res.message);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.l-pop{
		position: fixed;
		background-color: rgba(0,0,0,0.6);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		z-index: 777;
		justify-content: center;
	}
	
	.l-pop-view{
		box-sizing: border-box;
		margin-top: 20vh;
		padding: 46rpx 48rpx 60rpx 40rpx;
		width: 600rpx;
		height: 614rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		position: relative;
	}
	
	.l-pv-1{
		text-align: center;
		font-size: 40rpx;
	}
	
	.l-pv-2{
		font-size: 30rpx;
		color: #828282;
		text-align: center;
		padding: 41rpx 0 4rpx 0;
	}
	
	.l-pv-3,
	.l-pv-4{
		padding-left: 22rpx;
		display: flex;
		align-items: center;
		padding-top: 62rpx;
	}
	.l-pv-left{
		padding-bottom: 21rpx;
	}
	.l-pv-rigth{
		flex: 1;
		display: flex;
		align-items: center;
		padding-bottom: 21rpx;
		border-bottom: 1rpx solid #EDEDED;
	}
	
	.l-pv-input{
		flex: 1;
		margin-right: 10rpx;
	}
	
	
	.l-icon-close{
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		width: 26rpx;
		height: 26rpx;
		z-index: 1;
		background-image: url('~@/static/l-close@2x.png');
	}
	
	.l-icon-del{
		width: 34rpx;
		height: 34rpx;
		margin-left: 12rpx;
		background-image: url('~@/static/l-close-12x.png');
	}
	
	.l-icon-xm{
		width: 36rpx;
		height: 36rpx;
		margin-right: 23rpx;
		background-image: url('~@/static/touxiang.png');
	}
	
	.l-icon-dh{
		width: 36rpx;
		height: 36rpx;
		margin-right: 23rpx;
		background-image: url('~@/static/l-phone@2x.png');
	}
	
	.l-btn-sub{
		margin-top: 74rpx;
		width:520rpx;
		height:86rpx;
		background:rgba(231,0,18,1);
		border-radius:43rpx;
		display: flex;
		font-size: 36rpx;
		color: #FFFFFF;
		align-items: center;
		justify-content: center;
	}

</style>
