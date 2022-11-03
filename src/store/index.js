import { createStore } from 'vuex';
import authModule from './modules/authentication/index.js';
import commModule from './modules/communities/index.js';
import messageModule from './modules/messages/index.js';
const store = createStore({
	modules: {
		auth: authModule,
		community: commModule,
		messages: messageModule,
	},
	state() {
		return {
			userName: 'mena',
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
