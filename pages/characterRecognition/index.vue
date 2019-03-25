<template>
	<view class="page">
		<view>
			<grid :data="data" show-border="false" @click="onTapGoSearch"></grid>
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
						image: '/static/icon/shenqisixia-shenqixiansheng.png',
						text: '身份证'
					},
					{
						image: '/static/icon/fuchouzhelianmeng-yingyan.png',
						text: '银行卡'
					},
					{
						image: '/static/icon/yinhehuweidui-xingjue.png',
						text: '营业执照'
					}, {
						image: '/static/icon/fuchouzhelianmeng-yiren.png',
						text: '驾驶证'
					}, {
						image: '/static/icon/hanweizhelianmeng-yemoxia.png',
						text: '行驶证'
					}, {
						image: '/static/icon/yinhehuweidui-gelute.png',
						text: '手写文字识别'
					}
				],
				imgSrc: '/static/icon/aochuang.png'
			}
		},
		methods: {
			// 点击每一项
			onTapGoSearch(e) {
				const that = this;
				that.imgSrc = e.item.image;
				if (e.index == 0) {
					uni.showToast({
						title: '身份证含照片的一面',
					})
				}
				// 选择图片 相册或者拍照
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success(res) {
						that.imgSrc = e.item.image;
						// #ifndef H5
						uni.saveFile({
							tempFilePath: res.tempFilePaths[0],
							success(resInner) {
								var savedFilePath = resInner.savedFilePath;
								uni.navigateTo({
									url: `../identify/index?imgSrc=${resInner.savedFilePath}&id=${e.index}&category=${e.item.text}`
								})
							},
							fail(err) {
								console.log(err);
							}
						});
						// #endif
					},
					fail(err) {
						console.log(err);
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
