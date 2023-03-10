<template>
	<div>
		<div v-if="loading">
			<the-spinner
				style="position: absolute; left: 50%; top: 50%"
			></the-spinner>
		</div>
		<list-bar
			:title="'approved'"
			:subreddit-name="subredditName"
			@approve-user="approveUserFunction()"
		></list-bar>
		<div class="list-moderations">
			<div class="text-moderation">
				{{ title }}
				<a
					href="https://mods.reddithelp.com/hc/en-us/articles/360009381491"
					id="info-link"
					__blank="targe"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-info-circle icon-info"
						viewBox="0 0 16 16"
						id="icon-info"
					>
						<path
							d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
						/>
						<path
							d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
						/>
					</svg>
				</a>
			</div>
			<no-list :title="'approved users'" v-if="noApproved">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-pen"
					viewBox="0 0 16 16"
				>
					<path
						d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
					/>
				</svg>
			</no-list>
			<div v-else>
				<search-bar
					@enter-search="(search) => enterSearch(search)"
					:empty-input="search"
					:before="before"
					:after="after"
					@fetch-before="loadListOfApproved('before')"
					@fetch-after="loadListOfApproved('after')"
				></search-bar>
				<ul class="ul-items" v-if="!noItems">
					<approved-item
						v-for="(approve, index) in listOfApproved"
						:key="approve"
						:approve="approve"
						:search="search"
						:index="index"
						@done-successfully="doneSuccessfully('removed')"
					></approved-item>
				</ul>
				<div class="no-items" v-else>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-search icon-search"
						viewBox="0 0 16 16"
						id="search-icon"
					>
						<path
							d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
						/>
					</svg>
					<span>No results for u/{{ search }}</span>
					<base-button
						class="see-all-button"
						id="see-all-button"
						@click="seeAll()"
						>See all</base-button
					>
				</div>
			</div>
		</div>
		<div id="create-rule-form">
			<base-dialog
				:show="showAdd"
				@close="approveUserFunction"
				title="Add approved user"
			>
				<div class="rule-dialog flex-column">
					<div class="rule-box flex-column">
						<div class="rule-box-input flex-column">
							<input
								class="input-name"
								maxlength="100"
								rows="5"
								type="text"
								placeholder="Enter Username"
								v-model.trim="userName"
								id="invited-user-name"
							/>
						</div>
					</div>
					<div class="rule-box box-buttons">
						<base-button
							@click="approveUserFunction()"
							class="button-white"
							id="cancel-button"
							>Cancel</base-button
						>
						<base-button
							@click="approveUser()"
							class="button-blue"
							id="add-user-button"
							:disabled="userName == ''"
							:class="userName != '' ? '' : 'disable-button'"
							>Add user</base-button
						>
					</div>
					<div class="no-messages" v-if="errorResponse">
						{{ errorResponse }}
					</div>
				</div>
			</base-dialog>
		</div>
		<div class="positioning">
			<SaveUnsavePopupMessage
				v-for="message in savedUnsavedPosts"
				:key="message.id"
				:type="message.type"
				:state="message.state"
				:typeid="message.postid"
				@undo-action="undoSaveUnsave"
			></SaveUnsavePopupMessage>
		</div>
	</div>
</template>

