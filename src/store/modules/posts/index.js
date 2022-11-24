import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
export default {
	namespaced: true,
	state() {
		return {
			kind: null,
			subreddit: null,
			inSubreddit: null,
			title: null,
			content: null,
			files: [{}],
			nsfw: null,
			spoiler: null,
			flairId: null,
			imageCaptions: [],
			imageLinks: [],
			sendReplies: null,
			allSubreddits: [],
		};
	},
	actions,
	mutations,
	getters,
};
