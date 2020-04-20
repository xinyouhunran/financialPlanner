<template>
	<view class="l-module l-flex">
		<view class="l-module-left l-flex l-flex-direction l-flex-ai_c-jc_c" @tap="onFollow">
			<image class="l-img-erji" v-if="dataInfo.fav" src="../../static/product/xingzhuang@2x.png" mode="aspectFill"></image>
			<image class="l-img-erji" v-else src="../../static/product/shoucang@2x.png" mode="aspectFill"></image>
			<view class="l-module-center-txt">{{ dataInfo.fav ? '取消关注' : '关注' }}</view>
		</view>
		<view class="l-module-left l-flex l-flex-direction l-flex-ai_c-jc_c" @tap="showApp('0')">
			<image class="l-img-erji" src="../../static/product/PK@2x.png" mode="aspectFill"></image>
			<view class="l-module-center-txt">对比</view>
		</view>
		<view class="l-module-left l-flex l-flex-direction l-flex-ai_c-jc_c" @tap="showApp('1')">
			<image class="l-img-erji" src="../../static/product/zhangdan@2x.png" mode="aspectFill"></image>
			<view class="l-module-center-txt">收益</view>
		</view>
		<view class="l-module-left l-flex l-flex-direction l-flex-ai_c-jc_c" @tap="showApp('2')">
			<image class="l-img-erji" src="../../static/product/kefu@2x.png" mode="aspectFill"></image>
			<view class="l-module-center-txt">咨询</view>
		</view>
		<view class="l-module-right" v-if="dataInfo.storeUser">
			<view class="l-mr-view l-flex l-flex-ai_c-jc_c"  @tap="onService">
				<view class="l-mr-img-list">
					<image v-if="!dataInfo.customerServers || !dataInfo.customerServers.length" class="l-mri-avatar l-mri-avatar0" src="../../static/ren@2x.png" mode="aspectFill"></image>
					<template v-else>
						<image v-for="(s, i) in dataInfo.customerServers" :key="i" class="l-mri-avatar l-mri-avatar0" :src="s.headPortrait ? s.headPortrait : '../../../static/ren@2x.png'" mode="aspectFill"></image>
					</template>
				</view>
				<view class="l-mr-txt">
					官方直营
				</view>
				<view class="l-mr-posi">
					驻店客服
				</view>
			</view>
			
			<view class="l-mr-posi-view" :class="{ 'l-mr-posi-view-height': isPackUp }">
				<view class="l-mr-posi">
					驻店客服
				</view>
				<view class="l-mrpv-top">
					直聊大咖·0中间费
				</view>
				
				<view class="l-mrpv-1">
					<span class="l-mrpv-span">{{ dataInfo.partyShortName || '--' }}</span>
					<span class="l-icon l-icon-renzheng"></span>
				</view>
				
				<view class="l-mrpv-list" v-for="(s, i) in dataInfo.customerServers" :key="i" @tap="$store.dispatch('onChat', s)">
					<view>
						<image class="l-mrpv-list-img" :src="s.headPortrait ? s.headPortrait : '../../../static/ren@2x.png'" mode="aspectFill"></image>
					</view>
					<view class="l-mrpv-list-view" :class="{ 'l-mrpv-list-after': i != 2 }">
						<view>
							<view class="l-l-mrpv-lv-name">
								{{ s.realName || '--' }}
							</view>
							<view class="l-l-mrpv-lv-post">
								{{ s.position || '--' }}
							</view>
						</view>
					</view>
				</view>
				
				<view class="l-mrpv-pack-up"
				  @tap="onPackUp"
				 >
					<span>点击收起</span>
					<span class="l-icon l-icon-pack-up"></span>
				</view>
				
			</view>
		</view>
	
		<view class="l-module-right" v-else @tap="subscribe">
			<view class="l-mr-img-list">
				<image  class="l-mri-avatar l-mri-avatar0" src="../../static/ren@2x.png" mode="aspectFill"></image>
			</view>
			<view class="l-mr-resver">
				<view>
					<view class="l-resver">预约产品</view>
					<view class="l-resver-1">10分钟内回电</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		props:{
			dataInfo:{
				type: Object,
				default(){
					return {  }
				}
			},
			securityId: [String, Number]
		},
		data(){
			return {
				isPackUp: false,
				isInterval: false
			}
		},
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin;
			}
		},
		methods:{
			showApp(type){
				// #ifdef H5
				this.$store.dispatch('downloadApp');
				//return
				//  #endif
				if(!this.hasLogin) {
					this.$toast('您还未登录，请先登录');
					return
				}
				
				if(type == 0){
					this.$nav({ url: '/pages/pk/pk?id='+ this.securityId })
				}else if(type == 1){
					this.$nav({ url: '/pages/tally/tally?id='+ this.securityId })
				}else{
					this.$store.dispatch('onService', '私人客服')
				}
			},
			subscribe(){
				this.$emit('subscribe')
			},
			onService(){
				// #ifdef H5
				this.showApp();
				return
				//  #endif
				if(!this.hasLogin) {
					this.$toast('您还未登录，请先登录');
					return
				}
				if(this.dataInfo.customerServers && this.dataInfo.customerServers.length){
					this.isPackUp = true;
				}else{
					this.$toast('该公司暂未入驻客服人员,请先预约')
				}
			},
			onPackUp(){
				this.isPackUp = false;
			},
			onFollow(){
				if(!this.hasLogin) {
					this.$toast('您还未登录，请先登录');
					return
				}
				let _this = this;
				let params = { securityId: this.securityId };
				let url = _this.dataInfo.fav ? 'user/fav/funds/remove' : 'user/fav/funds/add';
				this.$post(url, params)
					.then(res => {
						if (res.code == 200) {
							_this.$set(_this.dataInfo,'fav', !_this.dataInfo.fav)
						}
					})
			}
		}
	}
