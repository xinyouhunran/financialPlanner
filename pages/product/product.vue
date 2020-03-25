<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			this.$store.state.user.name = '456';
			uni.setTabBarBadge({
				index:1,
				text:this.$store.state.user.name
			})
		}
	}
</script>

<style>

</style>
