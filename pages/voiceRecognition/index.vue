<template>
	<view>
		<view v-for="(item,index) in voicelist" :key="index" v-on:longpress="onClickItem(item)" v-on:tap="startAudio(item)">
			<view v-if="index % 2 ==0 ">
				<view class="md_list_even_num">
					<view class="md_list_left_content">
						<view class="bubble">
							<text class="md_text" v-text="item.duration"></text>
							<image src="../../static/voicePlay.png"></image>
							<view class="triangle common"></view>
							<view class="cover common"></view><!-- 用来覆盖的倒三角 -->
						</view>
					</view>
					<view class="md_flex1">
						<image src="../../static/vegetables1.png"></image>
					</view>
				</view>
				<view style="display: flex;margin-top: 10upx;">
					<view class="md_flex1">
					</view>
					<view v-show="item.show" style="flex: 5;font-size: 28upx;padding: 8upx;border-radius: 10upx;background-color: rgb(212, 212, 212);">
						<view v-text="item.text"></view>
						<view style="font-size: 16upx;" class="uni-icon uni-icon-checkmarkempty">转换完成</view>
					</view>
					<view class="md_flex1">
					</view>
				</view>
			</view>
			<view v-else>
				<view class="md_list_even_num">
					<view class="md_flex1">
						<image src="../../static/vegetables2.png"></image>
					</view>
					<view style="flex: 5;display: flex;justify-content: flex-start;">
						<view class="bubble">
							<image class="md_left_image" src="../../static/voicePlay.png"></image>
							<text class="md_text" v-text="item.duration"></text>
							<view class="triangle_left common_left"></view>
							<view class="cover common_left"></view><!-- 用来覆盖的倒三角 -->
						</view>
					</view>
				</view>
				<view style="display: flex;margin-top: 10upx;">
					<view class="md_flex1">
					</view>
					<view v-show="item.show" style="flex: 5;font-size: 28upx;padding: 8upx;border-radius: 10upx;background-color: rgb(212, 212, 212);">
						<!-- <image v-show="item.show" class="rotation img" src="../../static/loading.png" /> -->
						<view v-text="item.text"></view>
						<view style="font-size: 16upx;" class="uni-icon uni-icon-checkmarkempty">转换完成</view>
					</view>
					<view class="md_flex1">
					</view>
				</view>
			</view>
		</view>
		<view class="md_voice_content">
			<view class="md_voice_p" v-bind:class="isShow ? 'md_voice_boder' : ''" @touchstart="onTouchStart()" @touchend="onTouchEnd()">
				<image src="../../static/voice/voice.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const main = require('@/commons/main');
	const utils = require('@/commons/utils');;
	const speechObj = require('@/commons/contants');
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	let access_token = "";
	//innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				isShow: false,
				voicelist: [],
				startTime: 0,
				endTime: 0,
				recordCancel: false,
				showText: ''
			}
		},
		onLoad() {
			const self = this;
			console.log(plus.device.imei);
			recorderManager.onStop(function(res) {
				if (self.recordCancel) {
					self.recordCancel = false;
				} else {
					innerAudioContext.src = res.tempFilePath;
					innerAudioContext.onError((resInner) => {
						console.log(resInner.errMsg);
						console.log(resInner.errCode);
					});
					let audioObj = {};
					setTimeout(() => {
						audioObj.duration = `${Math.round(innerAudioContext.duration)}"`;
						console.log(innerAudioContext.duration);
						audioObj.src = res.tempFilePath;
						audioObj.text = '';
						audioObj.show = false;
						self.voicelist.push(audioObj);
					}, 200)
				}

			});
		},
		onTabItemTap(e) {
			console.log(e);
		},

		methods: {
			// 开始录音
			onTouchStart(e) {
				console.log('start');
				this.startTime = (new Date()).getTime();
				this.isShow = true;
				recorderManager.start({
					format: 'wav',
					sampleRate: 16000,
					encodeBitRate: 80000
				});
			},
			// 结束录音
			onTouchEnd(e) {
				this.endTime = (new Date()).getTime();
				if (this.endTime - this.startTime < 800) {
					this.recordCancel = true;
				}
				this.isShow = false;
				recorderManager.stop();
			},
			//开始播放语音
			startAudio(item) {
				console.log(JSON.stringify(item));
				if (item.show) {
					item.show = false;
				} else {
					innerAudioContext.src = item.src;
					innerAudioContext.play();
					innerAudioContext.onPlay(() => {
						console.log('开始播放');
					});
				}
			},
			//结束播放
			endAudio(item) {

			},
			// 长摁转文本
			onClickItem(data) {
				console.log(34343);
				if (data.text != '') {
					data.show = true;
				} else {
					this.translation(data);
				}
			},
			// 语音转文字
			translation(res) {
				let that = this;
				console.log(utils.getStorageToken());
				if (utils.getStorageToken()) {
					utils.Audio2dataURL(res.src).then(dataObj => {
						let access_token = utils.getStorageToken();
						let data = {
							format: speechObj.format,
							rate: speechObj.rate,
							channel: speechObj.channel,
							cuid: speechObj.iosCuid,
							token: access_token,
							speech: dataObj.speech,
							len: dataObj.len,
							dev_pid: 1537
						};

						main.mdRequst(speechObj.url, data, 'POST', (success) => {
							// token 过期
							if (success.data.err_no == 3302) {
								utils.getToken.then(result => {
									utils.Audio2dataURL(res.src).then(dataObj => {
										let access_token = result.data.access_token;
										let data = {
											format: speechObj.format,
											rate: speechObj.rate,
											channel: speechObj.channel,
											cuid: speechObj.iosCuid,
											token: access_token,
											speech: dataObj.speech,
											len: dataObj.len,
											dev_pid: 1537
										};

										main.mdRequst(speechObj.url, data, 'POST', (success) => {
											if (success.err_no == 0) {
												res.text = success.data.result[0];
												res.show = true;
											} else {
												uni.showToast({
													title: success.data.err_msg
												});
											}

										}, (err) => {
											console.log(err, '4444');
										})
									})
								})
							} else if (success.data.err_no == 0) {
								res.text = success.data.result[0];
								res.show = true;
							} else {
								uni.showToast({
									title: success.data.err_msg
								});
							}

						}, (err) => {
							console.log(err, '4444');
							uni.hideLoading()
						})
					}).catch((err) => {
						uni.hideLoading()
					})
				} else {
					console.log(22222);
					utils.getToken().then(result => {
						utils.Audio2dataURL(res.src).then(dataObj => {
							let access_token = result.data.access_token;
							let data = {
								format: speechObj.format,
								rate: speechObj.rate,
								channel: speechObj.channel,
								cuid: speechObj.iosCuid,
								token: access_token,
								speech: dataObj.speech,
								len: dataObj.len,
								dev_pid: 1537
							};

							main.mdRequst(speechObj.url, data, 'POST', (success) => {
								if (success.err_no == 0) {
									res.text = success.data.result[0];
									res.show = true;
									/* uni.showToast({
										title: success.data.result[0]
									}) */
								} else {
									uni.showToast({
										title: success.data.err_msg
									});
								}

							}, (err) => {
								console.log(err, '4444');
							})
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../commons/style.css';

	.md_voice_content {
		width: 100%;
		position: fixed;
		bottom: 20upx;
		height: 160upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.md_voice_p {
			width: 120upx;
			height: 120upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background-color: rgb(89, 191, 107);

			& image {
				height: 60upx;
				width: 60upx;
			}
		}

		.md_voice_boder {
			border: 20upx solid rgb(211, 237, 226);
		}
	}

	.bubble {
		max-width: 400upx;
		min-width: 130upx;
		height: 80upx;
		display: flex;
		align-items: center;

		/* border: 5px solid red; */
		border-radius: 10upx;
		background-color: rgb(169, 233, 123);
		position: relative;
	}

	/* 三角 */
	.triangle {
		width: 0;
		height: 0;
		right: 0;
		border-top: 16upx solid transparent;
		border-bottom: 16upx solid transparent;
		border-left: 16upx solid rgb(169, 233, 123);
	}

	/* 右边垂直居中 */
	.common {
		position: absolute;
		right: -16upx;
		top: 50%;
		/* Opera */
		transform: translate(0, -50%);
	}

	/* 三角 */
	.triangle_left {
		width: 0;
		height: 0;
		left: 0;
		border-top: 16upx solid transparent;
		border-bottom: 16upx solid transparent;
		border-right: 16upx solid rgb(169, 233, 123);
	}

	/* 右边垂直居中 */
	.common_left {
		position: absolute;
		left: -16upx;
		top: 50%;
		/* Opera */
		transform: translate(0, -50%);
	}

	.md_text {
		font-size: 24upx;
	}

	.md_list_even_num {
		display: flex;
		margin-top: 20upx;
	}

	.md_flex1 {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;

		& image {
			width: 60upx;
			height: 60upx;
		}
	}

	.md_left_image {
		width: 40upx;
		height: 40upx;
		padding-left: 20upx;
	}

	.md_list_left_content {
		flex: 5;
		display: flex;
		justify-content: flex-end;

		& view {
			justify-content: flex-end;

			& image {
				width: 40upx;
				height: 40upx;
				border-radius: 10upx;
				transform: rotate(180deg);
				padding-left: 20upx;
			}
		}
	}

	@keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}

	@-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}

	.rotation {
		transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		animation: rotation 1s linear infinite;
		-moz-animation: rotation 1s linear infinite;
		-webkit-animation: rotation 1s linear infinite;
		-o-animation: rotation 1s linear infinite;
	}

	.img {
		border-radius: 50%;
		width: 48upx;
		height: 48upx;
		margin-left: 10upx;
	}
</style>
