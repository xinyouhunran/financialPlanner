<script>
	import store from './store';
	export default {
		onLaunch: function() {
			
			if(this.$getStorage('token')){
				store.dispatch('getUserFn');
			}
			
		},
		onShow: function() {
			console.log('App Show');
			/* uni.showTabBarRedDot({
				index:1
			});
			uni.setTabBarBadge({
				index:1,
				text:this.$store.state.user.name
			}) */
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/global.css";
	@import './common/css/uni.css';
</style>
