<template>
	<view>
		<web-view :src="webSrc" v-if="webSrc"></web-view>
	</view>
</template>

<script>
	import {geth5} from '@/utils/geth5.js'
	export default {
		data() {
			return {
				userId:'',
				flag:'15',
				webSrc:''
			}
		},
		onLoad(obj) {
			if(typeof this.$getStorage('user')==='object'){
				let user = this.$getStorage('user').userInfo;
				this.userId = user.id;
				this.$toast('正在加载...',{duration:4000})
				geth5(this.flag,this.userId
				).then(data=>{
					this.webSrc = data;
				}).catch(err=>{
					/* if(err=='307'){
						this.$nav({url:'/pages/register/register'})
					} */
				})
			}else{
				this.$toast('您还未登录，即将跳转登录页',{
					fn:()=>{
						setTimeout(()=>{
							this.$nav({url:'/pages/register/register'})
						},3000)
					}
				});
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
