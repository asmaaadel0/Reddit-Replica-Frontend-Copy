<template>
	<div
		class="message"
		:class="[
			backcolor == 'grey' ? 'message-grey' : 'message-white',
			disappear == true ? 'hide-message' : '',
		]"
	>
		<li>
			<p class="subject-text">
				<a
					:href="
						'/r/' + message.subredditName + '/about/accept-moderator-invite'
					"
					v-if="isInvitation"
					>link: {{ message.subject }}:</a
				>
				<span v-else>{{ message.subject }}:</span>
			</p>
			<div :class="!isRead ? 'box-unread' : ''">
				<p class="md-details">
					<span>from&nbsp;</span>
					<span class="sender"
						><a
							v-if="message.isSenderUser"
							:href="'/user/' + message.senderUsername + '/'"
							:id="'message-sender-' + index"
							>/u/{{ message.senderUsername }}</a
						>
						<a
							v-else
							:href="'/r/' + message.senderUsername"
							:id="'message-sender-' + index"
							>/r/{{ message.senderUsername }}</a
						>
						<span
							v-if="message.receiverUsername != ''"
							:class="!isRead ? 'unread' : ''"
							><span>&nbsp;via&nbsp;</span>
							<a
								v-if="message.isReceiverUser"
								:href="'/user/' + message.receiverUsername + '/'"
								:id="'message-receiver-' + index"
								>/u/{{ message.receiverUsername }}</a
							><a
								v-else
								:href="'/r/' + message.receiverUsername"
								:id="'message-receiver-' + index"
								>/r/{{ message.receiverUsername }}</a
							>
						</span></span
					><span :class="!isRead ? 'unread' : ''">&nbsp;sent&nbsp;</span
					><time :class="!isRead ? 'unread' : ''" :id="'time-' + index">
						{{ handleTime }}</time
					>
				</p>

				<Markdown class="md" id="md" :source="message.text" />
				<!-- <p class="md">{{ message.text }}</p> -->
				<ul
					class="flat-list ul-messages"
					v-if="message.isSenderUser && !sendByMe"
				>
					<!-- <li :id="'permalink-link-' + index">
						<a href="" :id="'permalink-a-' + index">Permalink</a>
					</li> -->
					<li :id="'delete-message-li-' + index">
						<form action="#">
							<input
								type="hidden"
								name="deleted"
								:id="'delete-message-' + index"
								value="deleted"
							/>
						</form>
						<span
							class="sure-block"
							v-if="deleteUser"
							:id="'delete-message-span-' + index"
							>are you sure?
							<span
								class="link"
								:id="'yes-delete-message-' + index"
								@click="deleteAction('yes')"
								>Yes</span
							>
							/
							<span
								class="link"
								@click="deleteAction()"
								:id="'no-delete-message-' + index"
								>No</span
							></span
						>
						<!-- <a href="" v-else @click="deleteAction()">Delete</a> -->
						<span
							class="link"
							v-else
							@click="deleteAction()"
							:id="'click-delete-' + index"
							>Delete</span
						>
					</li>
					<li :id="'spam-box-' + index">
						<div v-if="!spammed">
							<span
								class="sure-block"
								v-if="spamUser"
								:id="'spam-user-span-' + index"
								>are you sure?
								<span
									class="link"
									:id="'yes-spam-user-' + index"
									@click="spamAction('yes')"
									>Yes</span
								>
								/
								<span
									class="link"
									@click="spamAction()"
									:id="'no-spam-user-' + index"
									>No</span
								></span
							>
							<span
								class="link"
								v-else
								@click="spamAction()"
								:id="'click-spam-' + index"
								>spam</span
							>
						</div>
						<div v-if="spammed">spammed</div>
					</li>
					<li :id="'block-' + index">
						<span
							class="sure-block"
							v-if="blockUser"
							:id="'block-user-span-' + index"
							>are you sure?
							<span
								class="link"
								:id="'yes-block-user-' + index"
								@click="blockAction('yes')"
								>Yes</span
							>
							/
							<span
								class="link"
								@click="blockAction()"
								:id="'no-block-user-' + index"
								>No</span
							></span
						>
						<!-- <a href="" v-else @click="deleteAction()">Delete</a> -->
						<span
							class="link"
							v-else
							@click="blockAction()"
							:id="'block-user-' + index"
							>Block User</span
						>
					</li>
					<li @click="unreadAction()" :id="'unread-' + index" v-if="isRead">
						<span class="link" :id="'mark-un-read-' + index">Mark Unread</span>
					</li>
					<li :id="'reply-box-' + index">
						<span
							class="link"
							:id="'reply-' + index"
							@click="replyFunction('show')"
							>Reply</span
						>
					</li>
				</ul>
				<div class="no-messages" v-if="errorResponse">
					{{ errorResponse }}
				</div>
			</div>
		</li>
		<ReplyComponent
			:show-reply-box="showReplyBox"
			:index="index"
			@hide-reply-box="replyFunction('hide')"
			@done-successfully="doneSuccessfully()"
			:id="message.id"
			:sender-username="message.senderUsername"
			:receiver-username="message.receiverUsername"
			:subject="message.subject"
			:subreddit-name="subredditName"
		></ReplyComponent>
	</div>
</template>