</script>

<style scoped >
	.l-module{
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 117rpx;
		z-index: 550;
		text-align: center;
		background-color: #FFFFFF;
	}
	
	.l-module-center{
		color: #FFFFFF;
		background-color: #D8D8D8;
	}
	
	.l-module-center,
	.l-module-left,
	.l-module-right{
		flex: 1;
	}
	
	.l-module-left{
		position: relative;
		background-color: #FFFFFF;
	}
	
	.l-mr-resver{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.l-module-right{
		position: relative;
		min-width: 270rpx;
		color: #FFFFFF;
		background: url('~@/static/l-img-banyuan.png')center/cover no-repeat;
		border-bottom-left-radius: 59rpx;
		border-top-left-radius: 59rpx;
		font-size: 14px;
		color: #F6D59F;
		display: flex;
		font-weight: bold;
	}
	
	.l-mr-resver{
		width: 55%;
		white-space: nowrap;
	}
	
	.l-resver-1{
		font-size: 20rpx;
		color: #FFFFFF;
		margin-top: 15rpx;
		white-space: nowrap;
	}
	
	.l-img-erji{
		width: 36rpx;
		height: 34rpx;
	}
	.l-module-center-txt{
		padding-top: 15rpx;
	}
	
	.l-mr-txt{
		flex: 1;
		white-space: nowrap;
		margin-right: 20rpx;
	}
	
	.l-mr-img-list{
		flex: 1;
		position: relative;
		height: 100%;
		margin-right: 20rpx;
	}
	
	.l-mri-avatar{
		width: 66rpx;
		height: 66rpx;
		border: 2rpx solid #FFFFFF;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.l-mri-avatar0{
		right: 0;
		z-index: 3;
	}
	.l-mri-avatar1{
		right: 15rpx;
		z-index: 2;
	}
	.l-mri-avatar2{
		right: 30rpx;
		z-index: 1;
	}
	
	.l-mr-posi{
		position: absolute;
		right: 0;
		top: 0;
		width: 99rpx;
		height: 28rpx;
		color: #000000;
		font-size: 10px;
		display: flex;
		z-index: 1;
		align-items: center;
		justify-content: center;
		background: url('~@/static/product/juxing@2x.png') center/ cover no-repeat;
	}
	
	.l-mr-view{
		width: 100%;
		position: relative;
	}
	
	.l-mr-posi-view{
		box-sizing: border-box;
		padding-left: 16rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 4;
		height: 0;
		transition: all 0.3s;
		border-bottom-left-radius: 59rpx;
		border-top-left-radius: 59rpx;
		background: url('~@/static/product/l-kefu-bg.png') center/cover no-repeat;
	}
	
	.l-mr-posi-view-height{
		height: auto;
	}
	
	.l-mrpv-top{
		text-align: left;
		padding-top: 8rpx;
		padding-left: 22rpx;
		font-size: 8px;
		color: #A39B90;
	}
	
	.l-mrpv-1{
		display: flex;
		align-items: center;
		padding: 39rpx 0 21rpx 22rpx;
	}
	
	.l-mrpv-span{
		width: 120rpx;
		font-size: 14px;
		color: #F6D59F;
	}
	
	.l-mrpv-span,
	.l-l-mrpv-lv-name,
	.l-l-mrpv-lv-post{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-l-mrpv-lv-name,
	.l-l-mrpv-lv-post{
		width: 120rpx;
		text-align: left;
	}
	
	.l-l-mrpv-lv-name{
		color: #FFFFFF;
		font-size: 16px;
	}
	
	.l-l-mrpv-lv-post{
		color: #9D9FA1;
		font-size: 12px;
		margin-top: 17rpx;
	}
	
	.l-mrpv-list{
		display: flex;
		align-items: center;
	}
	
	.l-mrpv-list-img{
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
		margin-right: 17rpx;
		border: 2rpx solid #FFFFFF;
	}
	
	.l-mrpv-list-view{
		display: flex;
		align-items: center;
		flex: 1;
		height: 104rpx;
		padding: 18rpx 0 22rpx;
		position: relative;
	}
	
	.l-mrpv-list-after::after{
		content: ' ';
		display: block;
		position: absolute;
		bottom: 3rpx;
		left: 0;
		width: 100%;
		height: 3rpx;
		background:linear-gradient(0deg,rgba(76,77,79,1) 0%,rgba(99,100,102,1) 100%);
	}
	
	.l-mrpv-pack-up{
		padding: 48rpx 0 36rpx;
		display: flex;
		font-size: 14px;
		color: #9E9FA1;
		justify-content: center;
		align-items: center;
	}
	
	.l-icon-renzheng{
		margin-left: 8rpx;
		width: 22rpx;
		height: 24rpx;
		background-image: url('~@/static/product/renzheng@2x.png');
	}
	
	.l-icon-pack-up{
		margin-left: 12rpx;
		width: 24rpx;
		height: 13rpx;
		background-image: url('~@/static/product/back@2x.png');
	}
</style>