<script>
import SearchBar from '../../components/moderation/SearchBar.vue';
import ApprovedItem from '../../components/moderation/ApprovedItem.vue';
import ListBar from '../../components/moderation/ListBar.vue';
import NoList from '../../components/moderation/NoList.vue';
import SaveUnsavePopupMessage from '../../components/PostComponents/SaveUnsavePopupMessage.vue';
import TheSpinner from '../../components/BaseComponents/TheSpinner.vue';
export default {
	components: {
		SearchBar,
		ApprovedItem,
		ListBar,
		NoList,
		SaveUnsavePopupMessage,
		TheSpinner,
	},
	data() {
		return {
			userName: '',
			search: '',
			count: 0,
			noItems: false,
			showAdd: false,
			errorResponse: null,
			savedUnsavedPosts: [],
			loading: false,
		};
	},
	async created() {
		if (localStorage.getItem('accessToken')) {
			this.loading = true;
			await this.loadListOfApproved();
		}
		this.loading = false;
	},
	computed: {
		// @vuese
		//return list of moderators
		// @type object
		listOfApproved() {
			return this.$store.getters['moderation/listOfApproved'];
		},
		// @vuese
		//return subreddit name
		// @type string
		subredditName() {
			// return this.$store.state.subredditName;
			return this.$route.params.subredditName;
		},
		// @vuese
		//return title page
		// @type string
		title() {
			return 'Approved users';
		},
		// @vuese
		//return true if there is no approved, false otherwise
		// @type boolean
		noApproved() {
			if (this.listOfApproved.length != 0) {
				return false;
			}
			return true;
		},
		// @vuese
		//return if there is approved before
		// @type string
		before() {
			return this.$store.getters['moderation/before'];
		},
		// @vuese
		//return if there is approved after
		// @type string
		after() {
			return this.$store.getters['moderation/after'];
		},
	},
	methods: {
		// @vuese
		//load approved list from the store
		// @arg no argument
		async loadListOfApproved() {
			try {
				await this.$store.dispatch('moderation/loadListOfApproved', {
					baseurl: this.$baseurl,
					subredditName: this.subredditName,
				});
			} catch (error) {
				this.error = error.message || 'Something went wrong';
			}
		},
		// @vuese
		//access value of search
		// @arg The argument is a string value representing search input
		enterSearch(input) {
			this.search = input;
			this.noItems = false;
			for (let i = 0; i < this.listOfApproved.length; i++) {
				if (this.listOfApproved[i].username != input && input != '') {
					this.count = this.count + 1;
					this.noItems = false;
				}
			}
			if (this.count == this.listOfApproved.length) {
				this.noItems = true;
			}
			if (input == '') {
				this.noItems = false;
			}
			this.count = 0;
		},
		// @vuese
		//show all list of moderators
		// @arg no argument
		seeAll() {
			this.search = '';
			this.noItems = false;
		},
		// @vuese
		//used to show add approve user popup
		// @arg no argument
		approveUserFunction() {
			this.showAdd = !this.showAdd;
		},
		//@vuese
		//handle approve user
		//@arg no argument
		async approveUser() {
			this.errorResponse = null;
			try {
				await this.$store.dispatch('moderation/approveUser', {
					baseurl: this.$baseurl,
					subredditName: this.subredditName,
					username: this.userName,
				});
				if (this.$store.getters['moderation/approveUserSuccessfully']) {
					this.approveUserFunction();
					this.doneSuccessfully('approved');
				}
			} catch (err) {
				console.log(err);
				this.errorResponse = err;
			}
		},
		// @vuese
		// handle load approved instead of refreshing
		// @arg The argument is a string value representing what is the action that done successfully
		doneSuccessfully(title) {
			if (!title) {
				this.savePost('Done');
			} else {
				this.savePost(title);
			}
			this.loadListOfApproved();
		},
		// @vuese
		// Used to show handle save action popup
		// @arg the argument is the title used in show popup
		savePost(title) {
			this.savedUnsavedPosts.push({
				id: this.savedUnsavedPosts.length,
				postid: '1',
				type: title,
				state: '',
			});
			setTimeout(() => {
				this.savedUnsavedPosts.shift();
			}, 10000);
		},
		// @vuese
		// Used to show handle unsave action popup
		// @arg no argument
		unsavePost() {
			this.savedUnsavedPosts.push({
				id: this.savedUnsavedPosts.length,
				postid: '1',
				type: 'post',
				state: 'unsaved',
			});
			setTimeout(() => {
				this.savedUnsavedPosts.shift();
			}, 10000);
		},
		// @vuese
		// Used to show handle undo save action popup
		// @arg no argument
		async undoSaveUnsave(state, typeid) {
			if (state == 'saved') {
				this.unsavePost(typeid);
				this.$store.state.latestSavedUnsavedPost.id = typeid;
				this.$store.state.latestSavedUnsavedPost.saved = false;
				try {
					await this.$store.dispatch('postCommentActions/unsave', {
						baseurl: this.$baseurl,
						id: typeid,
						type: 'post',
					});
				} catch (error) {
					this.error = error.message || 'Something went wrong';
				}
			} else {
				this.savePost(typeid);
				this.$store.state.latestSavedUnsavedPost.id = typeid;
				this.$store.state.latestSavedUnsavedPost.saved = true;
				try {
					await this.$store.dispatch('postCommentActions/save', {
						baseurl: this.$baseurl,
						id: typeid,
						type: 'post',
					});
				} catch (error) {
					this.error = error.message || 'Something went wrong';
				}
			}
		},
	},
};
</script>

