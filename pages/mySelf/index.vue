<template>
	<view class="md_height">
		<view class="uni-common-mt md_height">
			<view class="md_height">
				<map :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
			<cover-view class="md_address">
				<cover-view>您当前位置：{{nowaddress}}</cover-view>
			</cover-view>
		</view>
	</view>
</template>
<script>
	const qqMap = require('../../libs/qqmap-wx-jssdk.min');
	export default {
		data() {
			return {
				title: 'map',
				latitude: 0,
				longitude: 0,
				nowaddress: '',
				covers:[],
				circles:[]
			}
		},
		onShow() {
			// 获取经纬度
			/* wx.getLocation({
				type: 'gcj02',
				success: (res) => {
					console.log(res);
					this.latitude = res.latitude;
					this.longitude = res.longitude;
				}
			}) */
			const that = this;
			// 实例化API核心类
			var mapContext = new qqMap({
				key: 'N46BZ-DIEKX-HN743-TL6XI-XDAY3-WOBEM' // 必填
			});
			// 地理位置
			wx.getLocation({
				type: 'gcj02',
				success(res) {
					console.log(res)
					const latitude = res.latitude
					const longitude = res.longitude
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					that.covers = [];
					/* that.circles = [];
					that.circles.push({
							latitude,
							longitude,
							color: '#ff0000',
							fillColor: '#16d058e3',
							radius: 100
					}) */
					that.covers.push({
							latitude,
							longitude,
							width: 25,
							height:35,
							iconPath: '../../static/location.png'
					})
					// 调用接口转换成具体位置
					mapContext.reverseGeocoder({
						location: {
							latitude,
							longitude
						},
						success: function(res) {
							console.log(res.result);
							that.nowaddress = `${res.result.address_component.street_number}`

						},
						fail: function(res) {
							console.log(res);
						},
						// complete: function (res) {
						//   console.log(res);
						// }
					})
				}
			})
		},
		methods: {

		}
	}
</script>
<style>
	page {
		height: 100%;
	}

	map {
		width: 100%;
		height: 100%;
	}
	.md_height{
		height: 100%;
	}
	.md_address {
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.3);
		color: #f8f8f8;

	}
</style>
