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
						image: '/static/icon/aochuang.png',
						text: '通用'
					},
					{
						image: '/static/icon/elingqishi.png',
						text: '菜品'
					},
					{
						image: '/static/icon/feihongnvwu.png',
						text: '植物'
					},
					{
						image: '/static/icon/honghaoke.png',
						text: '动物'
					},
					{
						image: '/static/icon/luoji.png',
						text: '车辆'
					},
					{},
				],
				imgSrc: '/static/icon/aochuang.png'
			}
		},
		methods: {
			onTapGoSearch(e) {
				const that = this;
				that.imgSrc = e.item.image;
				// 选择图片 相册或者拍照
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						that.imgSrc = e.item.image;
						// #ifndef H5
							uni.saveFile({
							  tempFilePath: res.tempFilePaths[0],
							  success: function (resInner) {
								var savedFilePath = resInner.savedFilePath;
								uni.navigateTo({
									url: `../picIdentify/index?imgSrc=${resInner.savedFilePath}&id=${e.index}&category=${e.item.text}`
								})
							  }
							});
						// #endif
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
