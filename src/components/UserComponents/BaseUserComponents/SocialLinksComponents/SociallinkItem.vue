<template>
	<!-- this Component for item (Button) Social Link  -->
	<div :id="`link-item-${text}`" class="link-item">
		<img :src="`${imgSrc}`" alt="" />
		<span
			>{{ text }}
			<button
				@click.prevent="deleteSociallink"
				style="border-radius: 10px"
				v-if="enable"
			>
				x
			</button></span
		>
	</div>
</template>

<script>
export default {
	data() {
		return {
			enable: false,
		};
	},
	created() {
		//console.log(this.$route.fullPath == '/settings/profile');
		if (this.$route.fullPath == '/settings/profile') this.enable = true;
	},
	methods: {
		/**
		 * @vuese
		 * nake request to delete the social link
		 * @arg no arg
		 */
		async deleteSociallink() {
			const actionPayload = {
				type: this.type,
				displayText: this.text,
				link: this.link,
				baseurl: this.$baseurl,
			};
			//console.log(actionPayload);
			try {
				const response = await this.$store.dispatch(
					'user/DeleteSocialLink',
					actionPayload
				);
				if (response == 204) {
					//console.log(response);
					//console.log('الحمد لله زى الفل');
				}
			} catch (err) {
				this.error = err;
				console.log(err);
			}
		},
		watch: {
			/**
			 * @vuese
			 * watch change of the route NOT USED YET
			 * @arg no arg
			 */
			// $route(newr) {
			// if (newr.path == 'profile/settings') //console.log('profileSettings');
			// },
		},
	},
	props: {
		// @vuese
		// link for displayed image of social link
		imgSrc: {
			type: String,
			default: '',
			required: true,
		},
		// @vuese
		// display text for social link
		text: {
			type: String,
			default: '',
			required: true,
		},
		// @vuese
		// type of the social link used for making request to delete an social link
		type: {
			type: String,
			default: '',
			required: true,
		},
		link: {
			type: String,
			default: '',
			required: true,
		},
		// @vuese
		//  alternate text in case off unloaded or unfounded image
		alt: {
			type: String,
			default: 'img',
			required: false,
		},
	},
};
</script>

<style scoped>
.links-container {
	display: flex;
	flex-wrap: wrap;
}
.link-item {
	margin: 6px 2px;
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
	align-items: center;
	background-color: var(--color-grey-dark-5);
	border-radius: 9999px;
	color: var(--color-dark-3);
	cursor: pointer;
	display: flex;
	height: 40px;
	margin-right: 8px;
	padding: 10px 12px;
	white-space: nowrap;
	width: fit-content;
}
.link-item img {
	margin-right: 8px;
}
</style>
