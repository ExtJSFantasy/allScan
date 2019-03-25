<template>

	<view>
		<view v-if="type == 0" class="md_content">
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
						<text class="md_tf" v-text="item.keyword"></text>
						<text class="md_tf" v-text="item.root"></text>
						<text class="md_tf" v-text="item.score"></text>
						<text class="md_tf" @click="onClickGoDetails(item)">...</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="type == 1" class="md_content">
			<view class="md_content_title">
				<image class="md_temp_img" :src="tempImg"></image>
				<view class="md_show_car">
					<view style="flex: 1;display:flex;height:100%;justify-content:center;align-items:center;width:100%;text-align:center;">
						<view>
							<view style="font-size:36rpx;"><text v-text="carFirstName"></text></view>
							<view style="font-size:18rpx;"><text>{{calorie}}卡路里</text></view>
						</view>
					</view>
					<view style="flex: 3;" class="tjBody flexRow">
						<circle-percent titleOne="匹配度" titleTwo="" bg="#fbad4c" :percent="similarity"></circle-percent>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item,index) in carList" :key="index">
					<view class="uni-list-cell-navigate md_list">
						<text class="md_tf" v-text="item.name"></text>
						<text class="md_tf">{{item.calorie}}卡路里</text>
						<text class="md_tf" v-text="item.probability"></text>
						<text class="md_tf" @click="onClickGoDetails(item)">...</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="type == 2" class="md_content">
			<view class="md_content_title">
				<image class="md_temp_img" :src="tempImg"></image>
				<view class="md_show_car">
					<view style="flex: 1;display:flex;height:100%;justify-content:center;align-items:center;width:100%;text-align:center;">
						<text v-text="carFirstName"></text>
					</view>
					<view style="flex: 3;" class="tjBody flexRow">
						<circle-percent titleOne="匹配度" titleTwo="" bg="#fbad4c" :percent="similarity"></circle-percent>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item,index) in carList" :key="index">
					<view class="uni-list-cell-navigate md_list">
						<text class="md_tf" v-text="item.name"></text>
						<text class="md_tf" v-text="item.score"></text>
						<text class="md_tf" @click="onClickGoDetails(item)">...</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="type == 3" class="md_content">
			<view class="md_content_title">
				<image class="md_temp_img" :src="tempImg"></image>
				<view class="md_show_car">
					<view style="flex: 1;display:flex;height:100%;justify-content:center;align-items:center;width:100%;text-align:center;">
						<text v-text="carFirstName"></text>
					</view>
					<view style="flex: 3;" class="tjBody flexRow">
						<circle-percent titleOne="匹配度" titleTwo="" bg="#fbad4c" :percent="similarity"></circle-percent>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item,index) in carList" :key="index">
					<view class="uni-list-cell-navigate md_list">
						<text class="md_tf" v-text="item.name"></text>
						<text class="md_tf" v-text="item.score"></text>
						<text class="md_tf" @click="onClickGoDetails(item)">...</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="type == 4" class="md_content">
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
						<text class="md_tf" @click="onClickGoDetails(item)">...</text>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			<view style="justify-content:flex-end;" @tap="closeBanner">
				<view style="justify-content:flex-end; text-align:right; padding:20upx;">
					<text class="uni-icon uni-icon-close"></text>
				</view>
			</view>
			<view style="width: 90%;margin: 0 auto;">
				<image style="width: 100%;" :src="detailData.image_url" mode="widthFix"></image>
			</view>
			<view style="padding:0 20upx 20upx 20upx;">
				<scroll-view class="scroll-view_V" scroll-y="true">
					<view style="text-indent:2em;margin-top: 20upx;" v-text="detailData.description"></view>
				</scroll-view>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
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
				tempImg: '',
				carInfo: [],
				carFirstName: '',
				similarity: 0,
				calorie: 0,
				carList: [],
				type: '',
				backData: {},
				bannerShow: false,
				detailData: {}
			}
		},
		mounted() {
			this.initData();
		},
		onLoad(params) {
			const that = this;
			console.log(params);
			that.tempImg = params.imgSrc;
			uni.setNavigationBarTitle({
				title: `${params.category}识别`
			});
			//return
			switch (params.id) {
				case '0':
					// 通用
					that.checkImg(params, 'v11');
					break;
				case '1':
					//菜品
					that.checkImg(params, 'v12');
					break;
				case '2':
					//植物
					that.checkImg(params, 'v10');
					break;
				case '3':
					// 动物
					that.checkImg(params, 'v9');
					break;
				case '4':
					//车辆
					that.checkImg(params, 'v1');
					break;
				default:
					break;
			}


		},
		methods: {
			initData() {

			},
			checkImg(params, type) {
				const that = this;
				uni.showLoading({
					title: '识别中',
					icon: 'loading'
				})
				uni.uploadFile({
					url: `${urls.dev.api}/searchAll/${type}/wanzi`,
					filePath: params.imgSrc,
					name: 'file',
					header: {
						'content-Type': 'application/json'
					},
					formData: {
						user: 'wanzi',
						idCardSide: 'front'
					},
					success: (uploadFileRes) => {
						uni.hideLoading();
						console.log(JSON.parse(uploadFileRes.data));
						let result;
						that.type = params.id;
						switch (params.id) {
							case '0':
								result = JSON.parse(uploadFileRes.data).result;
								//that.carList = result.slice(1, result.length);
								that.carList = result;
								that.carList.forEach((item, index) => {
									item.score = (item.score * 100).toFixed(2) + '%';
								});
								that.carFirstName = result[0].keyword;
								//that.similarity = (result[0].score * 100).toFixed(2);
								that.similarity = result[0].score.substring(0, result[0].score.length - 1);
								break;
							case '1':
								result = JSON.parse(uploadFileRes.data).result;
								//that.carList = result.slice(1, result.length);
								that.carList = result;
								that.carList.forEach((item, index) => {
									item.probability = (item.probability * 100).toFixed(2) + '%';
								});
								console.log(that.carList);
								that.carFirstName = result[0].name;
								//that.similarity = (result[0].probability * 100).toFixed(2);
								that.similarity = result[0].probability.substring(0, result[0].probability.length - 1);
								that.calorie = result[0].calorie;
								break;
							case '2':
								result = JSON.parse(uploadFileRes.data).result;
								//that.carList = result.slice(1, result.length);
								that.carList = result;
								that.carList.forEach((item, index) => {
									item.score = (item.score * 100).toFixed(2) + '%';
								});
								console.log(that.carList);
								that.carFirstName = result[0].name;
								//that.similarity = (result[0].score * 100).toFixed(2);
								that.similarity = result[0].score.substring(0, result[0].score.length - 1);
								break;
							case '3':
								result = JSON.parse(uploadFileRes.data).result;
								//that.carList = result.slice(1, result.length);
								that.carList = result;
								that.carList.forEach((item, index) => {
									item.score = (item.score * 100).toFixed(2) + '%';
								});
								console.log(that.carList);
								that.carFirstName = result[0].name;
								//that.similarity = (result[0].score * 100).toFixed(2);
								that.similarity = result[0].score.substring(0, result[0].score.length - 1);
								break;
							case '4':
								result = JSON.parse(uploadFileRes.data).result;
								//that.carList = result.slice(1, result.length);
								that.carList = result;
								that.carList.forEach((item, index) => {
									item.score = (item.score * 100).toFixed(2) + '%';
								});
								that.carFirstName = result[0].name;
								//that.similarity = (result[0].score * 100).toFixed(2);
								that.similarity = result[0].score.substring(0, result[0].score.length - 1);
								break;
							default:
								break;
						}

					},
					fail: (err) => {
						uni.hideLoading()
					}
				});
			},
			onClickGoDetails(item) {
				if (item.baike_info.image_url == undefined) {
					return
				} else {
					this.detailData = item.baike_info;
					this.bannerShow = true;
				}

			},
			closeBanner: function() {
				this.bannerShow = false;
			},
		}
	}
</script>
<style lang="scss">
	@import url("../../commons/uni.css");

	page {
		height: 100%;
		width: 100%;
	}

	/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 100;
	}

	/* 弹出层形式的广告 */
	.uni-banner {
		width: 70%;
		position: fixed;
		left: 50%;
		top: 50%;
		background: #FFF;
		border-radius: 10upx;
		z-index: 1000;
		transform: translate(-50%, -50%);
	}

	.uni-card-content-inner {
		padding: 0;
	}

	.scroll-view_V {
		height: 400upx;
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
				align-items: center;
				margin-left: 40upx;
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
