<template>
	<div class="content">
		<li class="message-button">
			<router-link to="/message/compose" id="go-to-send-private-message"
				>Send A Private Message</router-link
			>
		</li>
		<li
			class="message-button"
			:class="{
				inbox:
					unreadCom == true ||
					messagesCom == true ||
					selfreplyCom == true ||
					mentionsCom == true,
			}"
		>
			<router-link to="/message/inbox" id="go-to-inbox-message"
				>Inbox</router-link
			>
		</li>
		<li class="message-button">
			<router-link to="/message/sent" id="go-to-sent-message">Sent</router-link>
		</li>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// inboxCom: false,
		};
	},
	methods: {},
	computed: {
		// @vuese
		// return unread messages bath
		// @type boolean
		unreadCom() {
			return this.$route.path === '/message/unread';
		},
		// @vuese
		// return if all messages that sent or received path == current path
		// @type boolean
		messagesCom() {
			return this.$route.path === '/message/messages';
		},
		// @vuese
		// return if post replies bath == current path
		// @type boolean
		selfreplyCom() {
			return this.$route.path === '/message/selfreply';
		},
		// @vuese
		// return if mentions bath == current path
		// @type boolean
		mentionsCom() {
			return this.$route.path === '/message/mentions';
		},
	},
};
</script>

<style scoped>
.content {
	background-color: var(--color-blue-2);
	margin-top: 5rem;
	padding: 0;
	border-bottom: none;
	display: flex;
	flex-direction: row;
	align-items: center;
}
/* .message-button:first-of-type {
	margin-left: 13rem;
} */
.message-button {
	font-size: 1.5rem;
	padding: 0;
	display: inline;
	font-weight: bold;
	margin: 0px 3px;
	display: list-item;
	text-align: -webkit-match-parent;
	cursor: pointer;
	list-style-type: none;
	white-space: nowrap;
	display: inline-block;
	margin-top: 5px;
	vertical-align: bottom;
	list-style: none;
	margin: 2rem;
	font-weight: bold;
}
a {
	color: var(--color-grey-light-3);
	font-family: 'IBM Plex Sans', Arial, sans-serif;
}
a.router-link-active,
.inbox {
	/* color: var(--color-grey-light-4); */
	opacity: 0.6;
}
.message-button:first-of-type {
	margin-left: 12rem;
}
/* 788 */
@media only screen and (max-width: 49.25em) {
	.message-button:first-of-type {
		margin-left: 2rem;
	}
}

@media only screen and (max-width: 296px) {
	.content {
		display: block;
	}
	.message-button {
		font-size: 1.1rem;
	}
}
</style>
