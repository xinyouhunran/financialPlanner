<template>
	<view>
		<scroll-view scroll-y="true" 
		scroll-with-animation="true" 
		class="scrbox" 
		:scroll-top="st" 
		:scroll-into-view="siv"
		@scrolltolower='loadMore'>
			<view id="sa">12345</view>
			<view id="sb">12345</view>
			<view id="sc">12345</view>
			<view id="sd">12345</view>
			<view id="se">12345</view>
		</scroll-view>
		<!-- <uni-load-more :status="status"/> -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color='#fff' vertical="true">
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<movable-area class="ma">
		    <movable-view :x="x" :y="y" direction="all" @change="onChange" class="mv">text</movable-view>
		</movable-area>
		
		<rich-text :nodes="nodes"></rich-text>
		
		<editor placeholder="编辑"></editor>
		
		<input type="number" value="123" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date:this.$yymmdd(new Date(),'ymd','-'),
				st:50,
				siv:'sd',
				status:'loading',
				x:0,
				y:0,
				nodes:[{
					name:'p',
					children:[{
						type:'text',
						text:'123'
					}]
				},{
					name:'img',
					attrs:{
						src:'../../static/logo.png'
					}
				}]
			}
		},
		methods:{
			bindDateChange(e){
				this.date = e.target.value;
			},
			loadMore(){
				this.status = 'loading';
				setTimeout(()=>{
					this.status = 'more';
				},1000);
			},
			onChange(e){
				this.x = e.detail.x
				this.y = e.detail.y
			}
		}
	}
</script>

<style scoped>
.scrbox{
	height: 1000rpx;
}
.scrbox view{
	height: 400rpx;
}
.mv{
	width: 200rpx;
	height: 200rpx;
}
.ma{
	height: 400rpx;
	width: 100%;
}
</style>
