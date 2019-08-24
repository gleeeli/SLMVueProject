<template>
	<table border="0" cellpadding="0" cellspacing="5" style="line-height: 20px;" v-if="bannerData.length >= 7">
		<tr>
			<td colspan="2">
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[0].id }}">
					<div class="container">
						<ul>
							<li style="width:380px; height:170px;">
								<div class="out_box">
									<div class="front_box"><img width="380" :src="''+bannerData[0].thumUrl" height="170"></div>
									<div class="back_box"><img width="380" :src="''+bannerData[0].thumUrl" height="170"></div>
								</div>
							</li>
						</ul>
					</div>
				</router-link>
			</td>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[1].id }}">
					<div class="container">
						<ul>
							<li style="width:190px; height:170px;">

								<div class="out_box">
									<div class="front_box"><img width="190" :src="''+bannerData[1].thumUrl" height="170"></div>
									<div class="back_box"><img width="190" :src="''+bannerData[1].thumUrl" height="170"></div>
								</div>

							</li>
						</ul>
					</div>
				</router-link>
			</td>
			<td rowspan="2">
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[2].id }}">
					<div class="container">
						<ul>
							<li style="width:190px; height:340px;">

								<div class="out_box">
									<div class="front_box"><img width="190" :src="''+bannerData[2].thumUrl" height="340"></div>
									<div class="back_box"><img width="190" :src="''+bannerData[2].thumUrl" height="340"></div>
								</div>
							</li>
						</ul>
					</div>
				</router-link>
			</td>

			<td rowspan="2">
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[3].id }}">
					<div class="container">
						<ul>
							<li style="width:275px; height:340px;">

								<div class="out_box">
									<div class="front_box"><img width="275" :src="''+bannerData[3].thumUrl" height="340"></div>
									<div class="back_box"><img width="275" :src="''+bannerData[3].thumUrl" height="340"></div>
								</div>

							</li>
						</ul>
					</div>
				</router-link>
			</td>
		</tr>
		<tr>

			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[4].id }}">
					<div class="container">
						<ul>
							<li style="width:190px; height:170px;">

								<div class="out_box">
									<div class="front_box"><img width="190" :src="''+bannerData[4].thumUrl" height="170"></div>
									<div class="back_box"><img width="190" :src="''+bannerData[4].thumUrl" height="170"></div>
								</div>

							</li>
						</ul>
					</div>
				</router-link>
			</td>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[5].id }}">
					<div class="container">
						<ul>
							<li style="width:190px; height:170px;">

								<div class="out_box">
									<div class="front_box"><img width="190" :src="''+bannerData[5].thumUrl" height="170"></div>
									<div class="back_box"><img width="190" :src="''+bannerData[5].thumUrl" height="170"></div>
								</div>

							</li>
						</ul>
					</div>
				</router-link>
			</td>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[6].id }}">
					<div class="container">
						<ul>
							<li style="width:190px; height:170px;">

								<div class="out_box">
									<div class="front_box"><img width="190" :src="''+bannerData[6].thumUrl" height="170"></div>
									<div class="back_box"><img width="190" :src="''+bannerData[6].thumUrl" height="170"></div>
								</div>

							</li>
						</ul>
					</div>
				</router-link>
			</td>
		</tr>
	</table>
</template>

<script>
	//父组件传值过来
	export default {
		name: 'bannerPhone',
		props: ["bannerData"]
	}
</script>

<style>
	.container ul li {
		margin: auto;
		display: inline;
		-webkit-perspective: 1000px;
		-moz-perspective: 1000px;
		float: left;
	}

	.container img {
		vertical-align: top;
	}

	.out_box {
		position: relative;
		height: 180px;
		width: 180px;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		-ms-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transition: 0.5s;
		-moz-transition: 0.5s;
		-o-transition: 0.5s;
		-ms-transition: 0.5s;
		transition: 0.5s;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.out_box div {
		display: block;
		height: 180px;
		width: 180px;
		position: absolute;
		left: 0;
		top: 0;
		text-align: center;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		backface-visibility: hidden;
		color: #FFF;
		line-height: 180px;
		font-size: 16px;
	}

	.out_box .front_box {
		z-index: 2;
	}

	.out_box .back_box {
		z-index: 1;
		-webkit-transform: rotateY(180deg);
		-moz-transform: rotateY(180deg);
		transform: rotateY(180deg);
	}

	.container ul li:hover .out_box {
		-webkit-transform: rotateY(180deg);
		-moz-transform: rotateY(180deg);
		transform: rotateY(180deg);
	}

	.container ul li:hover .back_box {
		z-index: 3;
	}

	.lg_relative {
		position: relative;
	}
</style>
