<template>
	<view class="page">
		<view>
			<grid :data="data" show-border="false" @click="onTapGoSearch"></grid>
		</view>
		<view class="md_scan">
			<image :src="imgSrc"></image>
		</view>
	</view>
</template>

<script>
	import grid from '@/components/grid.vue';
	const main = require('@/commons/main');
	const urls = require('@/commons/urls');
	export default {
		components: {
			grid
		},
		data() {
			return {
				data: [{
						image: '/static/icon/aochuang.png',
						text: '车辆识别'
					},
					{
						image: '/static/icon/elingqishi.png',
						text: '恶灵骑士'
					},
					{
						image: '/static/icon/feihongnvwu.png',
						text: '绯红女巫'
					},
					{
						image: '/static/icon/honghaoke.png',
						text: '洪浩克'
					},
					{
						image: '/static/icon/luoji.png',
						text: '洛基'
					},
					{
						image: '/static/icon/luonan.png',
						text: '罗南'
					},
					{
						image: '/static/icon/mieba.png',
						text: '灭霸'
					},
					{
						image: '/static/icon/qiyiboshi.png',
						text: '奇异博士'
					},
					{
						image: '/static/icon/zemonanjue.png',
						text: '男爵'
					}
				],
				imgSrc: '/static/icon/aochuang.png'
			}
		},
		methods: {
			onClick(e) {
				console.log('点击grid:' + JSON.stringify(e));
			},
			onTapGoSearch(e) {
				console.log(e);
				const that = this;
				that.imgSrc = e.item.image;
				if(e.index != 0){
					uni.showToast({
						title: '敬请期待^_^',
					})
					return
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						console.log(res.tempFilePaths);
						that.imgSrc = e.item.image;
						uni.navigateTo({
							url: `../identify/index?imgSrc=${res.tempFilePaths[0]}`
						})
						
						/* main.mdRequst(`${urls.dev.api}/searchAll/v1/xds/`,res.tempFilePaths[0],'POST',(success) => {
							console.log(success,'1234');
						},(err) =>{
							consoel.log(err,'6789');
						}) */
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.md_scan {
		position: fixed;
		width: 100%;
		height: 200upx;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;

		& image {
			width: 100upx;
			height: 100upx;
		}
	}
</style>
