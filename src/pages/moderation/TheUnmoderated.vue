<template>
	<div>
		<div v-if="loading">
			<the-spinner
				style="position: absolute; left: 50%; top: 50%"
			></the-spinner>
		</div>
		<queue-bar :title="'Unmoderated'"></queue-bar>
		<div v-if="UnmoderatedPosts && UnmoderatedPosts.length == 0">
			<clean-queue></clean-queue>
		</div>
		<div v-else>
			<div v-for="value in UnmoderatedPosts" :key="value.id">
				<new-base-post :spam="value" :index="value.id"></new-base-post>
			</div>
		</div>
	</div>
</template>

<script>
import CleanQueue from '../../components/moderation/CleanQueue.vue';
import QueueBar from '../../components/moderation/QueueBar.vue';
import NewBasePost from '../../components/moderation/NewBasePost.vue';
import TheSpinner from '../../components/BaseComponents/TheSpinner.vue';
export default {
	components: { CleanQueue, QueueBar, NewBasePost, TheSpinner },
	async created() {
		this.loading = true;
		if (localStorage.getItem('accessToken')) {
			await this.Unmoderate();
		}
		this.loading = false;
	},
	data() {
		return {
			loading: false,
		};
	},
	beforeMount() {
		this.Unmoderate();
	},
	computed: {
		// @vuese
		//return subreddit name
		// @type string
		subredditName() {
			// return this.$store.state.subredditName;
			return this.$route.params.subredditName;
		},
		// @vuese
		//return Unmoderated post
		// @type Object
		UnmoderatedPosts() {
			//console.log(this.$store.getters['moderation/Unmoderated']);
			return this.$store.getters['moderation/Unmoderated'];
		},
	},
	methods: {
		async Unmoderate() {
			try {
				await this.$store.dispatch('moderation/unModerated', {
					baseurl: this.$baseurl,
					subredditName: this.subredditName,
					sort: 'newestfirst',
				});
			} catch (error) {
				this.error = error.message || 'Something went wrong';
			}
		},
	},
};
</script>

<style></style>
