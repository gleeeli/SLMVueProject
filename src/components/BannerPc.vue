<template>
	<table class="pcbtable" border="0" cellpadding="0" cellspacing="5" style="line-height: 20px;" v-if="bannerData.length >= 7">
		<tr>
			<td colspan="2">
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[0].id }}">
					<div class="bpc-block" style="width:380px; height:170px;">
						<img width="380" :src="''+bannerData[0].thumUrl" height="170">
					</div>
				</router-link>
			</td>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[1].id }}">
					<div class="bpc-block" style="width:190px; height:170px;">
						<img width="190" :src="''+bannerData[1].thumUrl" height="170">
					</div>
				</router-link>
			</td>
			<td rowspan="2">
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[2].id }}">
					<div class="bpc-block" style="width:190px; height:340px;">
						<img width="190" :src="''+bannerData[2].thumUrl" height="340">
					</div>
				</router-link>
			</td>

			<td rowspan="2">
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[3].id }}">
					<div class="bpc-block" style="width:308px; height:340px;">
						<img width="308" :src="''+bannerData[3].thumUrl" height="340">
					</div>
				</router-link>
			</td>
		</tr>
		<tr>

			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[4].id }}">
					<div class="bpc-block" style="width:190px; height:170px;">
						<img width="190" :src="''+bannerData[4].thumUrl" height="170">
					</div>
				</router-link>
			</td>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[5].id }}">
					<div class="bpc-block" style="width:190px; height:170px;">
						<img width="190" :src="''+bannerData[5].thumUrl" height="170">
					</div>
				</router-link>
			</td>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[6].id }}">
					<div class="bpc-block" style="width:190px; height:170px;">
						<img width="190" :src="''+bannerData[6].thumUrl" height="170">
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
.bpc-block {
  cursor: pointer;
  transition: 0.8s;
}

.bpc-block:hover {
	transform: rotateY(180deg);
}

 .bpc-block img {
	vertical-align: top;
 }
</style>
