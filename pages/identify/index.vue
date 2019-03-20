<template>
	<view class="md_content">
		<!-- <view class="uni-card">
			<view class="uni-card-header">页眉</view>
			<view class="uni-card-content">
				<view class="uni-card-content-inner">
					内容
				</view>
			</view>
			<view class="uni-card-footer">页脚</view>
		</view> -->
		<view class="md_content_title">
			<image class="md_temp_img" :src="tempImg"></image>
			<view class="md_show_car">
				<view style="flex: 1;display:flex;height:100%;justify-content:center;align-items:center;width:100%;text-align:center;"><text
					 v-text="carFirstName"></text></view>
				<view style="flex: 3;" class="tjBody flexRow">
					<circle-percent titleOne="匹配度" titleTwo="" bg="#fbad4c" :percent="similarity"></circle-percent>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in carList" :key="index">
				<view class="uni-list-cell-navigate md_list">
					<text class="md_tf" v-text="item.name"></text>
					<text class="md_tf" v-text="item.year"></text>
					<text class="md_tf" v-text="item.score"></text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import circlePercent from '@/components/circle-percent/circle-percent'
	const main = require('@/commons/main');
	const urls = require('@/commons/urls');
	export default {
		components: {
			circlePercent
		},
		data() {
			return {
				showText: '识别中。。。',
				tempImg: 'http://tmp/touristappid.o6zAJs1CL8vtlro7XqJ-bCW5YMJA.TBb2wF0g3anJdc2286360068f7631c8c4161dff35d6a.jpeg',
				carInfo: [],
				carFirstName: '',
				similarity: 0,
				carList: []
			}
		},
		mounted() {
			this.initData();
		},
		onLoad(params) {
			const that = this;
			console.log(params.imgSrc);
			//return
			uni.showLoading({
				title: '识别中',
				icon: 'loading'
			})
			uni.uploadFile({
				url: `${urls.dev.api}/searchAll/v1/xds`,
				filePath: params.imgSrc,
				name: 'file',
				header: {
					'content-Type': 'application/json'
				},
				formData: {
					'user': 'xds'
				},
				success: (uploadFileRes) => {
					uni.hideLoading()
					console.log(JSON.parse(uploadFileRes.data).result);
					let result = JSON.parse(uploadFileRes.data).result;
					that.carList = result.slice(1, result.length);
					that.carList.forEach((item, index) => {
						item.score = (item.score * 100).toFixed(2) + '%';
					});
					console.log(that.carList);
					that.carFirstName = result[0].name;
					that.similarity = (result[0].score * 100).toFixed(2);
					console.log(that);
				},
				fail: (err) => {
					uni.hideLoading()
				}
			});
		},
		methods: {
			initData() {

			}
		}
	}
</script>
<style lang="scss">
	@import url("../../commons/uni.css");

	page {
		height: 100%;
		width: 100%;
	}

	.md_content {
		height: 100%;
		width: 100%;

		.md_content_title {
			display: flex;
			height: 300upx;
			align-items: center;

			.md_temp_img {
				width: 300upx;
				height: 200upx;
				margin: 10upx 0 0 10upx;
			}

			&>view {
				width: 100%;
				display: flex;
				height: 100%;
			}

			.flexRow {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				// justify-content: space-around;
				justify-content: center;
				align-items: center;

			}

			.tj {
				margin-bottom: 0;
				padding-bottom: 0;

				.tjTitle {
					display: flex;
					flex-direction: row;
					border-bottom: 1upx solid #ebedf0;
					padding: 40upx 0;

					.left {
						flex: 1;
						text-align: left;
						font-size: $uni-font-size-base;
						font-weight: bold;
					}

					.right {
						flex: 1;
						text-align: right;
						color: $uni-text-color-grey;
					}
				}

				.tjBody {
					justify-content: flex-start;
					border-bottom: 1upx solid #f5f5f5;
				}
			}
		}

		.md_list {
			display: flex;

			.md_tf:nth-child(1) {
				flex: 2;
				text-align: left;
			}

			.md_tf:nth-child(2) {
				flex: 1;
				text-align: center;
			}

			.md_tf:nth-child(3) {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
