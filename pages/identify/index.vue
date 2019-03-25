<template>
	<view v-if="type == 0 || type == 2 || type == 3" class="md_content">
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in carList" :key="index">
				<view class="uni-list-cell-navigate">
					<text v-text="item.name"></text>
					<text v-text="item.value"></text>
				</view>
			</view>
		</view>
	</view>
	<view v-else-if="type == 5" class="md_content">
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in carList" :key="index">
				<view class="uni-list-cell-navigate">
					<text v-text="item.words"></text>
				</view>
			</view>
		</view>
	</view>
	<view v-else class="md_content">
		<view class="uni-card">
			<view class="uni-card-header">银行卡信息</view>
			<view class="uni-card-content">
				<view class="uni-card-content-inner">
					<view class="md_content_title">
						<image class="md_temp_img" :src="tempImg"></image>
						<view class="md_show_car">
							<view>
								<view>卡号：<text class="md_tf" v-text="backData.bank_card_number"></text></view>
								<view>银行名：<text class="md_tf" v-text="backData.bank_name"></text></view>
								<view>类型：<text class="md_tf" v-text="backData.bank_card_type == 1 ? '借记卡' : (backData.bank_card_type == 2 ? '信用卡' : '未知')"></text></view>
								<view>到期时间：<text class="md_tf" v-text="backData.valid_date"></text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-card-footer md_footer">
				<view>
					<image src="../../static/menu/send.png" @click="onChange('send')"></image>
					<image src="../../static/menu/like.png" @click="onChange('like')"></image>
					<image src="../../static/menu/message.png" @click="onChange('message')"></image>
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
				tempImg: '',
				carInfo: [],
				carFirstName: '',
				similarity: 0,
				carList: [],
				type: '',
				backData: {}
			}
		},
		mounted() {
			this.initData();
		},
		onLoad(params) {
			const that = this;

			let params1 = {
				id: '1',
				category: '银行卡',
				imgSrc: 'http://store/wx0647fa8eeb43889c.o6zAJs1CL8vtlro7XqJ-bCW5YMJA.K95lKWHxJIVT1b4497737a705182925bf36075b795a9.jpeg'
			}
			console.log(params);
			that.tempImg = params.imgSrc;
			uni.setNavigationBarTitle({
				title: `${params.category}识别`
			});
			//return
			switch (params.id) {
				case '0':
					// 身份证识别
					that.checkImg(params, 'v2');
					break;
				case '1':
					//银行卡识别
					that.checkImg(params, 'v3');
					break;
				case '2':
					//车牌识别
					that.checkImg(params, 'v8');
					break;
				case '3':
					// 驾驶证
					that.checkImg(params, 'v5');
					break;
				case '4':
					//行驶证
					that.checkImg(params, 'v6');
					break;
				case '5':
					//手写文字识别
					that.checkImg(params, 'v13');
					break;
				default:
					break;
			}


		},
		methods: {
			initData() {

			},
			//类型判断
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
						that.type = params.id;
						if (params.id == 0 || params.id == 2 || params.id == 3) {
							let _obj = JSON.parse(uploadFileRes.data).words_result;
							let _arr = [];
							Object.keys(_obj).forEach(function(key) {
								let temObj = {};
								temObj.name = key;
								temObj.value = _obj[key].words;
								_arr.push(temObj);
							});
							that.carList = _arr;
						} else if (params.id == 1) {
							if (JSON.parse(uploadFileRes.data).result) {
								let result = JSON.parse(uploadFileRes.data).result;
								result.valid_date = `20${result.valid_date.split('/')[1]}/${result.valid_date.split('/')[0]}`
								that.backData = result;
							} else {
								uni.showModal({
									title: '未能识别',
									content: '请重新选择',
									showCancel: false,
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											uni.switchTab({
												url: '/pages/characterRecognition/index'
											});
										}
									},
									fail: () => {},
									complete: () => {}
								});
							}
						} else {
							that.carList = JSON.parse(uploadFileRes.data).words_result;
						}
					},
					fail: (err) => {
						uni.hideLoading()
					}
				});
			},
			//
			onChange(data) {
				console.log(data);
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

	.uni-card-content-inner {
		padding: 0;
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

		.md_footer {
			position: relative;

			&>view {
				display: flex;
				position: absolute;
				right: 20upx;

				& image {
					height: 60upx;
					width: 60upx;
				}

				& image:nth-child(2) {
					margin-left: 10px;
				}

				& image:nth-child(3) {
					margin-left: 10px;
				}
			}
		}
	}
</style>
