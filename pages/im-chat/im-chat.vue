<template>
	<view>
		<web-view :src="srcDemo"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcDemo:''
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.$get(
			'getDemo'
			).then(res => {
					console.log(res);
					this.srcDemo = '../../static/demo.html';
				}).catch(err =>{
					console.log(err);
				})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