<style scoped>
.list-moderations {
	padding-top: 6.4rem;
	border-radius: 0 0 4px 4px;
	overflow: hidden;
}
.text-moderation {
	font-size: 1.8rem;
	font-weight: 500;
	line-height: 2.2rem;
	color: var(--color-dark-2);
	margin-bottom: 1.6rem;
}
.input-search {
	width: 60% !important;
}
.ul-items {
	list-style: none;
	background-color: var(--color-white-1);
	padding-left: 0rem;
}
.no-items {
	background-color: var(--color-white-1);
	height: 25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	font-weight: bold;
}
.see-all-button {
	padding: 0 1.5rem;
	color: var(--color-blue-2);
	background-color: var(--color-white-1);
	font-weight: bold;
}
.rule-dialog {
	max-height: 100%;
	max-width: 53.8rem;
	min-width: 41rem;
}
.sure-text {
	line-height: 2.2rem;
	margin: 1rem 0;
	white-space: pre-wrap;
	font-family: Noto Sans, Arial, sans-serif;
	font-weight: 400;
	color: var(--color-dark-3);
	font-size: 1.4rem;
	line-height: 2.1rem;
	display: block;
}
.rule-box-p {
	align-items: flex-start;
	margin-top: 1.2rem;
	margin-bottom: 3rem;
}
.box {
	margin-top: 1rem;
	width: 15rem;
	background-color: var(--color-dark-1);
	color: var(--color-white-1);
	font-size: 0.9rem;
	padding: 1rem;
	position: absolute;
	border-radius: 0.4rem;
	text-align: center;
	pointer-events: none;
	transform: translateX(-50%);
	z-index: 100;
	right: -16rem;
}
.box-buttons {
	background-color: var(--color-grey-light-2);
	padding: 16px;
	margin: 16px -16px -16px;
	display: flex;
	justify-content: flex-end;
	border-bottom-right-radius: 4px;
	box-sizing: border-box;
}
button {
	min-height: 32px;
	min-width: 32px;
	padding: 4px 16px;
	margin-left: 8px;
	font-size: 14px;
	font-weight: 700;
}
.button-blue:hover {
	background-color: rgb(248, 89, 89);
	border: 1px solid rgb(248, 89, 89);
	padding: 0.4rem 1.6rem;
}
.button-white {
	border: 1px solid var(--color-blue-2);
	color: var(--color-blue-2);
	padding: 0.4rem 1.6rem;
}
.button-white:hover {
	border: 1px solid var(--color-grey-dark-8);
	color: var(--color-grey-dark-8);
	padding: 0.4rem 1.6rem;
}
.button-blue {
	background-color: var(--color-blue-2);
	border: 1px solid var(--color-blue-2);
	color: var(--color-white-1);
	padding: 0.4rem 1.6rem;
}
.disabled {
	cursor: not-allowed;
	filter: grayscale(1);
	border: none;
	color: rgba(255, 255, 255, 0.5);
	fill: rgba(255, 255, 255, 0.5);
	background-color: var(--color-grey-light-5);
}
input:focus {
	outline: navajowhite;
	border: var(--line-2);
	background-color: var(--color-white-1);
}
.input-name {
	border: 1px solid var(--color-grey-light-2);
	max-height: 3.7rem;
	padding: 0.4rem 1rem;
	background-color: var(--color-white-1);
	color: var(--color-dark-1);
	box-sizing: border-box;
	margin-bottom: 8px;
	border-radius: 4px;
	width: 100%;
	font-size: 1.4rem;
	font-weight: 400;
	line-height: 2.1rem;
	height: 5rem;
}
.no-messages {
	margin-top: 2rem;
	padding: 1rem;
}
.disable-button {
	filter: grayscale(1);
	cursor: not-allowed;
	color: var(--color-grey-light-5);
	fill: var(--color-grey-light-5);
}
.positioning {
	position: fixed;
	bottom: 0;
	/* display: flex;
	justify-content: left;
	align-items: center;
	width: 100%;
	display: flex;
	flex-direction: column; */
}
@media only screen and (max-width: 768px) {
	.list-moderations {
		padding-top: 11.4rem;
	}
}
</style>
