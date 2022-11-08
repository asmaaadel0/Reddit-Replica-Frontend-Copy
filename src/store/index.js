import { createStore } from 'vuex';
import authModule from './modules/authentication/index.js';
import commModule from './modules/communities/index.js';
import messageModule from './modules/messages/index.js';
import userModule from './modules/userStore/index.js';
import commentsModule from './modules/comments/index.js';
const store = createStore({
	modules: {
		auth: authModule,
		community: commModule,
		messages: messageModule,
		user: userModule,
		comments: commentsModule,
	},
	state() {
		return {
			// userName: 'mena',
			// userName: '/u/asmaaadel0',
			userName: 'asmaaadel0',
			accessToken: '',
		};
	},
	getters: {
		getUserName(state) {
			return state.userName;
		},
		getAccessToken(state) {
			return state.userName;
		},
	},
});

export default store;
