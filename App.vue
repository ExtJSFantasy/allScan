<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					console.log('运行Android上')
					break;
				case 'ios':
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
