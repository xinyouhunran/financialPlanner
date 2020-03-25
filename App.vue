<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			this.$store.dispatch('setUser',{name:'123'}).then(data=>{
				console.log(this.$store.state.user);
			})
		},
		onShow: function() {
			console.log('App Show');
			uni.showTabBarRedDot({
				index:1
			});
			uni.setTabBarBadge({
				index:1,
				text:this.$store.state.user.name
			})
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