<script>
import Markdown from 'vue3-markdown-it';
import ReplyComponent from './ReplyComponent.vue';
export default {
	components: {
		Markdown,
		ReplyComponent,
	},
	emits: ['doneSuccessfully'],
	props: {
		// @vuese
		//details of message
		// @type object
		message: {
			type: Object,
			required: true,
			default: () => ({
				id: '',
				text: '',
				senderUsername: '',
				receiverUsername: '',
				sendAt: '',
				subject: '',
				type: '',
				subredditName: '',
				postTitle: '',
				postId: '',
				commentId: '',
				numOfComments: '',
				isSenderUser: '',
				isReceiverUser: '',
				isRead: '',
				vote: '',
				postOwner: '',
			}),
		},
		// @vuese
		//index to handle unique ids and background color
		// @type number
		index: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	data() {
		return {
			deleteUser: false,
			spamUser: false,
			blockUser: false,
			backcolor: 'grey',
			disappear: false,
			spammed: false,
			errorResponse: null,
			showReplyBox: false,
			handleTime: '',
			isRead: this.message.isRead,
		};
	},
	// @vuese
	//decide if background color in  white or grey depends on if index even or odd
	beforeMount() {
		if (this.index % 2 == 0) {
			this.backcolor = 'white';
		} else this.backcolor = 'grey';
		this.calculateTime();
	},
	computed: {
		// @vuese
		//return handled if I'm a sender or reciever
		// @type booloean
		sendByMe() {
			return this.message.senderUsername == localStorage.getItem('userName');
		},

		// @vuese
		//if it's invitaion or not
		// @arg no argument
		isInvitation() {
			if (this.message.subject.includes('invitation to moderate')) {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
		// @vuese
		//calculate time
		// @arg no argument
		calculateTime() {
			var currentDate = new Date();
			var returnValue = '';
			var myTime = new Date(this.message.sendAt);
			if (currentDate.getFullYear() != myTime.getFullYear()) {
				returnValue = myTime.toJSON().slice(0, 10).replace(/-/g, '/');
			} else if (currentDate.getMonth() != myTime.getMonth()) {
				returnValue = currentDate.getMonth() - myTime.getMonth() + ' Month ago';
			} else if (currentDate.getDate() != myTime.getDate()) {
				returnValue = currentDate.getDate() - myTime.getDate() + ' Days ago';
			} else if (currentDate.getHours() != myTime.getHours()) {
				returnValue = currentDate.getHours() - myTime.getHours() + ' Hours ago';
			} else if (currentDate.getMinutes() != myTime.getMinutes()) {
				returnValue =
					currentDate.getMinutes() - myTime.getMinutes() + ' Minutes ago';
			} else {
				returnValue = 'Just now';
			}
			this.handleTime = returnValue;
		},
		// @vuese
		//handle delete action
		// @arg The argument is a string value representing if user click ok
		async deleteAction(action) {
			this.deleteUser = !this.deleteUser;
			if (action == 'yes') {
				try {
					await this.$store.dispatch('messages/deleteMessage', {
						id: this.message.id,
						type: 'message',
						baseurl: this.$baseurl,
					});
					if (this.$store.getters['messages/deleteMessageSuccessfully']) {
						this.disappear = true;
					}
				} catch (err) {
					this.errorResponse = err;
					this.disappear = false;
				}
			}
		},
		// @vuese
		//handle block action
		// @arg The argument is a string value representing if user click ok
		async blockAction(action) {
			this.blockUser = !this.blockUser;
			let name = '';
			if (this.sendByMe) {
				name = this.message.receiverUsername;
			} else {
				name = this.message.senderUsername;
			}
			if (action == 'yes') {
				try {
					await this.$store.dispatch('messages/blockUser', {
						block: true,
						username: name,
						baseurl: this.$baseurl,
					});
					if (this.$store.getters['messages/blockSuccessfully']) {
						this.disappear = true;
						this.$emit('doneSuccessfully');
					}
				} catch (err) {
					this.errorResponse = err;
					this.disappear = false;
				}
			}
		},
		// @vuese
		//handle unread action
		// @arg no argument
		unreadAction() {
			this.isRead = false;
		},
		// @vuese
		// handle load messages instead of refreshing
		// @arg no argument
		doneSuccessfully() {
			this.$emit('doneSuccessfully');
		},
		// @vuese
		//handle spam action
		// @arg The argument is a string value representing if user click ok
		async spamAction(action) {
			this.spamUser = !this.spamUser;
			if (action == 'yes') {
				try {
					await this.$store.dispatch('messages/spamMessage', {
						id: this.message.id,
						baseurl: this.$baseurl,
					});
					if (this.$store.getters['messages/markSpamSuccessfully']) {
						this.spammed = true;
						this.$emit('doneSuccessfully');
					}
				} catch (err) {
					this.errorResponse = err;
					this.spammed = false;
				}
			}
		},
		// @vuese
		//show reply box or hide it
		// @arg The argument is a string value representing if it's show or hide
		replyFunction(title) {
			if (title == 'show') {
				this.showReplyBox = true;
			} else if (title == 'hide') {
				this.showReplyBox = false;
			}
		},
	},
};
</script>

<style scoped>
a:hover,
.link:hover {
	text-decoration: underline;
}
.hide-message {
	display: none;
}
</style>
